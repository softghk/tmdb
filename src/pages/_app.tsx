import Head from 'next/head'
import type {AppProps} from 'next/app'
import './globals.css'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
      </Head>
      <div className={`content-root`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
