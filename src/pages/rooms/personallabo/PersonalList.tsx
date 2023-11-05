import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { motion, spring } from 'framer-motion'

type props = {
  num: number
}

const PersonalList = () => {
  const transition = {
    duration: 1,
    ease: [1, 0.01, 0.49, 1.05],
    delay: 0.4
  }

  const alternate = {
    even: {
      top: -10,
      y: '100vh',
      transition: transition
    },
    odd: {
      top: -10,
      y: '-100vh',
      transition: transition
    }
  }

  const persnalList: string[] = ['hoge', 'moge', 'piyo']

  return (
    <>
      {/* {persnalList.map((x, i) => (
        <motion.div
          animate={i % 2 == 0 ? 'odd' : 'even'}
          className="curtain"
          variants={alternate}
          key={i}
        >
          {x}
        </motion.div>
      ))} */}
      {/* <motion.div id="curtain">
        <div>hogehoge</div>
        <div>piyo</div>
      </motion.div> */}
      <motion.div
        initial={{ opacity: 1, x: 0 }} // 初期状態
        className="curtain"
        transition={{ type: spring }} // アンマウント時
      >
        <div className="contents">
          <Link href="/rooms/personallabo/kondolabo">
            <Button>View here</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: -10 }} // 初期状態
        className="curtain"
        animate={{ opacity: 10, x: 10 }} // マウント時
        exit={{ opacity: 0, y: 10 }} // アンマウント時
      >
        <div className="contents">
          <div className="body">piyopiyo</div>
        </div>
      </motion.div>
    </>
  )
}

export default PersonalList
