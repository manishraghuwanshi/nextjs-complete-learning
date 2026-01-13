import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

type Meal = {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
};

type MealsGridProps = {
  meals: Meal[];
};

export default function MealsGrid({
  meals,
}: MealsGridProps): JSX.Element {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
