import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@mui/material';

const schema = yup
  .object()
  .shape({
    title: yup.string().max(350).required(),
    image: yup.string().url(),
    author: yup.string().max(350).required(),
    description: yup.string().required(),
  })
  .required();

const defaults = {
  title: '',
  image: '',
  author: '',
  description: '',
};

function RecipeForm({ recipe, submitHandler }) {
  // console.log(recipe);
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: recipe || defaults,
  });

  useEffect(() => {
    console.log(formState);
  });

  useEffect(() => {
    // console.log("useEffect", recipe);
    if (recipe) {
      reset(recipe);
    }
  }, [recipe, reset]);

  const formRowStyle = {
    marginBlockEnd: '1em',
  };

  let submitFn = (vals) => {
    reset();
    recipe ? submitHandler(recipe._id, vals) : submitHandler(vals);
  };
  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="title"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </div>

      <div style={formRowStyle}>
        <Controller
          control={control}
          name="image"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="image"
              fullWidth
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
        />
      </div>

      <div style={formRowStyle}>
        <Controller
          control={control}
          name="author"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="author"
              fullWidth
              error={!!errors.author}
              helperText={errors.author?.message}
            />
          )}
        />
      </div>

      <div style={formRowStyle}>
        <Controller
          control={control}
          name="description"
          defaultValue={''}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="description"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!isDirty}
        >
          Reset
        </Button>

        <Button
          type="submit"
          primary="true"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default RecipeForm;
