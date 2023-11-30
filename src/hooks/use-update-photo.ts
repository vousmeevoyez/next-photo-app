import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import type { JsonResponse } from '@/types';
import type { PhotoSchema } from '@/validations/PhotoValidation';

export type PhotoSchemaType = z.infer<typeof PhotoSchema>;

type UseUpdatePhotoProps = {
  form: UseFormReturn<PhotoSchemaType>;
  action: () => void;
};

export function useUpdatePhoto({ form, action }: UseUpdatePhotoProps) {
  const onSubmit = async (values: z.infer<typeof PhotoSchema>) => {
    const r = await fetch('/api/photos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const jsonResponse: JsonResponse<{}> = await r.json();
    if (r.status >= 400) {
      form.setError('comment', {
        type: r.status.toString(),
        message: jsonResponse.msg,
      });
      return;
    }
    action();
  };

  return {
    onSubmit,
  };
}
