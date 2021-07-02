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
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  IconButton,
  ButtonGroup,
  InputLeftElement,
  FormErrorMessage,
  Select
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import ReactSelect from 'react-select';
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
import Logo from '@/components/Logo';
import FilesUpload from '@/components/FilesUpload';
import { useSearch } from '@/lib/search';

const DEFAULT_STORY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Gravida arcu ac tortor dignissim convallis aenean. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Et magnis dis parturient montes. In nisl nisi scelerisque eu ultrices vitae auctor eu. Adipiscing elit pellentesque habitant morbi tristique senectus. Facilisi nullam vehicula ipsum a arcu cursus. A diam sollicitudin tempor id eu nisl nunc mi. Ut morbi tincidunt augue interdum velit euismod. Euismod lacinia at quis risus sed vulputate odio ut. Odio aenean sed adipiscing diam donec adipiscing tristique. Sit amet justo donec enim diam vulputate ut pharetra sit.\n\nUt venenatis tellus in metus vulputate eu scelerisque. Viverra mauris in aliquam sem fringilla. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Quam viverra orci sagittis eu volutpat odio facilisis. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. In ante metus dictum at tempor commodo ullamcorper a lacus. Varius vel pharetra vel turpis nunc eget lorem. Egestas integer eget aliquet nibh praesent. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Nibh tellus molestie nunc non blandit massa enim nec dui. Nisl suscipit adipiscing bibendum est ultricies. Fringilla ut morbi tincidunt augue interdum velit euismod. Tempus urna et pharetra pharetra massa massa. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Massa eget egestas purus viverra accumsan in. At varius vel pharetra vel turpis nunc eget lorem. In vitae turpis massa sed elementum. Malesuada fames ac turpis egestas. At quis risus sed vulputate odio ut enim blandit. Eleifend mi in nulla posuere sollicitudin aliquam ultrices.\n\nId cursus metus aliquam eleifend. Sagittis vitae et leo duis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Adipiscing vitae proin sagittis nisl rhoncus mattis. Morbi tincidunt ornare massa eget egestas. Nunc sed id semper risus in hendrerit. Lacus luctus accumsan tortor posuere ac. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Id faucibus nisl tincidunt eget nullam non nisi est. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Consectetur a erat nam at lectus.\n\nSem nulla pharetra diam sit amet nisl suscipit. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. At varius vel pharetra vel turpis. Mattis molestie a iaculis at erat. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Fringilla phasellus faucibus scelerisque eleifend donec. Habitant morbi tristique senectus et netus et. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Morbi tempus iaculis urna id volutpat lacus. Dolor sit amet consectetur adipiscing elit duis tristique. Vulputate odio ut enim blandit. Erat velit scelerisque in dictum non consectetur. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant Etiam.';

