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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipesList({
  recipes = [],
  deleteHandler = () => console.log('No deleteHandler ddded to Recipe List'),
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: 358,
          p: 3,
        },
      }}
    >
      {recipes.map((recipe) => (
        <Card sx={{ maxWidth: 345 }} key={recipe._id}>
          <CardHeader title={recipe.title} subheader={recipe.author} />
          <CardMedia component="img" height="254" image={recipe.image} />
          <CardActions disableSpacing>
            <IconButton
              aria-label="update"
              to={`/update/${recipe._id}`}
              component={Link}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => deleteHandler(recipe._id)}
            >
              <DeleteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>{recipe.description}:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
}

export default RecipesList;
