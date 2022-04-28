import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';

export const PlantCard = ({ plant }) => {
    const handleViewPlant = (plant) => {
        console.log(plant.name);
        sessionStorage.setItem("plantName", plant.name);
        navigate('/plantPage');
    };

    const navigate = useNavigate();
    //const plant = {props}
    //console.log(`${plant.name}`);sessionStorage.setItem("plantName", plant.name).then(navigate("/plantPage")))}
    const handleButtonClick = () => {
        console.log(plant.name);
        sessionStorage.setItem("currentPlant", plant.name);
        navigate('/plantPage');
    };
    return <Grid item xs={4}>
    <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                
                image={ plant.plantPhoto }
                alt="plantPhoto"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">{plant.name}</Typography>
                <Typography>
                    {plant.plantDesc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                    onClick={() => handleButtonClick()} >
                    View
                </Button>
            </CardActions>
        </Card>
        </Grid>
    ;
    
}