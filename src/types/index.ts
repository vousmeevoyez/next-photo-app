export type IPhoto = {
  id: string;
  comment: string;
  image: string;
};

export type IPhotos = {
  photos: IPhoto[];
};

export type JsonResponse<T> = {
  data: T;
  msg: string;
};
