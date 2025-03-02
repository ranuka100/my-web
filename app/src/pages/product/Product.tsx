import { Box, Container } from '@mui/material';
import ProductInfor from '../../components/products/ProductInfor';
import ProductCards from '../../components/products/ProductCards';
import ProductTypes from '../../components/products/productTypes';


const Product = () => {
  return (
    <Box>
      <ProductInfor/>
      {/* <ProductCards/> */}
      <ProductTypes/>
    </Box>
  );
};

export default Product;
