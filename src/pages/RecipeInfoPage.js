import React, { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { BsFillHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const RecipeInfoPage = () => {
  const [isIngredient, setIsIngredient] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const { state, dispatch } = useContext(RecipeContext);
  const { selectedRecipe } = state;
  console.log(selectedRecipe);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    checkForLike();
  }, []);

  useEffect(() => {
    likeRecipe();
    checkForLike();
  }, [isLiked]);

  const fetchData = () => {
    fetch("http://localhost:4000/api/recipe/" + id)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "SELECTED_RECIPE_FETCH", payload: json });
      })
      .catch((error) => console.log(error.message));
  };

  const checkForLike = () => {
    fetch("http://localhost:4000/api/favorite/" + id)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setIsLiked(json.like);
      })
      .catch((error) => console.log(error.message));
  };

  const likeRecipe = async (id) => {
    const response = await fetch("http://localhost:4000/api/favorite", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container d-flex d-wrap">
      {selectedRecipe ? (
        <>
          {" "}
          <div
            className="image p-4 "
            style={{ width: "46%", border: "1px solid blue" }}
          >
            <img
              src={selectedRecipe.image}
              style={{ height: "30rem", width: "100%", borderRadius: "8px" }}
              class="img-fluid"
              alt="..."
            />
          </div>
          <div
            className="recipeInfo p-3"
            style={{ width: "53%", border: "1px solid red" }}
          >
            <div className="d-flex">
              <div style={{ width: "94%" }}>
                <h1> {selectedRecipe.recipeName}</h1>
              </div>
              <div style={{ width: "6%" }}>
                <h1>
                  {isLiked ? (
                    <BsFillHeartFill
                      style={{
                        color: "red",
                        fontSize: "28px",
                        marginLeft: "3px",
                      }}
                    />
                  ) : (
                    <BsHeart
                      style={{
                        // marginLeft: "38.5rem",
                        // marginRight: "6px",
                        // color: "red",
                        fontSize: "28px",
                      }}
                      onClick={() => {
                        likeRecipe(selectedRecipe._id);
                      }}
                    />
                  )}
                </h1>
              </div>
            </div>
            <div
              className="d-flex mt-3 mb-4"
              style={{
                textAlign: "center",
                fontSize: "20px",
                backgroundColor: "#bfbfbf",
              }}
            >
              <div
                className="ingredients"
                style={{
                  width: "50%",
                  backgroundColor: isIngredient ? "pink" : "",
                }}
                onClick={() => {
                  setIsIngredient(true);
                }}
              >
                Ingredients
              </div>
              <div
                className="procedure"
                style={{
                  width: "50%",
                  backgroundColor: isIngredient ? "" : "pink",
                }}
                onClick={() => {
                  setIsIngredient(false);
                }}
              >
                Procedure
              </div>
            </div>
            <div>
              {isIngredient ? (
                <ul>
                  {selectedRecipe.ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>;
                  })}
                </ul>
              ) : (
                <p style={{ fontSize: "20px" }}>{selectedRecipe.procedure}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecipeInfoPage;
