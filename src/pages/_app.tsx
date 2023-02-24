import { RootState } from 'src/store/createStore'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import type { AppProps } from 'next/app'
import store from 'src/store/createStore'

export default function App({ Component, pageProps }: AppProps) {
  //const store = useStore()
  // const persistor = persistStore(store)
  return (
    // <Component {...pageProps} />
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  )
}
