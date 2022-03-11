import React from 'react'
import { mount } from 'enzyme'
import UploadedDocumentsSummary from 'app/views/supply-chain-finance/summary/UploadedDocumentsSummary'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { act } from '@testing-library/react'

const { REACT_APP_API, REACT_APP_FINANCING } = process.env

describe('UploadedDocumentSummary UI Behavior Unit test', () => {

  describe('Mount', () => {
    let wrapper
    let mockAxios
    const theme = createTheme()

    const props = {
      item: []
    }

    beforeEach(() => {
      const translations = jest.requireActual('app/hooks/translations')
      jest.spyOn(translations, 'default').mockReturnValue({
        pages: {
          supplyChainFinanceRegister: {
            uploadDocumentForm: {
              title: 'title',
              id_authorised_title: 'id_authorised_title',
              id_authorised: 'id_authorised',
              id_shareholder_title: 'id_shareholder_title',
              id_shareholder: 'id_shareholder',
              photo_authorised_title: 'photo_authorised_title',
              photo_authorised: 'photo_authorised',
              photo_business_property: 'photo_business_property',
              board_resolution_title: 'board_resolution_title',
              board_resolution: 'board_resolution',
              affidavit: 'affidavit',
              registries: 'registries',
              pp30: 'pp30',
              optional: 'optional',
              loa: 'loa',
              bank_statements: 'bank_statements',
              credit_report: 'credit_report',
              others: 'others',
            },
            errors: {},
            prevBtn: 'previous',
            continueBtn: 'continue',
            caption: 'caption',
          },
        },
      })

      mockAxios = new MockAdapter(axios)

      mockAxios.onPost(`${REACT_APP_API}/${REACT_APP_FINANCING}/company-details`).reply(200)

      wrapper = mount(
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <UploadedDocumentsSummary {...props} />
          </ThemeProvider>
        </Provider>
      )

      wrapper.update()
    })

    it('Should render', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('Should click back button', () => {
      act(() => {
        wrapper
          .find('#UDFBack')
          .at(0)
          .props()
          .buttonClick()
      })
    })
    it('Should click submit button', () => {
      act(() => {
        wrapper
          .find('#UDFSubmit')
          .at(0)
          .props()
          .buttonClick()
      })
    })
  })
})