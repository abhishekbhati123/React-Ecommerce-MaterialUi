import React from 'react';
import {AppBar,Toolbar,MenuIcon,IconButton,Button,Typography,Badge,Menu} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './style';
import logo from '../../assets/ecommerce.png';
import {Link,useLocation} from 'react-router-dom';
const Navbar = ({totalItem}) => {
    const classes=useStyles();
    const location=useLocation();
  console.log(totalItem)
    return (
        <>
           <AppBar position="fixed" className={classes.appBar} color="inherit">
  <Toolbar>
  <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
        <img src={logo} alt="commerce.js" height="25px" className={classes.image}/>
      Bhati Mart
    </Typography>
    <div className={classes.grow}/>
    {
      location.pathname==='/' &&(
    <div className={classes.button}>
    <IconButton edge="start" className={classes.menuButton} component={Link} to="/cart" color="inherit" aria-label="menu">
        <Badge badgeContent={totalItem} color="secondary">
        <ShoppingCart/>
        </Badge>
    </IconButton>
    </div>
)}
 
  </Toolbar>
</AppBar> 
        </>
    )
}

export default Navbar;