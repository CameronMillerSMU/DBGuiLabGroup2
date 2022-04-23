import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

import { Navigate } from 'react-router-dom';
import { useState } from 'react';

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

  //plantposts = list of posts sent by the user

  const plantposts = props.posts;
  const id = props.id;

  const [reply, setReply] = useState("");

  //incoming feature: cards = list of plantposts
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleReply = (reply) => {
    if(!plantposts.userId)Navigate("/"); //takes to login if not logged in


  }

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
                    image={plantposts[id].plantImg}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {plantposts[id].plantPostHeader}
                    </Typography>
                    <Typography>
                    {plantposts[id].plantPostContent}
                    </Typography>
                  </CardContent>

                  {/*
                  incoming feature: map every replies
                  */}

                  <CardActions>
                    <Button size="small">Delete</Button> 
                    <Button size="small">Edit</Button> 
                    <TextField id="outlined-basic" label="Reply" variant="outlined" value={(x)=> setReply(x)} />
                    <Button size="small" onClick={handleReply(reply)}>Reply</Button>
                  </CardActions>
                </Card>
                
    </>



}