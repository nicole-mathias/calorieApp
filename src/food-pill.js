import React from "react";

function FoodItems({ name, measure, calories, onFoodClick }) {
  return (
    <div className="section ow" onClick={() => onFoodClick({ calories, name })}>
      <ul className="container container-center">
        <li>
          {name} {measure} {calories}
        </li>
      </ul>
    </div>
  );
}

export default FoodItems;
