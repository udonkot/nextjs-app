import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import Logo from '@/components/presentational/atoms/Logo/Logo'
import { motion } from 'framer-motion'
import FadeInTitle from 'src/components/container/organisms/FadeInTitle'
import Slacklabo from './rooms/slacklabo'
import SlackLaboMenu from '@/components/container/template/SlackLabo/SlackLaboMenu'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }: { data: { time: string } }) {
  // const serverData = JSON.parse(data.toString())
  const [showSlackMenu, setShowSlackMenu] = useState<boolean>(false)

  // const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    // fetch('/api/time')
    //   .then((res) => res.json())
    //   .then((json) => setTime(new Date(json.time)))
    let timeoutId = setTimeout(() => {
      //setShowTitle(true)
    }, 7000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {/* <Head>
        <title>DXService TechLabo Next.js Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main className={styles.main}>
        <div className={styles.description}></div>
        <Logo width={20} height={20} />

        <div className={styles.center}></div>

        <div className={styles.grid}>
          <Link href="/rooms/kondolabo">
            <h2 className={inter.className}>
              kondoLabo <span>⇒</span>
            </h2>
            <p className={inter.className}>個人的な学習、動作検証用</p>
          </Link>
        </div>

        <div className={styles.grid}>
          <Link href="/rooms/slacklabo">
            <h2 className={inter.className}>
              Slack Labo <span>⇒</span>
            </h2>
          </Link>
        </div>

        <div className={styles.grid}>
          <Link href="/rooms/redminelabo">
            <h2 className={inter.className}>
              Redmine Labo <span>⇒</span>
            </h2>
          </Link>
        </div>
      </main>

      {showSlackMenu && <SlackLaboMenu />}
    </>
  )
}

export const getServerSideProps = async () => {
  const data = JSON.stringify({ time: new Date() })
  return { props: { data } }
}
