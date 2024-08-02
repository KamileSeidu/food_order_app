import classes from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h1>Delicious Food, Delivered to You</h1>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious luch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingerdients, just-in-line and
        of course by experience chefs!
      </p>
    </section>
  );
}

export default MealsSummary;
