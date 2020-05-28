import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App = ()  =>{

  const APP_ID = "7f12666a";
  const APP_KEY = "da4247b468ad153a257a8794ef86f39b";

  const [recipes, setRecipes] = useState([]); // @ Recipe Use Sate
  const [search, setSearch] = useState(''); // @ Recipe search Use State.
  const [query, setQuery] = useState('chicken'); // @ Recipe

  useEffect(()=>{
     getRecipes();
  }, [query]); 

  // @ Getting all the recipes from API

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
 e.preventDefault();
 setQuery(search);
 setSearch('')
  }

  return (
    <div className= "App">
          <form onSubmit ={getSearch} className="search-form">
            <input placeholder ="Please Search Your Recipe"className="search-bar" type="text" value={search} onChange={updateSearch} />
            <button className="search-button" type="submit">Search</button>
          </form>
           <div className="recipes">
           {recipes.map(recipe => (
            <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
          ))}
           </div>
    </div>
  );
};

export default App;
