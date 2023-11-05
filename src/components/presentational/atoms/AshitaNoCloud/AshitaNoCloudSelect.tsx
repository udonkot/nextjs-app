import React, { ChangeEventHandler } from 'react'

type PropsType = {
  optionNum: number
  onchange: ChangeEventHandler<HTMLSelectElement>
}

export const AshitaNoCloudSelect = (props: PropsType) => {
  const options: JSX.Element[] = []
  options.push(
    <option selected disabled defaultValue={'-'}>
      {'-'}
    </option>
  )

  let i = 0
  while (props.optionNum > i) {
    i = i + 1
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }

  ;() => {}

  return (
    <>
      <div>
        <select onChange={props.onchange}>{options}</select>
      </div>
    </>
  )
}

export default AshitaNoCloudSelect
