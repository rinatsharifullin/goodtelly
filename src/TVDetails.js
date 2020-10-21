import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { getTVDetailsURL } from './config';
import Placeholder from './static/images/image-placeholder.png';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  hero: (props) => ({
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(to right, rgb(3, 7, 65, 02), rgb(0, 0, 0, 0.6) 70%), url("${props.image}")`,
  }),
  card: {
    maxWidth: '300px',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    borderRadius: theme.spacing(0.5),
    height: '450px',
    width: '300px',
  },
  details: {
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  actionIcon: {
    marginRight: theme.spacing(2),
  },
}));

const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280/';

const Spacer = () => {
  return (
    <Typography variant="body1" style={{ margin: '0px 4px' }}>
      |
    </Typography>
  );
};
const TVDetails = () => {
  const { id } = useParams();
  const [TVDetails, setTVDetails] = useState({
    title: '',
    poster_path: '',
    backdrop_path: '',
    genres: [],
    credits: { cast: [], crew: [] },
  });
  const getImageURL = (imagePath) => {
    if (imagePath) {
      return `${IMAGE_URL}${imagePath}`;
    } else {
      return Placeholder;
    }
  };
  const classes = useStyles({
    image: getImageURL(TVDetails.backdrop_path),
  });
  const classes2 = useStyles2();

  useEffect(() => {
    const TVDetailsURL = getTVDetailsURL(id);
    fetch(TVDetailsURL)
      .then((response) => response.json())
      .then((result) => {
        setTVDetails(result);
      });
  }, [id]);
  console.log(TVDetails);
  return (
    <Container maxWidth="lg">
      <Paper className={classes.hero}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={getImageURL(TVDetails.poster_path)}
                title={TVDetails.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <div className={classes.details}>
              <Typography variant="h4">{TVDetails.title}</Typography>
              {TVDetails.tagline ? (
                <Typography variant="caption">
                  <i>{TVDetails.tagline}</i>
                </Typography>
              ) : null}

              <div style={{ display: 'flex' }}>
                <Typography variant="body1">
                  Release date: {TVDetails.release_date}
                </Typography>

                <Spacer />
                <Typography variant="body1">
                  Genre:{' '}
                  {TVDetails.genres.map((genre, index, arr) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < arr.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </Typography>
                <Spacer />
                <Typography variant="body1">
                  Rating: {TVDetails.vote_average}
                </Typography>
                <Spacer />
                <Typography variant="body1">
                  Run time: {TVDetails.runtime}
                </Typography>
              </div>

              <Box mt={4}>
                <Typography variant="h6">Overview</Typography>
                <Typography variant="body1">
                  {TVDetails.overview}{' '}
                </Typography>
              </Box>
              <Box mt={4}>
                <FavoriteIcon
                  fontSize="large"
                  className={classes.actionIcon}
                />
                <PlaylistAddIcon
                  fontSize="large"
                  className={classes.actionIcon}
                />
                <ThumbDownIcon
                  fontSize="large"
                  className={classes.actionIcon}
                />
              </Box>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Spacer />
      <div className={classes2.root}>
        <GridList className={classes2.gridList} cols={2.5}>
          {TVDetails.credits.cast.map((tile) => (
            <GridListTile key={tile.id}>
              <img
                src={IMAGE_URL + tile.profile_path}
                alt={tile.character}
              />
              <GridListTileBar
                title={tile.character + ' - ' + tile.name}
                classes={{
                  root: classes2.titleBar,
                  title: classes2.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes2.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  );
};

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default TVDetails;
