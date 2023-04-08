import { Dispatch } from '@reduxjs/toolkit'
import { setState as setAppHeader } from 'src/slice/appHeaderSlice'

/**
 *
 * @param val
 * @param dispatch
 */
export const setHeaderTitle = (val: string, dispatch: Dispatch) => {
  // storeにセット
  dispatch(
    setAppHeader({
      title: val
    })
  )
}
