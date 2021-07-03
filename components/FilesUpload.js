import React, { useState } from 'react';
import ImageIcon from '@/components/ImageIcon';
import {
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Input,
  Button,
  Wrap,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  label,
  limitFiles = 10,
  ...otherProps
}) => {
  const toast = useToast();

  const [files, setFiles] = useState({});

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (files.length >= limitFiles) {
        toast({
          title: 'An error occured',
          description: `Maximum number of files (10) reached. Please try again.`,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      } else if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      } else {
        toast({
          title: 'An error occured',
          description: `File size of ${file.name} exceeds 5MB `,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      }
    }

    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (event) => {
    const { files: newFiles } = event.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <Flex
        pos="relative"
        align="center"
        justify="center"
        py="8"
        borderWidth={2}
        borderColor="gray.500"
        borderStyle="dashed"
        rounded="xl"
      >
        <Stack spacing="1" direction="column" fontSize="sm" align="center">
          <ImageIcon boxSize="12" />
          <Button>Upload Images or Drag and Drop</Button>
          <Input
            pos="absolute"
            top="0"
            left="0"
            opacity="0"
            h="full"
            bg="transparent"
            variant="outline"
            borderWidth={2}
            type="file"
            value=""
            onChange={handleNewFileUpload}
            {...otherProps}
          />
          <Text fontSize="sm" color="gray.500">
            {label}
          </Text>
        </Stack>
      </Flex>
      {Object.keys(files).length != 0 && (
        <>
          <Box mt="8" mb="4">
            <Text fontWeight="bold">Carousel Image Preview</Text>
            <Text fontSize="sm">
              Don't worry if your images are slightly cut off. We will make sure
              the final view is all good.
            </Text>
          </Box>

          <Wrap spacing="8">
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              let isImageFile = file.type.split('/')[0] === 'image';
              return (
                <Box key={fileName}>
                  {isImageFile && (
                    <Box pos="relative">
                      <Image
                        rounded="xl"
                        w="250px"
                        h="150px"
                        objectFit="cover"
                        src={URL.createObjectURL(file)}
                      />
                      <Text
                        ml="4"
                        mt="2"
                        color="white"
                        fontWeight="bold"
                        rounded="md"
                        pos="absolute"
                        top="0"
                      >
                        {convertBytesToKB(file.size)} kb
                      </Text>
                      <Flex
                        w="full"
                        align="center"
                        justify="space-between"
                        pos="absolute"
                        bottom="0"
                        color="white"
                        px="4"
                        mb="2"
                      >
                        <Text fontWeight="bold" rounded="md">
                          {file.name}
                        </Text>
                        <IconButton
                          bg="transparent"
                          aria-label="Delete Image"
                          icon={<FaTrash />}
                          onClick={() => removeFile(fileName)}
                        />
                      </Flex>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Wrap>
        </>
      )}
    </>
  );
};

export default FileUpload;
