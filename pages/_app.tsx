import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layout/Layout'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '../context/ThemeContextProvider'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
    </Provider>
  )
}

export default App;