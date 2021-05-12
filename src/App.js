import React,{useState,useEffect} from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import {commerce} from './lib/Ecommerce';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Remove } from '@material-ui/icons';
import './app.css';



const App = () => {
    //now we definig some variable
// //here i am defining that how many item i want in a page 
// const Per_Page=3;
// //here we define an constant variable to know how many pages we previously visited already
// const visitedPages=currentPage*Per_Page;

    
    //Now we are going to fetch/load data from commerce api so to store that data we need state
    const [products,setProduct]=useState([]); 
    const [currentProducts,setCurrentProducts]=useState([])
    const [cart,setCart]=useState({});
    const [order,setOrder]=useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [textField,setTextField]=useState('')
    // //here we defining the state for cuurent page which selected by user initialy
    // const [currentPage,setCurrentPage]=useState(0);


    //here we make a function to fetch the data from ecommerce
   //here we gonna use await and async to write cleaner code
   //and we also destrure the data from thr commerce instance



    const fetchProduct= async () =>{
        const {data}=await commerce.products.list();
 
        setProduct(data);
        setCurrentProducts(data);
        console.log(data);
    }

    //here we make a function for the search
    const onTextFieldChange=(e)=>{
        var value =e.target.value.toLowerCase();
        console.log(value);
        setTextField(value);
        //we need to make a copy of products
        const productCopy=[...products];
        const newProduct=productCopy.filter((user)=>{
            const name=user.name.toLowerCase();
            return name.startsWith(value)
        })
        setCurrentProducts(newProduct)
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
    //this function is update cart after increment and decremet of the item
    const handleUpdateCartEntry=async (productId,quantity)=>{
        const response=await commerce.cart.update(productId,{quantity});
        setCart(response.cart);
    }
    const handleRemoveCart=async (productId)=>{
        const response=await commerce.cart.remove(productId);
        setCart(response.cart);
    }
    const handleEmptyCart=async ()=>{
        const response=await commerce.cart.empty();
        setCart(response.cart)
    }
    const refershCart=async()=>{
     const newCart=   await commerce.cart.refresh();
     setCart(newCart);
    }
//    to capture an order and payment by providing the checkout token and necessary data for the order to be completed. 
    const handleCaptureCheckout= async(checkoutTokenId,newOrder)=>{
        try{
            const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder)
            setOrder(incomingOrder);
            refershCart();
        }
        catch(error){
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(()=>{
        fetchProduct();
        createCart();
    },[]);

    console.log(cart)
    return (
        <Router>
        <div>
      <Navbar totalItem={cart.total_items} onTextFieldChange={onTextFieldChange} textField={textField}/>      
      <Switch>
      <Route exact path="/"> 
      {/* here we pass handledAddToCart function as a props */}
     <Products currentProducts={currentProducts} textField={textField} onTextFieldChange={onTextFieldChange}  onAddToCart={handledAddToCart} />
    </Route>
    <Route exact path="/cart">
     <Cart cart={cart} order={order} handleUpdateCartEntry={handleUpdateCartEntry} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>
     </Route>
     <Route>
         <Checkout  cart={cart}  order={order} handleCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
     </Route>
     </Switch>
        </div>
        </Router>
    )
}

export default App
    