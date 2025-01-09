/**
 * unix日時を日付(yyyy/mm/dd)に変換
 * @param ts
 * @returns
 */
export const convertDate = (ts: string): string => {
  // 日付を変換
  const convertTs = ts.replace('.', '').slice(0, 13)

  let wrkDate = new Date(Number(convertTs))
    .toLocaleDateString('ja-JP')
    .split('/')

  wrkDate[1] = wrkDate[1].padStart(2, '0')
  wrkDate[2] = wrkDate[2].padStart(2, '0')

  return wrkDate.join('/')
}

/**
 * YYYY/MM形式の直近3か月の年月を取得する
 */
export const getYYYYMMList = (): string[] => {
  const date = new Date()
  // 当月を追加
  const ret: string[] = [
    createYYYYMM(date.toLocaleDateString('ja-JP').split('/'))
  ]

  // 前月、2ヶ月前を追加
  for (let i = 1; 3 > i; i += 1) {
    const wrkDate = new Date()
    const wrkMonth = wrkDate.getMonth() - i
    if (wrkMonth < 0) {
      // 前年を取得
      wrkDate.setFullYear(wrkDate.getFullYear() - 1)
      wrkDate.setMonth(12 + wrkMonth)
      ret.push(createYYYYMM(wrkDate.toLocaleDateString('ja-JP').split('/')))
    } else {
      wrkDate.setMonth(wrkMonth)
      ret.push(createYYYYMM(wrkDate.toLocaleDateString('ja-JP').split('/')))
    }
  }

  return ret
}

export const createYYYYMM = (data: string[]): string => {
  return data[0].concat('/', data[1].padStart(2, '0'))
}

/**
 * YYYY/MM形式の直近3か月のDate型を取得する
 */
export const get3MonthDate = (): Date[] => {
  let ret: Date[] = []

  const wrkDate = new Date()
  const orgDate = new Date()
  for (let i = 0; i < 3; i += 1) {
    const wrkMonth = orgDate.getMonth() - i
    switch (wrkMonth) {
      case 0:
        wrkDate.setMonth(0)
        wrkDate.setDate(1)
        wrkDate.setMinutes(0)
        break
      case -1:
      case -2:
        wrkDate.setFullYear(orgDate.getFullYear() - 1)
        wrkDate.setMonth(12 + wrkMonth)
        wrkDate.setDate(1)
        wrkDate.setMinutes(0)
        break
      default:
        wrkDate.setMonth(wrkMonth)
        wrkDate.setDate(1)
        wrkDate.setMinutes(0)
        break
    }

    // console.log('wrkDate:' + wrkDate)
    ret.push(new Date(wrkDate))
    // console.log('wrkMonth:' + wrkMonth)
  }

  // console.log('ret:' + ret.length)

  return ret
}
