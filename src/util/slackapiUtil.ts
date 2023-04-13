/**
 * 日時を日付(yyyy/mm/dd)に変換
 * @param ts
 * @returns
 */
export const convertDate = (ts: string): string => {
  // 日付を変換
  const convertTs = ts.replace('.', '').slice(0, 13)
  let wrkDate = new Date(Number(convertTs)).toLocaleDateString().split('/')
  wrkDate[1] = wrkDate[1].padStart(2, '0')
  wrkDate[2] = wrkDate[2].padStart(2, '0')

  return wrkDate.join('/')
}
