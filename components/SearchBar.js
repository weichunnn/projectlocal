import { useState, useEffect, useRef } from 'react';
import {
  Input,
  Kbd,
  InputLeftElement,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

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

export default function SearchBar(props) {
  const router = useRouter();

  const { showSearch, ...others } = props;
  const { search, onSearch } = useSearch();
  const inputRef = useRef();
  const slashPressed = useKeyPress(['Shift', 'K']);
  if (slashPressed) {
    inputRef.current.focus();
  }
  const showSearchBarRoutes = ['/discover', '/favourites', '/personal'];
  const showSearchBar = showSearchBarRoutes.includes(router.route);

  return (
    showSearchBar && (
      <InputGroup
        w="full"
        display={showSearch ? 'block' : ['none', null, null, 'block']}
        {...others}
      >
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
          // Flex to make children centered
          display={['none', 'none', 'flex']}
          width="10rem"
          children={
            <>
              <Kbd>shift</Kbd> + <Kbd>K</Kbd>
            </>
          }
        />
      </InputGroup>
    )
  );
}
