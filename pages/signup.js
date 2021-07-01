import {
  Box,
  Flex,
  Image,
  Heading,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  useToast,
  Divider
} from '@chakra-ui/react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';

export default function Login() {
  const { signupwithEmail, signinWithGoogle, loading } = useAuth();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm();
  const watchPassword = watch('password', '');
  const onSubmit = (data, e, provider = false) => {
    const signupMethod = provider
      ? signinWithGoogle('/discover')
      : signupwithEmail(data.email, data.password, data.name, '/discover');

    signupMethod
      .then(() => {
        toast({
          title: 'Account created.',
          description: `We've created your account for you. Welcome to Project Local.`,
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      })
      .catch((error) => {
        toast({
          title: 'An error had occured.',
          description: error.message,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      });
  };

  return (
    <Box h="100vh" w="full">
      <Flex direction="row" h="full" w="full">
        <Image h="full" w="35%" src="/static/kuala-lumpur.jpeg"></Image>
        <Flex flex="1" h="full">
          <Flex
            p="12"
            w="full"
            maxWidth="650px"
            m="auto"
            align="center"
            justify="center"
            direction="column"
          >
            <Heading w="full" mb="8" size="lg" fontWeight="800" align="left">
              Sign up to Project Local
            </Heading>
            <Button
              isFullWidth
              mb="4"
              iconSpacing="4"
              colorScheme="blue"
              leftIcon={<FaGoogle />}
              onClick={onSubmit.bind(this, null, null, true)}
              isLoading={loading}
            >
              Sign up with Google
            </Button>
            <Stack direction="row" w="full" align="center" spacing="8" mb="4">
              <Divider borderColor="gray.500" />
              <Text>Or</Text>
              <Divider borderColor="gray.500" />
            </Stack>
            <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" mb="4">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="John Baker"
                  variant="filled"
                  w="full"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <Text pt="2" color="red.400">
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
              <FormControl id="email" mb="4">
                <FormLabel>Email address</FormLabel>
                <Input
                  w="full"
                  variant="filled"
                  placeholder="johnbaker@gmail.com"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address'
                    }
                  })}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                {errors.email && (
                  <Text pt="2" color="red.400">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
              <Stack direction="row" spacing="12" mb="6">
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      variant="filled"
                      placeholder="At least 8+ characters"
                      type={show ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must have at least 8 characters'
                        }
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        variant="unstyled"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        icon={<Icon as={show ? FaEyeSlash : FaEye} />}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text pt="2" color="red.400">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    variant="filled"
                    type="password"
                    placeholder="Re-enter password"
                    {...register('confirmPassword', {
                      validate: (value) =>
                        value === watchPassword || 'The passwords do not match'
                    })}
                  />

                  {errors.confirmPassword && (
                    <Text pt="2" color="red.400">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </FormControl>
              </Stack>
              <Button
                colorScheme="teal"
                isFullWidth
                type="submit"
                isLoading={loading}
              >
                Sign Me Up
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
