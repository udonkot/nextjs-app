import styles from '@/styles/Home.module.css'
import { AiOutlineHome } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { alignPropType } from 'react-bootstrap/esm/types'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/createStore'

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible
}

/**
 * ヘッダ
 * @returns
 */
export const AppHeader = () => {
  // storeから取得
  const title = useSelector((state: RootState) => state.appHeader.title)

  return (
    <>
      <Heading as="h2" size="xl" noOfLines={1}>
        {title}
      </Heading>
      {/* <Link href="/rooms/kondolabo">PersonalLabo</Link>
      {/* </Navbar.Text>
            </Navbar.Collapse>  */}
      {/* <Nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <motion.li variants={itemVariants}>
                        <Link href="/">
                          <AiOutlineHome size="3rem" />
                        </Link>
                      </motion.li>
                    </li>
                    <li className="nav-item">
                      <Link href="/rooms/kondolabo">PersonalLabo</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/rooms/redminelabo">RedmineLabo</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Nav> */}
      {/* <motion.div
              initial={{ opacity: 60, x: 40 }} // 初期状態
              animate={{ opacity: 10, x: 0 }} // マウント時
              exit={{ opacity: 0, y: 10 }} // アンマウント時
              transition={{
                duration: 5.5
              }}
            >
              <motion.li variants={itemVariants}>
                <Link href="/">
                  <AiOutlineHome size="3rem" />
                </Link>
              </motion.li>
            </motion.div> */}
      {/* <Nav className="mr-auto"></Nav>
            <Nav className="mr-auto">
              <Link href="/rooms/slacklabo">SlackLabo</Link>
            </Nav>
            <div className="Header-Right"></div>
            <style jsx>{`
              .Header-Right {
                position: relative;
                color: red;
              }
              .Right-Icon {
                max-width: 200px;
                display: block;
                position: absolute;
                right: 10000;
              }
            `}</style>
          </Container>
        </Navbar>
      </div> */}
      {/* <Link href="/">
          <AiOutlineHome />
        </Link> */}
      {/* <h1 className={styles.title}>DxServTechLabo Next.js</h1> */}
      {/* <div> */}
      {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </a> */}
      {/* </div> */}
    </>
  )
}

export default AppHeader
