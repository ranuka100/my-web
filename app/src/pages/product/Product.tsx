import { Box } from '@mui/material';
import ProductInfor from '../../components/products/ProductInfor';
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
