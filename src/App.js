import "./styles.css";
import React from "react";
import calorieData from "./data/food-data.js";
import FoodItems from "./food-pill.js";
import food_image from "./images/food.svg";

let listItems = [];
let listCalories = [];

function Header({ heading }) {
  return (
    <div>
      <h1> {heading}</h1>
    </div>
  );
}

function CalorieText({ caloriesClicked, foodClicked }) {
  return (
    <div className="total-calories">
      <h2>Total Calories : {caloriesClicked}</h2>
      <h2> Food Item : {foodClicked}</h2>
    </div>
  );
}

function FooterGenerator({ text1, text2, text3, text4 }) {
  return (
    <div className="footer">
      <p style={{ color: "#FBBF24" }}>{text1}</p>
      <p style={{ textDecoration: "underline", color: "#FDE68A" }}>{text2}</p>
      <div className="footer-text">
        <p>{text3}</p>
        <p>{text4}</p>
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalCalories: 0,
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = ({ calories, name }) => {
    this.setState({
      totalCalories: this.state.totalCalories + calories,
      name: name
    });
    listItems.push(name);
    listCalories.push(calories);
  };

  handleRemove = () => {
    // the remove button removed the last added element
    listItems.pop();

    this.setState({
      name: "",
      // we also need to subtract the calories for the item removed
      totalCalories:
        this.state.totalCalories - listCalories[listCalories.length - 1]
    });
    // we need to keep the list updated with the last added calorie value
    // so we need to pop, to get the latest end value
    listCalories.pop();
  };

  render() {
    return (
      <div className="App">
        {/* <img src={food_image} alt="food_image" /> */}

        <div className="navigation">
          <Header heading={"🍕 Calorie App 🍟"} />
        </div>

        <h3 className="container container-center">Select items</h3>

        {calorieData.slice(0, 10).map((items) => (
          <FoodItems
            name={items.name}
            measure={items.measure}
            calories={items.calories}
            onFoodClick={({ calories, name }) =>
              this.handleClick({ calories, name })
            }
          />
        ))}

        <CalorieText
          caloriesClicked={this.state.totalCalories}
          foodClicked={this.state.name}
        />

        <h2 className="total-calories">Selected items</h2>

        {listItems.map((item) => (
          <ul
            className="container container-center"
            style={{ listStyleType: "none" }}
          >
            <li>{item}</li>
          </ul>
        ))}

        <button className="btn" onClick={this.handleRemove}>
          Remove
        </button>

        <FooterGenerator
          text1={"~ Keep track of your daily calories and stay healthy ~"}
          text2={"Health Facts"}
          text3={"~ Women require 2000 calories per day"}
          text4={"~ Men require 2,500 calories per day"}
        />

        {/* <div class="footer">
          <p style={{ color: "#FBBF24" }}>
            ~ Keep track of your daily calories and stay healthy ~
          </p>
          <p style={{ textDecoration: "underline", color: "#FDE68A" }}>
            Health Facts :{" "}
          </p>
          <div id="footer-text">
            <p>Women require 2000 calories per day</p>
            <p>Men require 2,500 calories per day</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
