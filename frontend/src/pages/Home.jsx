import React, { useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import Slide from './Slide';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import ProductsMenu from './customer/components/ProductsMenu';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';

const Home = () => {


  const dispatch = useDispatch();

  const { productData, responseProducts, error } = useSelector((state) => state.user);

  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div id="top">
      <Container
        sx={{
          display: 'none',
          '@media (max-width: 600px)': {
            display: 'flex',
          },
        }}
      >
        <ProductsMenu dropName="Categories" />
        <ProductsMenu dropName="Products" />
      </Container>
      <BannerBox>
        <Banner />
      </BannerBox>

      {showNetworkError ? (
        <StyledContainer>
          <h1>Sorry, network issue.</h1>
        </StyledContainer>
      ) : error ? (
        <StyledContainer>
          <h1>Please Wait A Second, While Wo Load Your Feed</h1>
          <NewtonsCradle size={60} speed={1.6} color="black" />
        </StyledContainer>
      ) : (
        <>
          {responseProducts ? (
            <>
              <StyledContainer>No products found right yet</StyledContainer>
              <StyledContainer>
                Become a Retailer/Vendor to add products by registering
                <Link to={"/Sellerregister"}>
                  Register
                </Link>
              </StyledContainer>
            </>
          ) : (
            <>
              <Slide products={productData} title="Top Selection" />
              <Slide products={productData} title="Deals of the Day" />
              <Slide products={productData} title="Suggested Items" />
              <Slide products={productData} title="Discounts for You" />
              <Slide products={productData} title="Recommended Items" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #d8e8eb;
`;


