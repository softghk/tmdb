import Head from 'next/head'
import type {AppProps} from 'next/app'
import './globals.css'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles'
import {theme} from '@styles/theme'
import {QueryClientWrapper} from '@layout'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientWrapper>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Head>
            <meta name='viewport' content='width=device-width, user-scalable=no' />
          </Head>
          <div className={`content-root`}>
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientWrapper>
  )
}
