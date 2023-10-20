import Head from 'next/head'
import type {AppProps} from 'next/app'
import './globals.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles'
import {theme} from '@styles/theme'

export default function MyApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
