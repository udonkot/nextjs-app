import { AnyAction } from '@reduxjs/toolkit'
import test from 'node:test'
import { Dispatch } from 'react'
import { setAppHeaderArea } from 'src/util/commonUtil'
test('check', () => {
  // commonUtil.tsのsetAppHeaderAreaをテスト

  const title = ''
  const braedCrumbList: string[] = []
  const dispatch: Dispatch<AnyAction> = (dispatch: any, getState: any) => {
    return dispatch
  }

  // テスト対象の関数を実行
  const result = setAppHeaderArea(title, braedCrumbList, dispatch)

  // 期待値を設定
  const expected = 'app-header-area'

  // 結果を検証
  expect(result).toBe(expected)
})
