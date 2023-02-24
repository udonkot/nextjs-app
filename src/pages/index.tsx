import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }: { data: { time: string } }) {
  const serverData = JSON.parse(data.toString())

  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((json) => setTime(new Date(json.time)))
  }, [])

  return (
    <>
      <Head>
        <title>DXService TechLabo Next.js Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className={styles.title}>DxServTechLabo Next.js</h1>
          <div>
            <a
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
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

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
          <h2 className={inter.className}>
            Redmine Labo <span>⇒</span>
          </h2>
          <Link href="/rooms/redminelabo/userlist">
            <h3 className={inter.className}>ユーザ一覧</h3>
            <p className={inter.className}>Redmineのユーザ一覧表示</p>
          </Link>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const data = JSON.stringify({ time: new Date() })
  return { props: { data } }
}
