import { Navigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductInfor from '../../components/products/ProductInfor';
import ProductTypes from '../../components/products/productTypes';
import ProductListJsonLd from '../../seo/schema/ProductListJsonLd';
import ProductJsonLd from '../../seo/schema/ProductJsonLd';
import { getProductBySlug } from '../../data/productUtils';

const Product = () => {
  const { slug } = useParams<{ slug?: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (slug && !product) {
    return <Navigate to="/product" replace />;
  }

  return (
    <Box>
      {product ? <ProductJsonLd product={product} /> : <ProductListJsonLd />}
      <ProductInfor initialSlug={slug} />
      <ProductTypes />
    </Box>
  );
};

export default Product;
