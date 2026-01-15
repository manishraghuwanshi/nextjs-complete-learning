'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { saveMeal } from './meals';

function isInvalidText(text: string | null): boolean {
  return !text || text.trim() === '';
}

interface ShareMealState {
  message?: string;
}

export async function shareMeal(
  prevState: ShareMealState,
  formData: FormData
): Promise<ShareMealState | void> {
  const title = formData.get('title') as string | null;
  const summary = formData.get('summary') as string | null;
  const instructions = formData.get('instructions') as string | null;
  const creator = formData.get('name') as string | null;
  const creator_email = formData.get('email') as string | null;
  const image = formData.get('image') as File | null;

  if (
    isInvalidText(title) ||
    isInvalidText(summary) ||
    isInvalidText(instructions) ||
    isInvalidText(creator) ||
    isInvalidText(creator_email) ||
    !creator_email?.includes('@') ||
    !image ||
    image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal({
    title,
    summary,
    instructions,
    creator,
    creator_email,
    image,
  });

  revalidatePath('/meals');
  redirect('/meals');
}
