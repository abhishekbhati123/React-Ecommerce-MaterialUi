import React from 'react';
import {AppBar,Toolbar,MenuIcon,IconButton,Button,Typography,Badge,Menu,TextField} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './style';
import logo from '../../assets/ecommerce.png';
import {Link,useLocation} from 'react-router-dom';
const Navbar = ({totalItem,onTextFieldChange,textField}) => {
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
    <TextField id="outlined-basic" label="Search" value={textField} onChange={(e)=>onTextFieldChange(e)}/>

    {/* <SearchBar
    value={this.state.value}
    onChange={(newValue) => this.setState({ value: newValue })}
    onRequestSearch={() => doSomethingWith(this.state.value)}
  /> */}
    <div className={classes.grow}/>
    {
      location.pathname==='/' &&(
    <div className={classes.button} >
    <IconButton   component={Link} to="/cart" color="inherit" aria-label="Show-cart items">
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