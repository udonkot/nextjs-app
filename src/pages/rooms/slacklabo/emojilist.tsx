import { slackEmojiType, slackUserType } from '@/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { RootState } from 'src/store/createStore'
import Image from 'next/image'
import { text } from 'stream/consumers'
import { defaultSlackEmoji } from '@/const/slackapiConstants'

/**
 * Slackユーザ一覧取得API
 * @returns
 */
const getEmojiList = async () => {
  const response = await fetch('/api/slackapi/emojilist')
  const data = await response.json()
  return data
}

type showEmojiType = {
  no: number
  name: string
  type: string
  url?: string
  uni?: string
}

/**
 * Slackユーザ一覧画面
 * @returns
 */
export const EmojiList = () => {
  // storeから取得
  // const slackUser = useSelector(
  //   (state: RootState) => state.slackUser.slackUserList
  // )
  // const dispatch = useDispatch()

  // useState
  const [showEmojiList, setShowEmojiList] = useState<showEmojiType[]>([])

  const defaultEmoji = defaultSlackEmoji

  const defaultEmojiKeyList = Object.keys(defaultEmoji)
  const defaultEmojiValList = Object.values(defaultEmoji)

  const [emojiList, setEmojiList] = useState<slackEmojiType[]>([])

  const [searchWord, setSearchWord] = useState('')
  const [searchType, setSearchType] = useState('全て')

  // 初期表示後の処理
  useEffect(() => {
    getSlackEmoji()
  }, [])

  useEffect(() => {
    const newEmojiList: showEmojiType[] = []
    // const emojiKeyList = Object.keys(res.emoji)
    // const emojiValList = Object.values(res.emoji)

    if (searchType === '全て' || searchType === 'カスタムのみ') {
      const hitIndex: number[] = []
      emojiList.filter((data, idx) => {
        if (data.key.includes(searchWord)) {
          hitIndex.push(idx)
        }
      })
      hitIndex.forEach((idx) => {
        newEmojiList.push({
          no: idx + 1,
          type: 'custom',
          name: emojiList[idx].key,
          url: emojiList[idx].value
        })
      })
    }

    if (searchType === '全て' || searchType === '標準のみ') {
      const defaultHitIndex: number[] = []
      defaultEmojiKeyList.filter((data, idx) => {
        if (data.includes(searchWord)) {
          defaultHitIndex.push(idx)
        }
      })

      defaultHitIndex.forEach((idx) => {
        newEmojiList.push({
          no: idx + 1,
          type: 'default',
          name: defaultEmojiKeyList[idx],
          uni: defaultEmojiValList[idx]
        })
      })
    }

    setShowEmojiList(newEmojiList)
  }, [defaultEmojiKeyList, defaultEmojiValList, searchType, searchWord])

  // Slackカスタム絵文字取得
  const getSlackEmoji = async () => {
    const emojis = (await getEmojiList()) as slackEmojiType[]
    setEmojiList(emojis)
    // storeにセット
    // dispatch(
    //   setStateSlackUser({
    //     slackUserList: users
    //   })
    // )
  }

  const searchWordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchWord(event.target.value)
  }

  const searchTypeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchType(event.target.value)
  }

  const dispUserList = () => {
    const dataList: JSX.Element[] = []
    showEmojiList.forEach((data, idx) => {
      dataList.push(
        <tr key={idx}>
          <td>{data.no}</td>
          <td>{data.name}</td>
          {/* <td>{emojiValList[idx]}</td> */}
          {data.url && (
            <td>
              <Image src={data.url} alt={data.url} width="25" height="25" />
            </td>
          )}
          {data.uni && (
            <td>{String.fromCodePoint(parseInt(data.uni.slice(3), 16))}</td>
          )}
        </tr>
      )
    })
    return dataList
  }

  const searchTypeItem = ['全て', '標準のみ', 'カスタムのみ']

  return (
    <>
      <div className="contents">
        <div className="body">
          <>
            <h3>Slack絵文字検索画面</h3>
            <label>
              ワークスペースで使用している絵文字の名前で検索ができます
            </label>
            <br />
            <label>検索ワード：</label>
            <input type="text" onChange={searchWordChange} />
            <br />
            <label>検索条件：</label>
            {searchTypeItem.map((item) => {
              return (
                <>
                  <label>／{item}</label>
                  <input
                    type="radio"
                    value={item}
                    onChange={searchTypeChange}
                    checked={item === searchType}
                  />
                </>
              )
            })}

            <table border={1}>
              <thead>
                <tr>
                  <td>No</td>
                  <td>emoji名</td>
                  {/* <td>url</td> */}
                  <td>img</td>
                </tr>
              </thead>
              <tbody>{dispUserList()}</tbody>
            </table>
          </>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default EmojiList
