import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
// import classes from '*.module.css';
import useStyles from './styles';


//here we maintain the layout for sigle product
const Product = ({product}) => {
    const classes=useStyles();
    console.log(product)
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.image}  title={product.name}/>
                    <CardContent>
                        <div className={classes.cardContent}>
                            <Typography variant="h5" gutterBottom >
                                {product.name}
                            </Typography>
                            <Typography variant="h5" gutterBottom >
                                {product.price}
                            </Typography>
                        </div>
                        <Typography variant="body2" colo="textSecondary">
                                {product.description}
                            </Typography>
                       
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActios}>
                        <IconButton aria-label="Add to cart">
                        <AddShoppingCart/>
                        </IconButton>
                    </CardActions>
                
            </Card>
        </div>
    )
}

export default Product;