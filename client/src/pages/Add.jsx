import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/form/RecipeForm';
import Typography from '@mui/material/Typography';
import { RecipesContext } from '../components/context/recipe.context';
import Container from '@mui/material/Container';
import pic from '../pages/styles/images/pic.jpg';

function Add() {
  const { addRecipe } = useContext(RecipesContext);
  const navigate = useNavigate();

  const submitHandler = (data) => {
    addRecipe(data);
    navigate('/');
  };

  return (
    <Container
      sx={{
        bgcolor: 'lightyellow',
        boxShadow: 5,
        borderRadius: 4,
        p: 4,
        minWidth: 300,
      }}
    >
      <img src={pic} alt="this is pic image" height="150px" />
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontStyle: 'italic',
          mb: 3,
          fontFamily: 'Monospace',
        }}
      >
        my recipes
      </Typography>
      <RecipeForm submitHandler={submitHandler} />
    </Container>
  );
}

export default Add;
