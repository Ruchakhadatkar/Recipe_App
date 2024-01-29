import React, { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { BsFillHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import "./RecipeInfo.css"

const RecipeInfoPage = () => {
  const [isIngredient, setIsIngredient] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const { state, dispatch } = useContext(RecipeContext);
  const { selectedRecipe } = state;
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    checkForLike();
  }, []);

  const fetchData = () => {
    fetch("https://recipe-app-service-53ct.onrender.com/api/recipe/" + id)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "SELECTED_RECIPE_FETCH", payload: json });
      })
      .catch((error) => console.log(error.message));
  };

  const checkForLike = () => {
    fetch("https://recipe-app-service-53ct.onrender.com/api/favorite/" + id)
      .then((res) => res.json())
      .then((json) => {
        setIsLiked(json.like);
      })
      .catch((error) => console.log(error.message));
  };

  const likeRecipe = async (id) => {
    const response = await fetch(
      "https://recipe-app-service-53ct.onrender.com/api/favorite",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // body data type must match "Content-Type" header
      }
    )
      .then((res) => res.json())
      .then((json) => {
        checkForLike();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const disLike = async () => {
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
        checkForLike();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container d-flex  ">
      {selectedRecipe ? (
        <>
          {" "}
          <div
            className="image p-4 d- m-0"
            style={{
              borderTop: "1px solid gray",
              borderBottom: "1px solid gray",
              borderLeft: "1px solid gray",
              borderRadius: "8px",
              width: "46%",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <img
              src={selectedRecipe.image}
              style={{ height: "30rem", width: "100%", borderRadius: "8px" }}
              class="img-fluid"
              alt="..."
            />
          </div>
          <div
            className="recipeInfo p-4 pt-3 m-0"
            style={{
              width: "53%",
              // height: "100%",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
          >
            <div className="d-flex p-0">
              <div style={{ width: "93%" }}>
                <h1> {selectedRecipe.recipeName}</h1>
              </div>
              <div style={{ width: "7%", cursor: "pointer" }}>
                <h1>
                  {isLiked ? (
                    <BsFillHeartFill
                      style={{
                        color: "red",
                        fontSize: "28px",
                      }}
                      onClick={disLike}
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
                cursor: "pointer",
                textAlign: "center",
                fontSize: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div
                className="ingredients"
                style={{
                  fontWeight: "500",
                  width: "50%",
                  backgroundColor: isIngredient ? "#ECECEC" : "",
                  borderRadius: "20px",
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
                  fontWeight: "500",
                  width: "50%",
                  backgroundColor: isIngredient ? "" : "#ECECEC",
                  borderRadius: "20px",
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
                <ul style={{ fontSize: "19px" }}>
                  {selectedRecipe.ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>;
                  })}
                </ul>
              ) : (
                <p style={{ fontSize: "19px" }}>{selectedRecipe.procedure}</p>
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
