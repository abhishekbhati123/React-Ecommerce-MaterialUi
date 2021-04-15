import React from 'react';
import {AppBar,Toolbar,MenuIcon,IconButton,Button,Typography,Badge,Menu} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './style';
import logo from '../../assets/ecommerce.png';
const Navbar = () => {
    const classes=useStyles();
 
    return (
        <>
           <AppBar position="fixed" className={classes.appBar} color="inherit">
  <Toolbar>
  <Typography variant="h6" className={classes.title} color="inherit">
        <img src={logo} alt="commerce.js" height="25px" className={classes.image}/>
      Bhati Mart
    </Typography>
    <div className={classes.grow}/>
    <div className={classes}>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <Badge badgeContent={2} color="secondary">
        <ShoppingCart/>
        </Badge>
    </IconButton>
    </div>
 
 
  </Toolbar>
</AppBar> 
        </>
    )
}

export default Navbar;