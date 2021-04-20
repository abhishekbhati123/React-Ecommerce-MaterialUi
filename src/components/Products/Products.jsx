import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

//Mock prducts array
// const products=[
//     {id:1,name:'Shoes',description:'Running Shoes',price:'$16',image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg?crop=1.00xw:0.789xh;0,0.150xh&resize=1600:*'},
//     {id:2,name:'MacBook',description:'Apple MacBook',price:'$20',image:'https://static.bhphoto.com/images/images500x500/apple_mvfj2ll_a_13_3_macbook_air_with_1562676502_1492876.jpg'}
// ]

//in this component we make product layout
const Products = ({products}) => {
    // console.log(products)
    const classes=useStyles()
    return (
        <main className={classes.content}>
            {/* //here we use self closing div to give space to the content below navbar */}
            <div className={classes.toolbar}/>
           <Grid container justify="center" spacing={4}>
                {
                    products.map((product)=>(
                        //pass data from products(parent) to product(child)
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product}/>
                        </Grid>
    ))
                }
           </Grid>
        </main>
    )
}

export default Products
