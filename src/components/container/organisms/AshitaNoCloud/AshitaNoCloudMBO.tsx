import AshitaNoCloudSelect from '@/components/presentational/atoms/AshitaNoCloud/AshitaNoCloudSelect'
import { useEffect, useState } from 'react'
import { positionWeightType } from './AshitaNoCloudConst'

import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
import { calcMBOScore } from './AshitaNoCloudLogic'

type PropsType = {
  positionWeight: positionWeightType
  setScore: (score: number) => void
}
export const AshitaNoCloudMBO = (props: PropsType) => {
  const [eigyoRieki, setEigyoRieki] = useState(0)
  const [unitArari, setUnitArari] = useState(0)
  const [kojinArari, setKojinArari] = useState(0)
  const [mboTotal, setMboTotal] = useState(0)

  const weight = props.positionWeight.mbo.totalWeight

  useEffect(() => {
    let wrkMboTotal = 0
    if (props.positionWeight.mbo.eigyoRiekiWeight > 0) {
      // 営業利益計算
      wrkMboTotal += calcMBOScore(
        weight,
        props.positionWeight.mbo.eigyoRiekiWeight,
        eigyoRieki
      )
    }
    if (props.positionWeight.mbo.unitArariWeight > 0) {
      // ユニット別　粗利目標計算
      wrkMboTotal += calcMBOScore(
        weight,
        props.positionWeight.mbo.unitArariWeight,
        unitArari
      )
    }
    if (props.positionWeight.mbo.kojinArariWeight > 0) {
      // ユニット内　個人粗利目標計算
      wrkMboTotal += calcMBOScore(
        weight,
        props.positionWeight.mbo.kojinArariWeight,
        kojinArari
      )
    }

    setMboTotal(wrkMboTotal)
    props.setScore(wrkMboTotal)
  }, [
    eigyoRieki,
    unitArari,
    kojinArari,
    props.positionWeight.mbo.eigyoRiekiWeight,
    props.positionWeight.mbo.unitArariWeight,
    props.positionWeight.mbo.kojinArariWeight,
    weight,
    props
  ])

  // 営業利益入力
  const changeEigyoRieki: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setEigyoRieki(Number(event.target.value))
  }

  // ユニット別　粗利目標
  const changeUnitArari: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setUnitArari(Number(event.target.value))
  }

  // ユニット内　個人粗利目標
  const changeKojinArari: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setKojinArari(Number(event.target.value))
  }

  return (
    <>
      <div>
        <Text fontSize="3xl">
          ■MBO：ウェイト{props.positionWeight.mbo.totalWeight}
        </Text>
        <br />
        <TableContainer overflowX="unset" overflowY="unset">
          <Table variant="simple" colorScheme="teal">
            <Thead position="sticky" top={0} zIndex="docked">
              <Tr>
                <Th bg="gray.200" width="10%">
                  営業利益
                </Th>
                <Td>{props.positionWeight?.mbo?.eigyoRiekiWeight}</Td>
                <Td>
                  <AshitaNoCloudSelect
                    optionNum={6}
                    onchange={changeEigyoRieki}
                  />
                </Td>
              </Tr>

              <Tr>
                <Th bg="gray.200">ユニット別　粗利目標</Th>
                <Td>{props.positionWeight?.mbo?.unitArariWeight}</Td>
                <Td>
                  <AshitaNoCloudSelect
                    optionNum={6}
                    onchange={changeUnitArari}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th bg="gray.200">ユニット内　個人粗利目標</Th>
                <Td>{props.positionWeight?.mbo?.kojinArariWeight}</Td>
                <Td>
                  <AshitaNoCloudSelect
                    optionNum={6}
                    onchange={changeKojinArari}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th bg="gray.200">評点合計</Th>
                <Td>-</Td>
                <Td>{mboTotal}</Td>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default AshitaNoCloudMBO
