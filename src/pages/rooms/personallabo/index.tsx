import { motion } from 'framer-motion'
import PersonalList from './PersonalList'

export const Personallabo = () => {
  // 上下に動きながら表示する
  const transition = {
    duration: 1,
    ease: [1, 0.01, 0.49, 1.05],
    delay: 0.4
  }

  return (
    <>
      <PersonalList />
      {/* <motion.div
        initial={{ opacity: 1, x: -10 }} // 初期状態
        animate={{ opacity: 10, x: 10 }} // マウント時
        exit={{ opacity: 0, y: 10 }} // アンマウント時
      >
        <div className="contents">
          <div className="body">personalList</div>
        </div>
      </motion.div> */}
    </>
  )
}

export default Personallabo
