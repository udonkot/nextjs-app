import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  SimpleGrid
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setAppHeaderArea } from '@/util/commonUtil'

export default function Home({ data }: { data: { time: string } }) {
  const dispatch = useDispatch()

  // storeにセット
  setAppHeaderArea('Main Page', [], dispatch)

  // const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    // fetch('/api/time')
    //   .then((res) => res.json())
    //   .then((json) => setTime(new Date(json.time)))
    let timeoutId = setTimeout(() => {
      //setShowTitle(true)
    }, 7000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card bg="gray.400">
          <CardHeader>
            <Heading size="md"> Slack Labo</Heading>
          </CardHeader>
          <CardBody>
            <Text>Slack APIを利用した学習、動作検証用</Text>
          </CardBody>
          <CardFooter>
            <Link href="/rooms/slacklabo">
              <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card bg="gray.400">
          <CardHeader>
            <Heading size="md"> Redmine Labo</Heading>
          </CardHeader>
          <CardBody>
            <Text>Redmine APIを利用した学習、動作検証用</Text>
          </CardBody>
          <CardFooter>
            <Link href="/rooms/redminelabo">
              <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card bg="gray.400">
          <CardHeader>
            <Heading size="md"> Personal Labo</Heading>
          </CardHeader>
          <CardBody>
            <Text>個人的な学習、動作検証用</Text>
          </CardBody>
          <CardFooter>
            <Link href="/rooms/personallabo">
              <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  )
}

export const getServerSideProps = async () => {
  const data = JSON.stringify({ time: new Date() })
  return { props: { data } }
}
