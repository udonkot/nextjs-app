import AppNavbar from './AppNavbar'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default function Layout({ children }) {
  return (
    <>
      <AppNavbar />
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  )
}
