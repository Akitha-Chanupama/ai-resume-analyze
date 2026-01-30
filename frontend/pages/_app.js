import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

function MiApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
