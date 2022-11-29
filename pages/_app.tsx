import '../styles/globals.css'
import { Provider } from 'react-redux'
import Navbar from '../layouts/navbar'
import { store } from '../redux/store'
import AudioBar from '../layouts/audio-bar'
import { AppProps } from 'next/app'
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <AudioBar />
    </Provider>
  )
}

export default MyApp
