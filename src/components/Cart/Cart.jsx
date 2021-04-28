import React from 'react';
import {Container,Typography,Button,Grid} from '@material-ui/core';
import useStyles from './styles';
import Cartitems from './CartItems/Cartitems';
import {Link} from 'react-router-dom';

const Cart = ({cart,handleUpdateCartEntry,handleRemoveCart,handleEmptyCart}) => {
    const classes=useStyles();
    console.log(cart.line_items)
    // const isEmpty;
    const EmptyCart=()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link to="/" className={classes.link}> start adding some!</Link>
        </Typography>
    );
    const FilledCart=()=>(
        <>
        <Grid container spacing={3}>
            {
                cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                      <Cartitems  item={item}  handleUpdateCartEntry={handleUpdateCartEntry} handleRemoveCart={handleRemoveCart}/>
                    </Grid>
                ))}

        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary" onClick={()=>handleEmptyCart()}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Checkout</Button>
            </div>
        </div>
        </>
   
     
    )
    if(!cart.line_items)
    return '...Loaading';
    return (
        <div>
            <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title}  variant="h3">Your Shopping cart</Typography>
            {/* here we define an conditon to show different sub component at differnt time */}
            {!cart.line_items.length ?<EmptyCart/>:<FilledCart/>}
            </Container>
            
        </div>
    )
}

export default Cart;
