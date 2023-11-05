import Image from 'next/image'

export type props = {
  width: number
  height: number
}

/**
 * ユニットロゴ
 * @returns
 */
export const KondoLogo = (props: { width: number; height: number }) => {
  return (
    <>
      {/* <div style={{ width: '800px', height: '800px', position: 'relative' }}> */}
      <Image
        src="/img/kondologo.png"
        alt="Kondo Logo"
        width={props.width}
        height={props.height}
        // style={{
        //   width: 'auto',
        //   height: 'auto'
        // }}
      />
      {/* </div> */}
    </>
  )
}

export default KondoLogo
