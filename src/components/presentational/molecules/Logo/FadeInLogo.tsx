import UnitLogo from '@/components/presentational/atoms/Logo/UnitLogo'
import { Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

export const FadeInLogo = () => {
  useEffect(() => {}, [])

  return (
    <>
      <div className="center">
        <AnimatePresence>
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <style jsx>{`
                div Image {
                  width: 80%;
                  margin: 0 auto;
                  text-align: center;
                }
              `}</style>
              <UnitLogo width={400} height={400} />{' '}
              <Text fontSize="6xl" textAlign="center">
                DX Service Unit Tech Labo
              </Text>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

export default FadeInLogo
