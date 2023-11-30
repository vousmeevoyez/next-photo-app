import { randomBytes } from 'crypto';
import { JSONPreset } from 'lowdb/node';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { uploadToFreeImage } from '@/libs/utils';
import type { IPhotos } from '@/types';
import { PhotoSchema } from '@/validations/PhotoValidation';

async function setupDb() {
  const defaultData: IPhotos = { photos: [] };
  const db = await JSONPreset<IPhotos>('db.json', defaultData);
  const { photos } = db.data;
  return { db, photos };
}

const { db, photos } = await setupDb();

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as unknown as File | null;
    if (!imageFile) {
      return NextResponse.json(null, { status: 400 });
    }

    const randomString = randomBytes(8).toString('hex');

    const { isSuccess, url } = await uploadToFreeImage(imageFile);
    if (!isSuccess) {
      return NextResponse.json(null, { status: 400 });
    }

    const record = { id: randomString, image: url!, comment: '' };
    await db.read();
    photos.push(record);
    await db.write();

    return NextResponse.json(record);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async (_: Request) => {
  return NextResponse.json(photos);
};

export const PUT = async (request: Request) => {
  const payload = await request.json();
  const validatedPayload = PhotoSchema.safeParse(payload);

  if (!validatedPayload.success) {
    const errorResponse = JSON.stringify(validatedPayload, null, 2);
    return NextResponse.json(errorResponse, { status: 400 });
  }

  const {
    data: { id: photoId, comment },
  } = validatedPayload;
  const photo = photos.find(({ id }) => id === photoId);
  photo!.comment = comment;

  await db.write();

  return NextResponse.json({ id: photoId, comment }, { status: 200 });
};
