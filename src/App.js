import React,{useState,useEffect} from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import {commerce} from './lib/Ecommerce';

const App = () => {
    //Now we are going to fetch/load data from commerce api so to store that data we need state
    const [products,setProduct]=useState([]); 
    const [cart,setCart]=useState({});
    //here we make a function to fetch the data from ecommerce
   //here we gonna use await and async to write cleaner code
   //and we also destrure the data from thr commerce instance

    const fetchProduct= async () =>{
        const {data}=await commerce.products.list();
 
        setProduct(data);
        console.log(data);
    }

    //in this function with the using helper function(retrieve) of commerce.js we will be create a cart 
    const createCart=  async () =>{
       
       
         const cart=await commerce.cart.retrieve();
         setCart(cart)
         console.log(cart)

    }
    //this function use to add item to the cart
    const handledAddToCart=async (productId,quantity)=>{
        const item=await commerce.cart.add(productId,quantity);
        //here we change the state
        setCart(item.cart)

    }
    useEffect(()=>{
        fetchProduct();
        createCart();
    },[]);

    console.log(cart)
    return (
        <div>
      <Navbar totalItem={cart.total_items}/>      
      {/* here we pass handledAddToCart function as a props */}
     {/* <Products products={products} onAddToCart={handledAddToCart} /> */}

     <Cart cart={cart}/>
        </div>
    )
}

export default App
    