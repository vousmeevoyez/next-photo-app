'use client';

import { Flex, Wrap, WrapItem } from '@chakra-ui/react';

import { Photo } from '@/components/Photo';
import { useGetPhotos } from '@/hooks/use-get-photos';
import type { IPhoto } from '@/types';

const PhotoList = () => {
  let { data } = useGetPhotos();

  if (!data) data = [];

  const photos = data.map((photo: IPhoto) => {
    const { id } = photo;
    return (
      <WrapItem key={id}>
        <Photo data={photo} />
      </WrapItem>
    );
  });

  return (
    <Flex gap={2} justifyContent="center" alignItems="center">
      <Wrap>{photos}</Wrap>
    </Flex>
  );
};

export { PhotoList };
