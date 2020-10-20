import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import {
  POPULAR_TV_URL,
  TMDB_IMAGE_URL,
  SEARCH_TV_URL,
} from './config';
import PopularList from './PopularList';
import Hero from './Hero';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  formControl: {
    opacity: 0.9,
    width: '35%',
    background: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

const TV = () => {
  const [popularTV, setPopularTV] = useState([]);
  const [heroImageURL, setHeroImageURL] = useState('');
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('Popular TV Shows');

  useEffect(() => {
    // fetch tvs
    fetch(POPULAR_TV_URL)
      .then((response) => response.json())
      .then((result) => {
        const tvs = result.results;
        const randomTVIndex = parseInt(Math.random() * 10, 10);
        const randomTopTVImage = tvs[randomTVIndex].backdrop_path;
        setHeroImageURL(`${TMDB_IMAGE_URL}w1280/${randomTopTVImage}`);
        setPopularTV(tvs);
      });
  }, []);

  const classes = useStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${SEARCH_TV_URL}&query=${searchText}`)
      .then((response) => response.json())
      .then((result) => {
        setPopularTV(result.results);
      });
    setTitle(`Search results for ${searchText}`);
  };
  return (
    <>
      <Hero heroImageURL={heroImageURL}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSearch}
          className={classes.form}
        >
          <FormControl className={classes.formControl}>
            <TextField
              id="search"
              label="Search"
              type="search"
              variant="outlined"
              placeholder="TV Show name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormControl>
        </form>
      </Hero>
      <Box mb={2}>
        <PopularList items={popularTV} listTitle={title} />
      </Box>
    </>
  );
};

export default TV;
