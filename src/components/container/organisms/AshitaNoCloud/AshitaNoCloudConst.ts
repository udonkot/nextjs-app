/**
 * 等級ごとのウェイト型
 */
export type positionWeightType = {
  rank: string // 等級
  name: string // 等級名
  mbo: {
    totalWeight: number
    eigyoRiekiWeight: number
    unitArariWeight: number
    kojinArariWeight: number
  } // MBOウェイト
  skillMap1: {
    totalWeight: number
    item1Weight: number
    item2Weight: number
    item3Weight: number
    item4Weight: number
  } // スキルマップウェイト(個人、なし)
  skillMap2: {
    totalWeight: number
    item1Weight: number
    item2Weight: number
    item3Weight: number
    item4Weight: number
  } // スキルマップウェイト(後輩)
  responsibility: {
    totalWeight: number
    item1Weight: number
    item2Weight: number
    item3Weight: number
    item4Weight: number
  } // 役職職責ウェイト
}

/**
 * 等級ごとのウェイト値
 */
export const positionWeightList: positionWeightType[] = [
  {
    rank: '1',
    name: '1等級：PG',
    mbo: {
      totalWeight: 20,
      eigyoRiekiWeight: 0,
      unitArariWeight: 0,
      kojinArariWeight: 100
    },
    skillMap1: {
      totalWeight: 50,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    },
    skillMap2: {
      totalWeight: 0,
      item1Weight: 0,
      item2Weight: 0,
      item3Weight: 0,
      item4Weight: 0
    },
    responsibility: {
      totalWeight: 30,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    }
  },
  {
    rank: '2',
    name: '2等級：上級PG',
    mbo: {
      totalWeight: 20,
      eigyoRiekiWeight: 0,
      unitArariWeight: 0,
      kojinArariWeight: 100
    },
    skillMap1: {
      totalWeight: 50,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    },
    skillMap2: {
      totalWeight: 0,
      item1Weight: 0,
      item2Weight: 0,
      item3Weight: 0,
      item4Weight: 0
    },
    responsibility: {
      totalWeight: 30,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    }
  },
  {
    rank: '3',
    name: '3等級：SE',
    mbo: {
      totalWeight: 70,
      eigyoRiekiWeight: 0,
      unitArariWeight: 10,
      kojinArariWeight: 90
    },
    skillMap1: {
      totalWeight: 20,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    },
    skillMap2: {
      totalWeight: 0,
      item1Weight: 0,
      item2Weight: 0,
      item3Weight: 0,
      item4Weight: 0
    },
    responsibility: {
      totalWeight: 10,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    }
  },
  {
    rank: '6',
    name: '6等級：チームコーチ',
    mbo: {
      totalWeight: 80,
      eigyoRiekiWeight: 30,
      unitArariWeight: 70,
      kojinArariWeight: 0
    },
    skillMap1: {
      totalWeight: 10,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    },
    skillMap2: {
      totalWeight: 0,
      item1Weight: 0,
      item2Weight: 0,
      item3Weight: 0,
      item4Weight: 0
    },
    responsibility: {
      totalWeight: 10,
      item1Weight: 1,
      item2Weight: 1,
      item3Weight: 1,
      item4Weight: 1
    }
  }

  // {
  //   rank: '3',
  //   name: '3等級：SE',
  //   mbo: 70,
  //   skillMap1: 20,
  //   skillMap2: 0,
  //   responsibility: 10
  // },
  // {
  //   rank: '4',
  //   name: '4等級：上級SE',
  //   mbo: 70,
  //   skillMap1: 10,
  //   skillMap2: 10,
  //   responsibility: 20
  // },
  // {
  //   rank: '5',
  //   name: '5等級：スキルコーチ',
  //   mbo: 70,
  //   skillMap1: 20,
  //   skillMap2: 0,
  //   responsibility: 10
  // },
  // {
  //   rank: '6',
  //   name: '6等級：チームコーチ',
  //   mbo: 80,
  //   skillMap1: 10,
  //   skillMap2: 0,
  //   responsibility: 10
  // }
]
