import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import FocusLock from 'react-focus-lock';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useUpdatePhoto } from '@/hooks/use-update-photo';
import type { IPhoto } from '@/types';
import { PhotoSchema } from '@/validations/PhotoValidation';

export type PhotoSchemaType = z.infer<typeof PhotoSchema>;

type FormProps = {
  onCancel: () => void;
  photo: IPhoto;
};

const Form: React.FC<FormProps> = ({ photo, onCancel }) => {
  const form = useForm<PhotoSchemaType>({
    resolver: zodResolver(PhotoSchema),
    defaultValues: {
      id: photo.id,
      comment: photo.comment,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const { onSubmit } = useUpdatePhoto({
    form,
    action: () => console.log('here...'),
  });

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.comment !== undefined}>
          <FormLabel htmlFor={photo.id}>Write a comment</FormLabel>
          <Input {...register('comment')} />
          <FormErrorMessage>
            {errors.comment && errors.comment.message}
          </FormErrorMessage>
        </FormControl>
        <ButtonGroup display="flex" justifyContent="flex-end">
          <Button mt={4} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </ButtonGroup>
      </form>
    </Stack>
  );
};

type PopoverFormProps = {
  image: React.ReactNode;
  photo: IPhoto;
};

const PopoverForm = ({ image, photo }: PopoverFormProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur
    >
      <PopoverTrigger>{image}</PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form onCancel={onClose} photo={photo} />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export { PopoverForm };
