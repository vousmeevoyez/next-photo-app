'use client';

import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

import { DataURIToBlob, FileUploader } from '@/components/FileUploader';
import { uploadFile } from '@/libs/utils';

const CallToAction = () => {
  const [showSpinner, setSpinner] = useState(false);

  const onUploadStart = () => {
    setSpinner(true);
  };

  const onUploadEnd = async (
    items: {
      path: string;
      type: 'file' | 'folder';
      name: string;
      mimeType: string;
      data: string;
    }[],
  ) => {
    await Promise.all(
      items.map(async ({ data }) => {
        const file = DataURIToBlob(data);
        await uploadFile({
          file,
          action: () => setSpinner(false),
        });
      }),
    );
  };

  return (
    <Box textAlign="center">
      <Flex justifyContent="center" alignItems="center" gap={2}>
        {showSpinner ? (
          <Spinner size="xl" />
        ) : (
          <FileUploader
            maxSize={10 * 1000000}
            fileType="other"
            primaryColor="red.400"
            secondaryColor="gray.100"
            backgroundColor="transparent"
            showOver
            onUploadStart={onUploadStart}
            onUploadEnd={onUploadEnd}
          />
        )}
      </Flex>
    </Box>
  );
};

export { CallToAction };
