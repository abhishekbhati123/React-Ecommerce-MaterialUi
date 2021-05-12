import React ,{useState}from "react";
import { Grid} from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import ReactPaginate from "react-paginate";

//Mock prducts array
// const products=[
//     {id:1,name:'Shoes',description:'Running Shoes',price:'$16',image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg?crop=1.00xw:0.789xh;0,0.150xh&resize=1600:*'},
//     {id:2,name:'MacBook',description:'Apple MacBook',price:'$20',image:'https://static.bhphoto.com/images/images500x500/apple_mvfj2ll_a_13_3_macbook_air_with_1562676502_1492876.jpg'}
// ]

//in this component we make product layout
const Products = ({ currentProducts, onAddToCart }) => {
//here currentpage initialize with o is indicate that currently which page is selected
    const [currentPage,setCurrentPage]=useState(0);
    const per_Page=3;
    const visited_Pages=currentPage*per_Page;

    // const currentPageData=currentProducts.slice(visited_Pages,visited_Pages + per_Page).map(({thumburl})=><img src={thumburl}/>);
    const pageCount=Math.ceil(currentProducts.length/per_Page)
    // //here we calculate number of item which  hass been displayed already by the previuos pages.
    // const pageCount = '';
  // console.log(products)
  const classes = useStyles();
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}
  return (
    <main className={classes.content}>
      {/* //here we use self closing div to give space to the content below navbar */}
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {currentProducts.slice(visited_Pages,visited_Pages+per_Page).map((product) => (
          //pass data from products(parent) to product(child)
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
       
      </Grid>
       <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      {/* {currentPageData} */}
    </main>
    
  );
};

export default Products;
