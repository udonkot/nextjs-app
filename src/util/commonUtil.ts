import { Dispatch } from '@reduxjs/toolkit'
import { setState as setAppHeader } from 'src/slice/appHeaderSlice'

/**
 * ヘッダ設定
 * @param val
 * @param dispatch
 */
export const setAppHeaderArea = (
  title: string,
  braedCrumbList: string[],
  dispatch: Dispatch
) => {
  // storeにセット
  dispatch(
    setAppHeader({
      title: title,
      braedCrumbList: braedCrumbList
    })
  )
}
