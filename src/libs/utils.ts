export async function uploadToFreeImage(
  imageFile: File,
): Promise<{ isSuccess: boolean; url?: string }> {
  const form = new FormData();
  form.append('source', imageFile);
  form.append('key', '6d207e02198a847aa98d0a2a901485a5');

  // Upload imageBuffer to the specified URL
  const response = await fetch('https://freeimage.host/api/1/upload', {
    method: 'POST',
    body: form,
  });
  const data = await response.json();

  if (!response.ok) {
    return { isSuccess: false };
  }

  return { isSuccess: true, url: data.image.url };
}

export async function uploadFile({
  file,
  action,
}: {
  file: Blob;
  action: () => void;
}) {
  const formData = new FormData();
  formData.append('image', file);

  await fetch('/api/photos', {
    method: 'POST',
    body: formData,
  });
  action();
}
