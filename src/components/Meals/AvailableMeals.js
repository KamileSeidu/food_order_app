import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/httpRequest";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsAvailble) => {
      // console.log(mealsAvailble);
      const loadedMeals = [];

      for (const meal in mealsAvailble) {
        loadedMeals.push({
          id: meal,
          name: mealsAvailble[meal].name,
          description: mealsAvailble[meal].description,
          price: mealsAvailble[meal].price,
        });
      }

      setMeals(loadedMeals);
      // console.log(loadedMeals);
    };

    fetchTasks(
      {
        url: "https://foodorder-67be1-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
      },
      transformMeals
    );
  }, [fetchTasks]);

  const mealsList = meals.map((meal) => (
    <li>
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{!isLoading && mealsList.length > 0 && mealsList}</ul>
        {!isLoading && mealsList.length === 0 && <p>No meals Found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>loading.....</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
