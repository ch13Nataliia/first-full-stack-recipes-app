import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { useContext, useEffect } from 'react';
import { RecipesContext } from '../components/context/recipe.context';
import RECIPES_ENDPOINT from '../settings';
import RecipesList from '../components/RecipesList';

function Home() {
  const { recipes, fetchRecipes, deleteRecipe } = useContext(RecipesContext);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const deleteHandler = (id) => {
    deleteRecipe(id);
  };
  return (
    <>
      <Typography variant="h4">List of recipes:</Typography>
      <RecipesList recipes={recipes} deleteHandler={deleteHandler} />
    </>
  );
}

export default Home;
