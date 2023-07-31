import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from './components/Layout';

import Add from './pages/Add';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Update from './pages/Update';
import Contact from './pages/Contact';

import { RecipesProvider } from './components/context/recipe.context';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RecipesProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </RecipesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
