import React from 'react'
import { Provider } from 'react-redux';
import store from './store/store'
import MainRouter from './MainRouter'
import 'bootstrap/dist/js/bootstrap.bundle';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  )
}
export default App

