import React, { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
// import {  TiDeleteOutline } from "react-icons/ti";

const FavPage = () => {
  const { state, dispatch } = useContext(RecipeContext);
  const { favoriteRecipes, loading } = state;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch({ type: "RECIPE_FETCH_REQ" });
    fetch("https://recipe-app-service-53ct.onrender.com/api/favorite")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch({ type: "FETCH_FAV_RECIPE", payload: json });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const disLike = async (id) => {
    const response = await fetch(
      "https://recipe-app-service-53ct.onrender.com/api/favorite/" + id,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="ms-4 mt-5 ">Favorite Recipe</h1>
      <div className="container my-5 d-flex flex-wrap">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {" "}
            {favoriteRecipes ? (
              favoriteRecipes.map((recipe) => {
                return (
                  <div
                    class="card p-2 px-3 m-3"
                    style={{
                      width: " 17rem",
                      height: "19.5rem",
                      position: "relative",
                    }}
                  >
                    <TiDelete
                      style={{
                        // color:"gray",
                        fontSize: "36px",
                        position: "absolute",
                        right: "0",
                        top: "0",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        disLike(recipe.recipeId._id);
                      }}
                    />
                    <img
                      alt="..."
                      src={recipe.recipeId.image}
                      style={{ height: "15rem" }}
                      class="card-img-top"
                    />
                    <Link
                      key={recipe._id}
                      to={`/recipe/${recipe.recipeId._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        class="card-body p-0 text-center"
                        style={{ color: "black" }}
                      >
                        <h5 class="card-title m-2 mb-0">
                          {recipe.recipeId.recipeName}
                        </h5>
                        <p class="card-text m-0">{recipe.recipeId.type} </p>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavPage;
