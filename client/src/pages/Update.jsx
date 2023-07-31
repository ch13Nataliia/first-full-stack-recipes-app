import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import RecipeForm from '../components/form/RecipeForm';
import { RecipesContext } from '../components/context/recipe.context';


function Update() {
  const { id } = useParams();
  const { recipes, updateRecipe} = useContext(RecipesContext);

  const recipe = recipes.find(({_id}) => id === _id);
  return (
    <>
      <Typography variant="h2" component="h1">
        Update Recipe
      </Typography>
      <RecipeForm recipe={recipe} submitHandler={updateRecipe}/>
    </>
  );
}

export default Update;
