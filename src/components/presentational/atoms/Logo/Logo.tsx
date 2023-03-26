import Image from 'next/image'

export type props = {
  width: number
  height: number
}

/**
 * ユニットロゴ
 * @returns
 */
export const Logo = (props: { width: number; height: number }) => {
  return (
    <>
      {/* <div style={{ width: '800px', height: '800px', position: 'relative' }}> */}
      <Image
        src="/img/unitlogo.png"
        alt="Unit Logo"
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

export default Logo
