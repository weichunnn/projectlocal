import { useEditableControls, IconButton, ButtonGroup } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

export default function EditableControls() {
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
