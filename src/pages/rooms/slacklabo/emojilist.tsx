import { slackEmojiType, slackUserType } from '@/type/slackapiType'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { RootState } from 'src/store/createStore'
import Image from 'next/image'
import { text } from 'stream/consumers'
import { defaultSlackEmoji } from '@/const/slackapiConstants'
import {
  Button,
  Tooltip,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box
} from '@chakra-ui/react'

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
  const [imgUrl, setImgUrl] = useState('')

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // defaultEmojiKeyList,
    // defaultEmojiValList,
    // emojiList,
    searchType,
    searchWord
  ])

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

  const mouseOverImg = (url: string) => {
    setImgUrl(url)
  }

  const copyButtonClick = (name: string) => {
    navigator.clipboard.writeText(':'.concat(name))
    toast({
      title: ':'.concat(name).concat(' copied!'),
      status: 'success',
      duration: 1000,
      isClosable: true
    })
  }

  const dispUserList = () => {
    const dataList: JSX.Element[] = []
    showEmojiList.forEach((data, idx) => {
      dataList.push(
        <Tr key={idx}>
          <Td>{data.no}</Td>
          <Td>:{data.name}</Td>
          {/* <td>{emojiValList[idx]}</td> */}
          {data.url && (
            <Td>
              <Image
                src={data.url}
                alt={data.url}
                width="25"
                height="25"
                onMouseOver={() => mouseOverImg(data?.url ?? '')}
                onClick={onOpen}
              />
            </Td>
          )}
          {data.uni && (
            <Td>
              <div
                onMouseOver={() => mouseOverImg(data?.uni ?? '')}
                onClick={onOpen}
              >
                <Text>
                  {String.fromCodePoint(parseInt(data.uni.slice(3), 16))}
                </Text>
              </div>
            </Td>
          )}
          <Td>
            <Button
              onClick={() => {
                copyButtonClick(data.name)
              }}
            >
              copy
            </Button>
          </Td>
        </Tr>
      )
    })
    return dataList
  }

  const searchTypeItem = ['全て', '標準のみ', 'カスタムのみ']

  return (
    <>
      <div className="emojilist-contents">
        <div className="body">
          <>
            <h3>Slack絵文字検索画面</h3>
            <Box className="information">
              <label>
                ・検索ワードに入力するとワークスペースで使用している絵文字が表示されます(部分一致)
                <br />
                ・ワークスペースで使用している絵文字の名前で検索ができます
                <br />
                ・copyボタンを押すとクリップボードにコピーできます
                <br />
                ・絵文字をクリックすると拡大されて表示されます
                <br />
              </label>
            </Box>
            <br />
            <label>検索ワード：</label>
            <Input
              type="text"
              onChange={searchWordChange}
              size="sm"
              width="40%"
            />
            <br />
            <label>検索条件：</label>
            <RadioGroup onChange={setSearchType} value={searchType}>
              <Stack direction="row">
                {searchTypeItem.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <Radio value={item}>{item}</Radio>
                      {/* <label>／{item}</label> */}
                      {/* <Input
                    type="radio"
                    value={item}
                    onChange={searchTypeChange}
                    checked={item === searchType}
                  /> */}
                    </div>
                  )
                })}
              </Stack>
            </RadioGroup>

            <TableContainer overflowX="unset" overflowY="unset">
              <Table variant="simple" colorScheme="teal">
                <Thead position="sticky" top={0} zIndex="docked">
                  <Tr bg="gray.200">
                    <Td>No</Td>
                    <Td>emoji名</Td>
                    <Td>img</Td>
                    <Td>copy</Td>
                  </Tr>
                </Thead>
                <Tbody>{dispUserList()}</Tbody>
              </Table>
            </TableContainer>
          </>
        </div>
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>emoji image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {imgUrl?.includes('http') && (
                <Image src={imgUrl} alt={imgUrl} width="200" height="200" />
              )}
              {!imgUrl?.includes('http') && imgUrl !== '' && (
                <Text fontSize="200px">
                  {String.fromCodePoint(parseInt(imgUrl.slice(3), 16))}
                </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>{' '}
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
