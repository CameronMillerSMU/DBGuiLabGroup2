import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



export const PlantPost = (props) => {

  /*
  props: 
  plantImg: the Image source of the plant
  plantPostHeader: Title of the post
  plantPostContent: content of the post
  userId: the id of the viewer
  posterId: the id of the post sender (the person who sent the post)

  Awaiting features:

  for Reply button:
  jumping to login page if the user is not logged in
  show reply box if the user clicks

  for Edit/Delete button:
  Edit or delete the post if the user clicks

  */

  const {user} = props;

    return <>
    <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={user.plantImg}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {user.plantPostHeader}
                    </Typography>
                    <Typography>
                    {user.plantPostContent}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    { !!user.userId == user.posterId && <Button size="small">Delete</Button> }
                    { !!user.userId == user.posterId && <Button size="small">Edit</Button> }
                    <Button size="small">Reply</Button>
                  </CardActions>
                </Card>
    </>



}