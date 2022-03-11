import React from 'react'
import { mount } from 'enzyme'
import SupplyChainFinanceSendOTP, { getValidatedValue } from './SupplyChainFinanceSendOTP'
import { Store } from 'app/redux/Store'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@material-ui/core'
import { render } from '@testing-library/react'
import * as Redux from 'react-redux'


jest.mock("react-redux", () => ({ ...jest.requireActual("react-redux"), useSelector: jest.fn() }));

describe('SupplyChainFinanceSendOTP', () => {
  useSelector.mockImplementation(callback => { return callback({}); });

  describe('Mount', () => {

    let wrapper
    const theme = createTheme()

    useSelector.mockImplementation((callback) => {
      return callback({
        sendOTP: {
          apiLoading: false,
          apiBlocking: false,
          sendOtpResponse: {
            data: {
              data: { refcode: '123123' },
            },
          },
          verifyOtpResponse: {
            data: {},
          },
        },
        financing: {
          financingProductDetails: {
            productDescription: { longDescription: '' },
          },
        },
      })
    })

    beforeEach(() => {

      const authHook = jest.requireActual('app/hooks/useAuth')

      jest.spyOn(authHook, 'default').mockReturnValue({
        authData: {
          'https://api.abc.com/user_info': {
            email: 'test@gmail.com'
          }
        }
      })

      wrapper = mount(
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <SupplyChainFinanceSendOTP />
          </ThemeProvider>
        </Provider>
      )
    })

    it('Should render', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('Should handle validate function', () => {
      getValidatedValue(12341234, { onlyNums: true, maxSixDigit: true })
    })

  })
})

jest.restoreAllMocks()