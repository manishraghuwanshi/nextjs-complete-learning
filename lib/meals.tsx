import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export interface Meal {
  id?: number;
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
  image: string;
  slug: string;
}

export interface MealInput {
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
  image: File;
  slug?: string;
}

export async function getMeals(): Promise<Meal[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug: string): Meal | undefined {
  return db
    .prepare('SELECT * FROM meals WHERE slug = ?')
    .get(slug) as Meal | undefined;
}

export async function saveMeal(meal: MealInput): Promise<void> {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  const imagePath = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run({
    title: meal.title,
    summary: meal.summary,
    instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image: imagePath,
    slug
  });
}
