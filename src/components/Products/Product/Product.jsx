import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
// import classes from '*.module.css';
import useStyles from './styles';


//here we maintain the layout for sigle product
const Product = ({product,onAddToCart}) => {
    // const handleAddToCart = () => onAddToCart(product.id, 1);
    const classes=useStyles();
    console.log(product)
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source}  title={product.name}/>
                    <CardContent>
                        <div className={classes.cardContent}>
                            <Typography variant="h5" gutterBottom >
                                {product.name}
                            </Typography>
                            <Typography  dangerouslySetInnerHTML={{__html:product.description}} variant="h5" gutterBottom>
                                
                            </Typography>
                        </div>
                        <Typography variant="body2" colo="textSecondary">
                                
                            </Typography>
                       
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActios}>
                        <IconButton   onClick={()=>onAddToCart(product.id,1)} aria-label="Add to cart">
                        <AddShoppingCart/>
                        </IconButton>
                    </CardActions>
                
            </Card>
        </div>
    )
}

export default Product;