export default function AddBusiness() {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [image, setImage] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);
  const { customLocations } = useSearch();

  useEffect(() => {
    setTempImages(
      Array(3)
        .fill('')
        .map(() => `https://picsum.photos/id/${generateRandomNum()}/400/300`)
    );
  }, []);

  const onImageInput = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  function generateRandomNum() {
    const rand = Math.floor(Math.random() * 1001);
    console.log('This is the random num', rand);

    return rand;
  }

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: '7px',
      border: state.isFocused
        ? '2px solid #3182CE'
        : errors?.categories
        ? '2px solid #E53E3E'
        : '1px solid #E2E8F0',
      '&:hover': {
        border: state.isFocused ? '2px solid #3182CE' : '1px solid #CBD5E0'
      }
    }),
    option: (provided) => ({
      ...provided
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#C2EBED',
      borderRadius: '5px'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: 'pink',
        color: 'white'
      }
    })
  };

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
    control
  } = useForm();
  const watchName = watch('name', 'Carpe Diem');

  const options = [
    { value: 'food & beverage', label: 'Food & Beverage' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return (
      <ButtonGroup
        px="4"
        size="md"
        spacing="4"
        variant="solid"
        colorScheme="teal"
      >
        {isEditing ? (
          <>
            <IconButton
              borderRadius="xl"
              icon={<CheckIcon />}
              {...getSubmitButtonProps()}
            />
            <IconButton
              borderRadius="xl"
              icon={<CloseIcon />}
              {...getCancelButtonProps()}
            />
          </>
        ) : (
          <IconButton
            borderRadius="xl"
            icon={<EditIcon />}
            {...getEditButtonProps()}
          />
        )}
      </ButtonGroup>
    );
  }
  const onSubmit = (data, e) => {
    console.log(data);
  };

  return (
    <>
      <Box
        pos="fixed"
        w="full"
        h="75px"
        zIndex="1000"
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
        </Flex>
      </Box>
      <Box pt="75px">
        <Box as="form" onSubmit={handleSubmit(onSubmit)} px="24" py="8">
          <Flex align="center" justify="space-between">
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
                    {watchName == '' ? 'Carpe Diem' : watchName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Button type="submit" variant="solid" colorScheme="teal" px="12">
              Submit
            </Button>
          </Flex>
          <Flex direction="column">
            <Flex mt="8" align="center" justify="space-between">
              <Flex align="center">
                <label htmlFor="businessImage">
                  <Avatar
                    bg="teal"
                    mr="8"
                    size="xl"
                    src={image}
                    icon={<Icon color="white" as={FaImage} />}
                  />
                  <VisuallyHidden>
                    <Input
                      id="businessImage"
                      onInput={onImageInput}
                      type="file"
                      {...register('businessImage', {
                        required: 'Business Image is required'
                      })}
                    />
                  </VisuallyHidden>
                </label>
                <FormControl isInvalid={errors.name}>
                  <Editable
                    placeholder="Carpe Diem"
                    fontWeight="bold"
                    fontSize="3xl"
                    color="gray.500"
                    isPreviewFocusable={false}
                    onSubmit={(value) => {
                      setValue('name', value);
                    }}
                  >
                    <Stack direction="row" align="center">
                      <VisuallyHidden>
                        // Prevent uneccessary rebuilds
                        <Input
                          opacity="1"
                          {...register('name', {
                            required: 'Name is required'
                          })}
                        />
                      </VisuallyHidden>
                      <EditablePreview px="4" />
                      <EditableInput px="4" />
                      <Flex align="center">
                        <EditableControls />
                      </Flex>
                      {errors.name && (
                        <FormErrorMessage fontWeight="normal">
                          {errors.name.message}
                        </FormErrorMessage>
                      )}
                    </Stack>
                  </Editable>
                </FormControl>
              </Flex>
              <Box>
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
              <Text pt="4" color="red.500" fontSize="sm">
                {errors.businessImage.message}
              </Text>
            )}
            <Box px="12" mt="8">
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
                  maxFileSizeInBytes="5000000"
                  label="Supports PNG, JPG, JPEG up to 5Mb"
                  updateFilesCb={(files) => setCarouselImages(files)}
                />
              </Box>
            </Box>
            <Box my="8">
              <Flex align="start" justify="space-between" mt="4">
                <Stack w="65%" spacing="8">
                  <FormControl isInvalid={errors.shortDesc}>
                    <Text mb="2" fontWeight="medium">
                      Short Description
                    </Text>
                    <Input
                      placeholder="Project Local aims to bring the community together in supporting local businesses"
                      {...register('shortDesc', {
                        required: 'Short Description is required.'
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
                      control={control}
                      rules={{
                        required:
                          'Please specify the category or categories of your business.'
                      }}
                      name="categories"
                      render={({ field }) => (
                        <ReactSelect
                          instanceId="_"
                          styles={customStyles}
                          isMulti
                          closeMenuOnSelect={false}
                          options={options}
                          noOptionsMessage={() =>
                            "Can't find your categories? Shoot us an email to get it added ! "
                          }
                          onChange={(selectedOptions) => {
                            const optionsArray = selectedOptions.map(
                              (option) => option.value
                            );
                            field.onChange(optionsArray);
                          }}
                        />
                      )}
                    />
                    {errors.categories && (
                      <FormErrorMessage>
                        {errors.categories.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.businessStory}>
                    <Heading mb="2" size="lg">
                      Our Beginning and Story
                    </Heading>
                    <Textarea
                      placeholder={DEFAULT_STORY}
                      rows="25"
                      {...register('businessStory', {
                        required:
                          'A compelling business story will let people know more about you. Try to come out with one or contact us if you need an idea.'
                      })}
                    />
                    <FormHelperText>
                      Tell us about how you started. We love to know more about
                      you and your story.
                    </FormHelperText>
                    {errors.businessStory && (
                      <FormErrorMessage>
                        {errors.businessStory.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>

                <Stack direction="column" w="25%" spacing="8">
                  <FormControl>
                    <Text mb="2" fontWeight="medium">
                      More Info Link
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        children={<Icon color="green" as={FaGlobeAsia} />}
                      />
                      <Input
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
                          placeholder="No. 21, Jalan Projek Lokal, Taman Lokal, 532049 Kuala Lumpur"
                          {...register('address')}
                        />
                      </Box>
                      <Box>
                        <Text mb="2">Contact Number</Text>
                        <InputGroup>
                          <InputLeftElement
                            children={<Icon as={FaPhoneAlt} />}
                          />
                          <Input
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
                                <Icon color="#3b5998" as={FaFacebookF} />
                              }
                            />
                            <Input
                              placeholder="https://www.facebook.com"
                              {...register('facebookLink')}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftElement
                              children={
                                <Icon color="#25D366" as={FaWhatsapp} />
                              }
                            />
                            <Input
                              placeholder="Click to Chat Link"
                              {...register('whatsappLink')}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftElement
                              children={<Icon as={FaInstagram} />}
                            />
                            <Input
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
        </Box>
      </Box>
    </>
  );
}
