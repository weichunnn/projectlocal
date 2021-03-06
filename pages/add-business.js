import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  FormControl,
  Input,
  InputGroup,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Editable,
  EditableInput,
  EditablePreview,
  InputLeftElement,
  FormErrorMessage,
  Select,
  useToast,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react';
import CreatableSelect from 'react-select/creatable';

import { useState, useEffect } from 'react';
import {
  FaHeart,
  FaBookmark,
  FaImage,
  FaGlobeAsia,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt
} from 'react-icons/fa';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';

import Carousel from '@/components/Carousel';
import EditableControls from '@/components/EditableControls';
import FilesUpload from '@/components/FilesUpload';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import SeoWrapper from '@/components/SeoWrapper';
import { useSearch } from '@/lib/search';
import Header from '@/components/Header';
import { createBusiness } from '@/lib/db';
import generateRandomNum from '@/utils/randomNum';
import ReactSelectStyles from '@/styles/reactSelectStyles';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

const MAX_FILE_SIZE = '5000000';
const DEFAULT_STORY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Gravida arcu ac tortor dignissim convallis aenean. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Et magnis dis parturient montes. In nisl nisi scelerisque eu ultrices vitae auctor eu. Adipiscing elit pellentesque habitant morbi tristique senectus. Facilisi nullam vehicula ipsum a arcu cursus. A diam sollicitudin tempor id eu nisl nunc mi. Ut morbi tincidunt augue interdum velit euismod. Euismod lacinia at quis risus sed vulputate odio ut. Odio aenean sed adipiscing diam donec adipiscing tristique. Sit amet justo donec enim diam vulputate ut pharetra sit.\n\nUt venenatis tellus in metus vulputate eu scelerisque. Viverra mauris in aliquam sem fringilla. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Quam viverra orci sagittis eu volutpat odio facilisis. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. In ante metus dictum at tempor commodo ullamcorper a lacus. Varius vel pharetra vel turpis nunc eget lorem. Egestas integer eget aliquet nibh praesent. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Nibh tellus molestie nunc non blandit massa enim nec dui. Nisl suscipit adipiscing bibendum est ultricies. Fringilla ut morbi tincidunt augue interdum velit euismod. Tempus urna et pharetra pharetra massa massa. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Massa eget egestas purus viverra accumsan in. At varius vel pharetra vel turpis nunc eget lorem. In vitae turpis massa sed elementum. Malesuada fames ac turpis egestas. At quis risus sed vulputate odio ut enim blandit. Eleifend mi in nulla posuere sollicitudin aliquam ultrices.\n\nId cursus metus aliquam eleifend. Sagittis vitae et leo duis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Adipiscing vitae proin sagittis nisl rhoncus mattis. Morbi tincidunt ornare massa eget egestas. Nunc sed id semper risus in hendrerit. Lacus luctus accumsan tortor posuere ac. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Id faucibus nisl tincidunt eget nullam non nisi est. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Consectetur a erat nam at lectus.\n\nSem nulla pharetra diam sit amet nisl suscipit. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. At varius vel pharetra vel turpis. Mattis molestie a iaculis at erat. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Fringilla phasellus faucibus scelerisque eleifend donec. Habitant morbi tristique senectus et netus et. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Morbi tempus iaculis urna id volutpat lacus. Dolor sit amet consectetur adipiscing elit duis tristique. Vulputate odio ut enim blandit. Erat velit scelerisque in dictum non consectetur. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant Etiam.';

