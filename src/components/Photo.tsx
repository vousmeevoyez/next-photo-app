import { Image } from '@chakra-ui/react';

import { PopoverForm } from '@/components/PopoverForm';
import type { IPhoto } from '@/types';

type PhotogProps = {
  data: IPhoto;
};

const size = 24;

const Photo = ({ data }: PhotogProps) => {
  const { image: src } = data;
  const image = <Image src={src} height={size} width={size} role="button" />;
  return <PopoverForm image={image} photo={data} />;
};

export { Photo };
