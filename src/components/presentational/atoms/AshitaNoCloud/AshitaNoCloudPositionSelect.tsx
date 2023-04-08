import React, { ChangeEventHandler } from 'react'
import { positionWeightList } from 'src/components/container/organisms/AshitaNoCloud/AshitaNoCloudConst'
type PropsType = {
  onchange: ChangeEventHandler<HTMLSelectElement>
}

export const AshitaNoCloudPositionSelect = (props: PropsType) => {
  const options: JSX.Element[] = []
  options.push(
    <option defaultChecked defaultValue={'-'}>
      {'-'}
    </option>
  )

  positionWeightList.forEach((data) => {
    options.push(
      <option key={data.rank} value={data.rank}>
        {data.name}
      </option>
    )
  })

  return (
    <>
      <div>
        <select onChange={props.onchange}>{options}</select>
      </div>
    </>
  )
}

export default AshitaNoCloudPositionSelect