const AddBusiness = () => {
  const { colorMode } = useColorMode();
  const inputBg = { light: null, dark: 'gray.700' };

  const toast = useToast();
  const router = useRouter();

  const { user } = useAuth();
  const { customLocations, customCategories } = useSearch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm();
  const customStyles = ReactSelectStyles(errors, colorMode);

  var saveState = false;
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    setTempImages(
      Array(3)
        .fill('')
        .map(() => `https://picsum.photos/id/${generateRandomNum()}/400/300`)
    );
    const formData = localStorage.getItem('newBusinessFormData');
    if (formData) {
      const parsedData = JSON.parse(formData);
      setInitialData(parsedData);
      reset(parsedData);
    }
  }, [reset]);

  const onImageInput = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      files[0].size < MAX_FILE_SIZE
        ? setImage(files[0])
        : toast({
            title: 'An error occured',
            description: `File size of ${files[0].name} exceeds 5MB.`,
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true
          });
    }
  };

  const onSubmit = async (data) => {
    if (saveState) {
      setLoading(true);
      const { businessImage, carouselImages, ...otherData } = data;
      localStorage.setItem('newBusinessFormData', JSON.stringify(otherData));
      if (!toast.isActive('save-toast')) {
        toast({
          id: 'save-toast',
          title: 'All Saved',
          description:
            "We successfully saved your text data in the browser's local storage. Image files are too big to be saved however.",
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      }
      setLoading(false);
    } else {
      setLoading(true);
      const businessData = {
        ...data,
        createdAt: new Date().toISOString(),
        authorId: user.uid,
        status: 'pending',
        businessImage: image,
        carouselImages: carouselImages,
        categories: data.categories.map((category) => category['value'])
      };
      createBusiness(businessData)
        .then(() => {
          localStorage.removeItem('newBusinessFormData');
          toast({
            title: 'Application Submitted',
            description:
              'Thank you for submitting your business. Our team will get back to you soon.',
            status: 'success',
            position: 'top-right',
            duration: 7500,
            isClosable: true
          });
          router.replace('/personal');
        })
        .catch((error) => {
          if (!toast.isActive('error-toast')) {
            toast({
              id: 'error-toast',
              title: 'Something went wrong somewhere',
              description:
                "Sorry, we didn't manage to save your data. Please try again in a short while.",
              status: 'error',
              position: 'top-right',
              duration: 7500,
              isClosable: true
            });
          }
        })
        .then(() => setLoading(false));
    }
  };

  return (
    <>
      <Header />
      <Box pt="75px">
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          px={['8', null, '24']}
          py="8"
        >
          <Flex
            direction={['column', null, 'row']}
            align={[null, null, 'center']}
            justify="space-between"
          >
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <NextLink href="/" passHref>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                  </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <NextLink href="/discover" passHref>
                    <BreadcrumbLink>Discover</BreadcrumbLink>
                  </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>
                    {Object.keys(initialData).length
                      ? initialData['name']
                      : 'Carpe Diem'}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Stack
              direction="row"
              spacing="4"
              display={['none', null, 'block']}
            >
              <Button
                isLoading={loading}
                type="submit"
                variant="outline"
                colorScheme="teal"
                px="12"
                onClick={() => {
                  saveState = true;
                }}
              >
                Save
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                variant="solid"
                colorScheme="teal"
                px="12"
                onClick={() => {
                  saveState = false;
                }}
              >
                Submit
              </Button>
            </Stack>
          </Flex>
          <Flex direction="column">
            <Flex
              direction={['column', null, 'row']}
              mt="8"
              align="center"
              justify="space-between"
            >
              <Flex direction={['column', null, 'row']} align="center">
                <label htmlFor="businessImage">
                  <Avatar
                    bg="teal"
                    mr="8"
                    size={useBreakpointValue({ base: 'lg', md: 'xl' })}
                    src={image ? URL.createObjectURL(image) : null}
                    icon={<Icon color="white" as={FaImage} />}
                  />
                  <VisuallyHidden>
                    <Input
                      id="businessImage"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      onInput={onImageInput}
                      {...register('businessImage', {
                        required: 'Business Image is required'
                      })}
                    />
                  </VisuallyHidden>
                </label>
                {errors.businessImage && (
                  <Text
                    pt="4"
                    color="red.500"
                    fontSize="sm"
                    display={['block', null, 'none']}
                  >
                    {errors.businessImage.message}
                  </Text>
                )}
                <FormControl isInvalid={errors.name} mt={['4', null, '0']}>
                  <Controller
                    control={control}
                    rules={{
                      required: 'Business name is required'
                    }}
                    name="name"
                    render={({ field }) => (
                      <Editable
                        {...field}
                        onSubmit={(value) =>
                          setInitialData({
                            ...initialData,
                            name: value
                          })
                        }
                        placeholder="Carpe Diem"
                        fontWeight="bold"
                        fontSize={['xl', null, '3xl']}
                        color={colorMode == 'light' ? 'gray.500' : 'white'}
                        isPreviewFocusable={false}
                      >
                        <Stack
                          direction={['column', null, 'row']}
                          align="center"
                        >
                          <Flex align="center">
                            <EditablePreview px="4" />
                            <EditableInput px="4" bg={inputBg[colorMode]} />
                            <EditableControls />
                          </Flex>
                          {errors.name && (
                            <FormErrorMessage fontWeight="normal">
                              {errors.name.message}
                            </FormErrorMessage>
                          )}
                        </Stack>
                      </Editable>
                    )}
                  />
                </FormControl>
              </Flex>
              <Box mt={['4', null, '0']}>
                <Button
                  leftIcon={<Icon as={FaHeart} />}
                  colorScheme={like ? 'red' : 'teal'}
                  variant={like ? 'solid' : 'outline'}
                  onClick={() => setLike(!like)}
                  mr="8"
                >
                  {like ? 'Liked' : 'Like'}
                </Button>
                <Button
                  leftIcon={<Icon as={FaBookmark} />}
                  colorScheme="teal"
                  variant={bookmark ? 'solid' : 'outline'}
                  onClick={() => setBookmark(!bookmark)}
                >
                  {bookmark ? 'Saved' : 'Save'}
                </Button>
              </Box>
            </Flex>
            {errors.businessImage && (
              <Text
                pt="4"
                color="red.500"
                fontSize="sm"
                display={['none', null, 'block']}
              >
                {errors.businessImage.message}
              </Text>
            )}
            <Box px={['4', null, '12']} mt="12">
              <Carousel
                imageUrls={
                  carouselImages.length
                    ? carouselImages.map((file) => {
                        return URL.createObjectURL(file);
                      })
                    : tempImages
                }
              />
              <Box mt="8">
                <FilesUpload
                  multiple
                  accept=".jpg,.png,.jpeg"
                  maxFileSizeInBytes={MAX_FILE_SIZE}
                  label="Supports PNG, JPG, JPEG up to 5Mb"
                  updateFilesCb={(files) => setCarouselImages(files)}
                />
              </Box>
            </Box>
            <Box my="8">
              <Flex
                direction={['column', null, 'row']}
                align="start"
                justify="space-between"
                mt="4"
              >
                <Stack w={['100%', null, '65%']} spacing="8">
                  <FormControl isInvalid={errors.shortDesc}>
                    <Text mb="2" fontWeight="medium">
                      Short Description
                    </Text>
                    <Input
                      bg={inputBg[colorMode]}
                      placeholder="Project Local aims to bring the community together in supporting local businesses"
                      {...register('shortDesc', {
                        required: 'Short Description is required.',
                        maxLength: {
                          value: 85,
                          message:
                            'A short description should be short! Think about what do you want people to know when they see your short description.'
                        }
                      })}
                    />
                    <FormHelperText>
                      A short and memorable description help people to remember
                      what are you about.
                    </FormHelperText>
                    {errors.shortDesc && (
                      <FormErrorMessage>
                        {errors.shortDesc.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.categories}>
                    <Text mb="2" fontWeight="medium">
                      Category
                    </Text>
                    <Controller
                      name="categories"
                      control={control}
                      rules={{
                        required:
                          'Please specify the category or categories of your business.'
                      }}
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          instanceId="_"
                          styles={customStyles}
                          closeMenuOnSelect={false}
                          isClearable
                          isMulti
                          noOptionsMessage={() =>
                            "Can't find your categories? Create it instead or contact us to get it added !"
                          }
                          options={customCategories.map((category) => {
                            return { value: category, label: category };
                          })}
                        />
                      )}
                    />
                    {errors.categories && (
                      <FormErrorMessage>
                        {errors.categories.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.story}>
                    <Heading mb="2" size="lg">
                      Our Beginning and Story
                    </Heading>
                    <Textarea
                      bg={inputBg[colorMode]}
                      placeholder={DEFAULT_STORY}
                      rows="25"
                      {...register('story', {
                        required:
                          'A compelling business story will let people know more about you. Try to come out with one or contact us if you need an idea.',
                        maxLength: {
                          value: 3250,
                          message:
                            'Too many words may not be a concise read for your readers. Try to reduce some words.'
                        }
                      })}
                    />
                    <FormHelperText>
                      Tell us about how you started. We love to know more about
                      you and your story.
                    </FormHelperText>
                    {errors.story && (
                      <FormErrorMessage>
                        {errors.story.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Stack
                  direction="column"
                  w={['100%', null, '25%']}
                  spacing="8"
                  mt={['8', null, '0']}
                >
                  <FormControl>
                    <Text mb="2" fontWeight="medium">
                      More Info Link
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        children={
                          <Icon
                            color={colorMode == 'light' ? 'green' : '#39FE15'}
                            as={FaGlobeAsia}
                          />
                        }
                      />
                      <Input
                        bg={inputBg[colorMode]}
                        placeholder="https://www.projectlocal.vercel.app"
                        {...register('primaryLink')}
                      />
                    </InputGroup>
                    <FormHelperText>
                      Insert link for people to get to know more about you.
                    </FormHelperText>
                  </FormControl>
                  <Box>
                    <Text mb="1" fontWeight="medium">
                      Contact Details
                    </Text>
                    <Stack spacing="4">
                      <Box>
                        <FormControl isInvalid={errors.location}>
                          <Text mb="2">Location</Text>
                          <Select
                            bg={inputBg[colorMode]}
                            placeholder="Select a Location"
                            isFullWidth
                            {...register('location', {
                              required: 'Business Location is required'
                            })}
                          >
                            {customLocations.map((location) => {
                              return (
                                <option key={location} value={location}>
                                  {location}
                                </option>
                              );
                            })}
                          </Select>
                          {errors.location && (
                            <FormErrorMessage>
                              {errors.location.message}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </Box>
                      <Box>
                        <Text mb="2">Address</Text>
                        <Textarea
                          bg={inputBg[colorMode]}
                          placeholder="No. 21, Jalan Projek Lokal, Taman Lokal, 532049 Kuala Lumpur"
                          {...register('address', {
                            maxLength: 125
                          })}
                        />
                      </Box>
                      <Box>
                        <Text mb="2">Contact Number</Text>
                        <InputGroup>
                          <InputLeftElement
                            children={<Icon as={FaPhoneAlt} />}
                          />
                          <Input
                            bg={inputBg[colorMode]}
                            placeholder="+6012-28282828"
                            {...register('contactNumber')}
                          />
                        </InputGroup>
                      </Box>
                      <Box>
                        <Text mb="2">Social Media</Text>
                        <Stack direction="column" spacing="4">
                          <InputGroup>
                            <InputLeftElement
                              children={
                                <Icon
                                  color={
                                    colorMode == 'light' ? '#3b5998' : '#0185F5'
                                  }
                                  as={FaFacebookF}
                                />
                              }
                            />
                            <Input
                              bg={inputBg[colorMode]}
                              placeholder="https://www.facebook.com"
                              {...register('facebookLink')}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftElement
                              children={
                                <Icon color="#22D266" as={FaWhatsapp} />
                              }
                            />
                            <Input
                              bg={inputBg[colorMode]}
                              placeholder="Click to Chat Link"
                              {...register('whatsappLink')}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftElement
                              children={<Icon as={FaInstagram} />}
                            />
                            <Input
                              bg={inputBg[colorMode]}
                              placeholder="https://www.instagram.com"
                              {...register('instagramLink')}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftElement
                              children={
                                <Icon color="#0077B5" as={FaLinkedinIn} />
                              }
                            />
                            <Input
                              bg={inputBg[colorMode]}
                              placeholder="https://www.linkedin.com"
                              {...register('linkedinLink')}
                            />
                          </InputGroup>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Box>
          </Flex>
          <Stack direction="row" spacing="4" display={['block', null, 'none']}>
            <Button
              isLoading={loading}
              type="submit"
              variant="outline"
              colorScheme="teal"
              px="12"
              onClick={() => {
                saveState = true;
              }}
            >
              Save
            </Button>
            <Button
              isLoading={loading}
              type="submit"
              variant="solid"
              colorScheme="teal"
              px="12"
              onClick={() => {
                saveState = false;
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default function FavouritesPage() {
  return (
    <SeoWrapper name="Add A Business" path="/add-business">
      {PrivateRouteWrapper(AddBusiness)()}
    </SeoWrapper>
  );
}
