import React, { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const FavPage = () => {
  const { state, dispatch } = useContext(RecipeContext);
  const { favoriteRecipes, loading } = state;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch({ type: "RECIPE_FETCH_REQ" });
    fetch("http://localhost:4000/api/favorite")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "FETCH_FAV_RECIPE", payload: json });
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
                  <Link to={`/recipe/${recipe.recipeId._id}`}>
                    <div
                      class="card p-2 px-3 m-3"
                      style={{ width: " 17rem", height: "19.5rem" }}
                    >
                      <img
                        alt="..."
                        src={recipe.recipeId.image}
                        style={{ height: "15rem" }}
                        class="card-img-top"
                      />
                      <div class="card-body p-0 text-center">
                        <h5 class="card-title m-2 mb-0">
                          {recipe.recipeId.recipeName}
                        </h5>
                        <p class="card-text m-0">{recipe.recipeId.type}</p>
                      </div>
                    </div>
                  </Link>
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
