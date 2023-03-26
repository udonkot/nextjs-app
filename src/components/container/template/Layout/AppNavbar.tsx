import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/Home.module.css'
import { AiOutlineHome } from 'react-icons/ai'
import { FiSlack } from 'react-icons/fi'
import { SiRedmine } from 'react-icons/si'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon
} from '@chakra-ui/icons'
import NextLink from 'next/link'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { alignPropType } from 'react-bootstrap/esm/types'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Text,
  Center,
  background
} from '@chakra-ui/react'

export default function AppNavbar() {
  return (
    <Navbar style={{ backgroundColor: '#ff8c00' }} className="navbar">
      <Center>
        <NextLink href={'/'} passHref>
          {/* <Navbar.Brand> */}
          <AiOutlineHome size="2rem" />
          {/* </Navbar.Brand> */}
        </NextLink>
        <Nav>
          <div className="container-fluid">
            <span className="navbar-text">
              <Text fontSize="2xl">DX Service Unit Tech Labo</Text>
            </span>
          </div>
        </Nav>
      </Center>
      {/* <Container> */}
      <Navbar.Collapse className="justify-content-end">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <NextLink href={'/rooms/slacklabo'} passHref>
              <MenuItem icon={<FiSlack />}>SlackLabo</MenuItem>
            </NextLink>
            <NextLink href={'/rooms/redminelabo'} passHref>
              <MenuItem icon={<SiRedmine />}>RedmineLabo</MenuItem>
            </NextLink>
            <NextLink href={'/rooms/kondolabo'} passHref>
              <MenuItem icon={<BsFillPersonLinesFill />}>PersonalLabo</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Navbar.Collapse>
    </Navbar>
  )
}
