import { RootState } from 'src/store/createStore'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from 'src/store/createStore'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/container/template/Layout/layout'
import { AnimatePresence } from 'framer-motion'
import FadeInTitle from '@/components/container/organisms/FadeInTitle'
import { useEffect, useState } from 'react'
import '../scss/FadeInTitle.scss'

export default function App({ Component, pageProps }: AppProps) {
  // const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    // fetch('/api/time')
    //   .then((res) => res.json())
    //   .then((json) => setTime(new Date(json.time)))
    let timeoutId = setTimeout(() => {
      setShowTitle(true)
    }, 2500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
  const [showTitle, setShowTitle] = useState<boolean>(false)

  return (
    <Provider store={store}>
      <ChakraProvider>
        {!showTitle && <FadeInTitle />}
        {showTitle && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </Provider>
  )
}
