/**
 * スキルマップ評点計算
 * @param weight
 * @param value
 * @returns
 */
export const calcSkillMapScore = (weight: number, value: number) => {
  const base = weight / 4
  const point = value / 4

  return base * point
}

/**
 * MBO評点計算
 * @param totalWeight
 * @param weight
 * @param value
 * @returns
 */
export const calcMBOScore = (
  totalWeight: number,
  weight: number,
  value: number
) => {
  const base = totalWeight * (weight / 100)
  const point = value / 6

  return base * point
}
