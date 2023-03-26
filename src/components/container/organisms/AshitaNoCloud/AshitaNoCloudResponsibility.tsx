import AshitaNoCloudSelect from '@/components/presentational/atoms/AshitaNoCloud/AshitaNoCloudSelect'
import { Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
import { positionWeightType } from './AshitaNoCloudConst'
import { calcSkillMapScore } from './AshitaNoCloudLogic'

type PropsType = {
  positionWeight: positionWeightType
  setScore: (score: number) => void
}
export const AshitaNoCloudResponsibility = (props: PropsType) => {
  const [item1, setItem1] = useState(0)
  const [item2, setItem2] = useState(0)
  const [item3, setItem3] = useState(0)
  const [item4, setItem4] = useState(0)
  const [responsibilityTotal, setResponsibilityTotal] = useState(0)

  const weight = props.positionWeight.responsibility.totalWeight

  useEffect(() => {
    let wrkResponsibilityTotal = 0
    // 項目1計算
    wrkResponsibilityTotal += calcSkillMapScore(weight, item1)
    // 項目2計算
    wrkResponsibilityTotal += calcSkillMapScore(weight, item2)
    // 項目3計算
    wrkResponsibilityTotal += calcSkillMapScore(weight, item3)
    // 項目4計算
    wrkResponsibilityTotal += calcSkillMapScore(weight, item4)

    setResponsibilityTotal(wrkResponsibilityTotal)
    props.setScore(wrkResponsibilityTotal)
  }, [item1, item2, item3, item4, props, weight])

  // 項目1選択
  const changeItem1: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setItem1(Number(event.target.value))
  }

  // 項目2選択
  const changeItem2: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setItem2(Number(event.target.value))
  }

  // 項目3選択
  const changeItem3: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setItem3(Number(event.target.value))
  }

  // 項目4選択
  const changeItem4: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setItem4(Number(event.target.value))
  }
  return (
    <>
      <div>
        <Text fontSize="3xl">
          ■役割職責評価：ウェイト
          {props.positionWeight.responsibility.totalWeight}
        </Text>
        <br />
        <TableContainer overflowX="unset" overflowY="unset">
          <Table variant="simple" colorScheme="teal">
            <Thead position="sticky" top={0} zIndex="docked">
              <Tr>
                <Th bg="gray.200" width="10%">
                  役割職責項目１
                </Th>
                <Td>{props.positionWeight?.responsibility?.item1Weight}</Td>
                <Td>
                  <AshitaNoCloudSelect optionNum={4} onchange={changeItem1} />
                </Td>
              </Tr>

              <Tr>
                <Th bg="gray.200">役割職責項目２</Th>
                <Td>{props.positionWeight?.responsibility?.item2Weight}</Td>
                <Td>
                  <AshitaNoCloudSelect optionNum={4} onchange={changeItem2} />
                </Td>
              </Tr>
              <Tr>
                <Th bg="gray.200">役割職責項目３</Th>
                <Td>{props.positionWeight?.responsibility?.item3Weight}</Td>
                <Td>
                  <AshitaNoCloudSelect optionNum={4} onchange={changeItem3} />
                </Td>
              </Tr>
              <Tr>
                <Th bg="gray.200">役割職責項目４</Th>
                <Td>{props.positionWeight?.responsibility?.item4Weight}</Td>
                <Td>
                  <AshitaNoCloudSelect optionNum={4} onchange={changeItem4} />
                </Td>
              </Tr>
              <Tr>
                <Th bg="gray.200">評点合計</Th>
                <Td>-</Td>
                <Td>{responsibilityTotal}</Td>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default AshitaNoCloudResponsibility
