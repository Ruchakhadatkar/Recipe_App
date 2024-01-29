import React, { useContext, useEffect } from "react";
import SubnavBar from "../component/SubnavBar";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const HomePage = () => {
  const { state, dispatch } = useContext(RecipeContext);
  const { loading, recipes, error, selectedCategory } = state;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "RECIPE_FETCH_REQ" });

    const response = await fetch(
      "https://recipe-app-service-53ct.onrender.com/api/recipe"
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "RECIPE_FETCH_SUCCESS", payload: json });
      })
      .catch((error) => {
        dispatch({ type: "RECIPE_FETCH_ERROR" });
      });
  };

  return (
    <>
      <div
        className="subnavbar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <SubnavBar />
      </div>
      <div className="container mx-auto">
        <h1 className="ms-4 mt-5 " style={{ fontSize: "28px" }}>
          {selectedCategory}
        </h1>
        <div className="container my-4 d-flex flex-wrap ">
          {loading ? (
            <div
              class="spinner"
              style={{
                margin: "auto",
                marginTop:"7rem",
                color:"gray",
              }}
            >
              <Spinner animation="border" role="status" style={{width:"45px", height:"45px"}}>
                <span className="visually-hidden" >Loading...</span>
              </Spinner>
            </div>
          ) : (
            <></>
          )}
          {recipes.map((recipe) => {
            return (
              <Link
                to={`/recipe/${recipe._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  class="card p-2 px-3 m-3"
                  style={{ width: " 17rem", height: "19.5rem" }}
                >
                  <img
                    src={recipe.image}
                    style={{ height: "15rem" }}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body p-0 text-center">
                    <h5 class="card-title m-2 mb-0">{recipe.recipeName}</h5>
                    <p class="card-text m-0">{recipe.type}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
