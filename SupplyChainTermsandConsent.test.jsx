import React from 'react'
import { mount } from 'enzyme'
import SupplyChainTermsandConsent, { declinedredirect, sendOTPnext } from './SupplyChainTermsandConsent'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { act } from '@testing-library/react'
import * as Redux from 'react-redux'
import _ from 'lodash'
import History from 'history.js'


describe('SupplyChaniTermsandConsent UI Behaior Unit Test', () => {
  describe('Mount', () => {
    let wrapper
    const theme = createTheme();
    const historySpy = jest.spyOn(History, 'push')
    const props = {
      item: [],
    }
    beforeEach(() => {

      const authHook = jest.requireActual('app/hooks/useAuth')
      jest.spyOn(authHook, 'default').mockReturnValue({
        authData: { 'https://api.abc.com/user_info': { userAccountId: 'testId' } }
      })

      wrapper = mount(
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <SupplyChainTermsandConsent {...props} />
          </ThemeProvider>
        </Provider>
      )
    })

    it('Should render', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('Should handle sendOTPnext button', () => {
      sendOTPnext(false, false, { textError: 'textError' }, 'termsAgree', 'consentAgree')
      expect(historySpy).toBeCalled()
    })

    it('Should handle cancel modal', () => {
      declinedredirect()
      expect(historySpy).toBeCalled()
    })

  })

})