import useSWR from 'swr';

export function useGetPhotos() {
  const url = `/api/photos`;
  return useSWR(url);
}
