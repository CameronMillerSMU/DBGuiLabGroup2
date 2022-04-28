import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const PlantCard = ({ plant }) => {

    //const plant = {props}
    //console.log(`${plant.name}`);

    return <Grid item xs={4}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"

                image={plant.plantPhoto}
                alt="plantPhoto"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">{plant.name}</Typography>
                <Typography>
                    {plant.plantDesc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    </Grid>
        ;

}