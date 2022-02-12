import React from 'react'
import { Provider } from 'react-redux'
import { productStore } from './ecom_exam/redux/store'
import Dashboard from './ecom_exam/dashboard'

function App() {
  return (
    <>
      <Provider store={productStore}>
        <Dashboard />
      </Provider>
    </>
  )
}

export default App
