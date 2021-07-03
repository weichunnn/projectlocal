import {
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import { deleteBusiness } from '@/lib/db';

export default function DeleteBusinessButton({ businessId, status }) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onDelete = () => {
    deleteBusiness(businessId);
    mutate(
      ['/api/user-businesses', user.token],
      (data) => {
        return {
          businesses: data.businesses.filter(
            (business) => business.id !== businessId
          )
        };
      },
      false
    );
    if (status == 'active') {
      mutate(
        '/api/businesses',
        (data) => {
          return {
            // Null operator to handle edge case of user going straight to Personal Page
            // without first going to Discover Page, where useSWR is not called yet hence no cache is set
            businesses: data?.businesses?.filter(
              (business) => business.id !== businessId
            )
          };
        },
        false
      );
    }
    onClose();
  };

  return (
    <>
      <Button
        px="4"
        rounded="xl"
        variant="solid"
        colorScheme="red"
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      >
        <Icon as={FaTrash} />
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="scale"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg="red.200">
          <ModalHeader>Delete Business</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Once you delete your business on Project Local, there is no going
            back. Take some time to think about it or let us know if we can help
            in any ways.
          </ModalBody>
          <ModalFooter>
            <Button
              mr="4"
              fontWeight="bold"
              colorScheme="red"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
