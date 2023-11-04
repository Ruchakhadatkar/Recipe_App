import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";
import { RecipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const {state,dispatch} = useContext(RecipeContext)

  const searchRecipes = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:4000/api/recipe/search/"+search)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
       dispatch({type:"RECIPE_FETCH_SUCCESS",payload:json})
       setSearch("")
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h1 class="navbar-brand" style={{ fontSize: "25px" }}>
            Recipe App
          </h1>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to={"/favorite"} style={{ textDecoration: "none" }}>
                <a class="nav-link active" aria-current="page">
                  Favorite
                  <BsFillHeartFill
                    style={{
                      color: "red",
                      fontSize: "13px",
                      marginLeft: "3px",
                    }}
                  />
                </a>
              </Link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
            value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
            onClick={(e)=>{searchRecipes(e)}}
              class="btn btn-outline-success"
              type="submit"
              style={{
                height: "38px",
                paddingTop: "0px",
                borderRadius: "18px",
              }}
            >
              <div style={{ fontSize: "20px" }}>
                <HiMagnifyingGlass />
              </div>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
