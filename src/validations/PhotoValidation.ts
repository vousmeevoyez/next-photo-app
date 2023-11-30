import { z } from 'zod';

export const PhotoSchema = z.object({
  id: z.string().min(1).nonempty(),
  comment: z.string().min(1).nonempty(),
});
