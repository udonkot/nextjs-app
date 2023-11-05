import AshitaNoCloudPositionSelect from '@/components/presentational/atoms/AshitaNoCloud/AshitaNoCloudPositionSelect'
import { useFocusEffect } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { positionWeightList, positionWeightType } from './AshitaNoCloudConst'
import AshitaNoCloudMBO from './AshitaNoCloudMBO'
import AshitaNoCloudResponsibility from './AshitaNoCloudResponsibility'
import AshitaNoCloudSkillMap from './AshitaNoCloudSkillMap'

import { Text } from '@chakra-ui/react'

export const AshitaNoCloud = () => {
  const [selectedPotision, setSelectedPosition] = useState<positionWeightType>()
  const [mboScore, setMboScore] = useState<number>(0)
  const [skillMapScore, setSkillMapScore] = useState<number>(0)
  const [responsibilityScore, setResponsibilityScore] = useState<number>(0)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [totalBg, setTotalBg] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const totalScore = mboScore + skillMapScore + responsibilityScore
    setTotalScore(totalScore)

    if (totalScore !== 0) {
      if (totalScore >= 60) {
        setTotalBg('yellow.100')
        setMessage('※昇格条件を満たしています')
      } else if (totalScore < 30) {
        setTotalBg('red.100')
        setMessage('※降格条件を満たしています')
      } else {
        setTotalBg('')
        setMessage('')
      }
    }
  }, [mboScore, responsibilityScore, skillMapScore])

  const changePositionSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const ret = positionWeightList.find(
      (data) => data.rank === event.target.value
    )

    if (ret !== undefined) {
      setSelectedPosition(ret)
    }
  }

  return (
    <>
      <div>
        <AshitaNoCloudPositionSelect onchange={changePositionSelect} />
        選択された役職：{selectedPotision?.name}
        <br />
        {selectedPotision !== undefined && (
          <>
            <Text fontSize="5xl" bg={totalBg}>
              ■総合計：{totalScore}　{message}
            </Text>
            <AshitaNoCloudSkillMap
              positionWeight={selectedPotision}
              setScore={setSkillMapScore}
            />
            <br />
            <AshitaNoCloudResponsibility
              positionWeight={selectedPotision}
              setScore={setResponsibilityScore}
            />
            <br />
            <AshitaNoCloudMBO
              positionWeight={selectedPotision}
              setScore={setMboScore}
            />
          </>
        )}
      </div>
    </>
  )
}

export default AshitaNoCloud
