import { motion } from 'framer-motion'

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
      y: '100vh',
      transition: transition
    },
    odd: {
      top: 0,
      y: '-100vh',
      transition: transition
    }
  }

  const persnalList: string[] = ['hoge', 'moge', 'piyo']

  return (
    <>
      <motion.div id="curtains">
        {persnalList.map((x, i) => (
          <motion.div
            animate={i % 2 == 0 ? 'odd' : 'even'}
            className="curtain"
            variants={alternate}
            key={i}
          >
            {x}
          </motion.div>
        ))}
        hogehoge
      </motion.div>
    </>
  )
}

export default PersonalList
