import { ComidaProvider } from '../context/ComidaProvider'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <ComidaProvider>
      <Component {...pageProps} />
    </ComidaProvider>
  )
}

export default MyApp
