import React, { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";

const SubnavBar = () => {
  const { state, dispatch } = useContext(RecipeContext);

  // useEffect(()=>{
  //   fetchByCategory()
  // },[])

  const fetchByCategory = (category) => {
    dispatch({ type: "SELECT_CATEGORY", payload: category });
    fetch("http://localhost:4000/api/recipe/category/" + encodeURIComponent(category))
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "RECIPE_FETCH_SUCCESS", payload: json });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div class="container mt-5 d-flex justify-content-evenly">
      <div
        class=" mx-3 mb-4"
        style={{ width: "10rem", cursor: "pointer" }}
        onClick={() => {
          fetchByCategory("Salad");
        }}
      >
        <img
          src="https://i0.wp.com/manjits.com/wp-content/uploads/2022/11/indian-green-salad.jpg?fit=550%2C412&ssl=1"
          class="card-img-top"
          alt="..."
          style={{
            height: "122px",
            borderRadius: "50%",
            border: "dotted orange  5px",
          }}
        />
        <div class="card-body my-2">
          <h5 class="card-title text-center ">Salad</h5>
        </div>
      </div>
      <div
        class=" mx-3"
        style={{ width: "10rem", cursor: "pointer" }}
        onClick={() => {
          fetchByCategory("Breakfast");
        }}
      >
        <img
          src="https://d3c699y7ogacoe.cloudfront.net/wp-content/uploads/2021/04/Header46-620x375.jpg"
          class="card-img-top"
          alt="..."
          style={{
            height: "122px",
            borderRadius: "50%",
            border: "dotted orange  5px",
          }}
        />
        <div class="card-body my-2">
          <h5 class="card-title text-center">Breakfast</h5>
        </div>
      </div>
      <div
        class=" mx-3"
        style={{ width: "10rem",cursor: "pointer" }}
        onClick={() => {
          fetchByCategory("Main Course");
        }}
      >
        <img
          src="https://img.freepik.com/premium-photo/indian-lunch-dinner-main-course-food-group-includes-paneer-butter-masala-dal-makhani-palak-paneer-roti-rice-etc-selective-focus_466689-6725.jpg"
          class="card-img-top"
          alt="..."
          style={{
            height: "122px",
            borderRadius: "50%",
            border: "dotted orange  5px",
          }}
        />
        <div class="card-body my-2">
          <h5 class="card-title text-center">Main Course</h5>
        </div>
      </div>
      <div
        class=" mx-3"
        style={{ width: "10rem",cursor: "pointer" }}
        onClick={() => {
          fetchByCategory("Drinks");
        }}
      >
        <img
          src="https://townsquare.media/site/115/files/2021/01/RS15421_462654571.jpg"
          class="card-img-top"
          alt="..."
          style={{
            height: "122px",
            borderRadius: "50%",
            border: "dotted orange 5px",
          }}
        />
        <div class="card-body my-2">
          <h5 class="card-title text-center">Drinks</h5>
        </div>
      </div>
      <div
        class=" mx-3"
        style={{ width: "10rem",cursor: "pointer" }}
        onClick={() => {
          fetchByCategory("Dessert");
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQyKUz50et2uUly6UehJVLoeLp5QRVyP6cyYhqhn6L5WiQl3xPT5hO3bE6ZtMHNZGsZQ&usqp=CAU"
          class="card-img-top"
          alt="..."
          style={{
            height: "122px",
            borderRadius: "50%",
            border: "dotted orange 5px",
          }}
        />
        <div class="card-body my-2">
          <h5 class="card-title text-center">Dessert</h5>
        </div>
      </div>
    </div>
  );
};

export default SubnavBar;
