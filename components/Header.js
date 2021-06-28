import { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Input,
  Kbd,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Link
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import Logo from './Logo';
import { useSearch } from '@/lib/search';
const useKeyPress = (targets) => {
  let keysPressed = [];
  const [shortcutPressed, setShortcutPressed] = useState(false);

  const downHandler = ({ key }) => {
    keysPressed.push(key);
    if (targets.every((target) => keysPressed.includes(target))) {
      setShortcutPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (targets.includes(key)) {
      delete keysPressed[keysPressed.indexOf(key)];
      setShortcutPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return shortcutPressed;
};

export default function Header() {
  const inputRef = useRef();
  const slashPressed = useKeyPress(['Shift', 'K']);
  const { search, onSearch } = useSearch();

  if (slashPressed) {
    inputRef.current.focus();
  }

  return (
    <Box
      w="full"
      h="75px"
      bg="white"
      margin="0 auto"
      px="8"
      borderBottomWidth="1px"
    >
      <Flex align="center" justify="space-between" h="100%">
        <NextLink href="/" passHref>
          <Link>
            <Logo boxSize="10" />
          </Link>
        </NextLink>
        <InputGroup w="full" mx="16">
          <InputLeftElement
            children={<SearchIcon color="teal.300" boxSize="4" />}
          />
          <Input
            type="text"
            placeholder="Search Project Local"
            ref={inputRef}
            autoFocus={slashPressed}
            onChange={onSearch}
            value={search}
          />
          <InputRightElement
            width="10rem"
            children={
              <>
                <Kbd>shift</Kbd> + <Kbd>K</Kbd>
              </>
            }
          />
        </InputGroup>
      </Flex>
    </Box>
  );
}
