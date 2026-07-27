import React, { useEffect } from 'react';
import { Container, Stack, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Divider from '../../components/divider';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Types for 'swiper' may not resolve correctly with the package "exports" field in some setups.
// Ignore TS here to avoid the implicit any / declaration resolution error.
// @ts-ignore
import { FreeMode, Navigation, Thumbs } from 'swiper';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector, Dispatch } from '@reduxjs/toolkit';
import { setChosenProducts, setRestaurant } from './slice';
import { Product } from '../../../lib/types/product';
import { retriveChoosenProduct, retriveRestaurant } from './selector';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import MemberService from '../../services/MemberService';
import { serverApi } from '../../../lib/config';
import { Member } from '../../../lib/types/member';
import { CartItem } from '../../../lib/types/search';

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProducts: (data: Product) => dispatch(setChosenProducts(data)),
});

const choosenProductsRetriever = createSelector(
  retriveChoosenProduct,
  (chosenProducts) => ({
    chosenProducts,
  }),
);

const restaurantRetriever = createSelector(retriveRestaurant, (restaurant) => ({
  restaurant,
}));

interface ChoosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChoosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();

  const { setRestaurant, setChosenProducts } = actionDispatch(useDispatch());

  const { chosenProducts } = useSelector(choosenProductsRetriever);

  const { restaurant } = useSelector(restaurantRetriever);

  console.log('productId:', productId);

  useEffect(() => {
    const product = new ProductService();
    //product
    product
      .getProduct(productId)
      .then((data) => setChosenProducts(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProducts) return null;
  return (
    <div className={'chosen-product'}>
      <Box className={'title'}>Product Detail</Box>
      <Container className={'product-container'}>
        <Stack className={'chosen-product-slider'}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProducts?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} alt="product" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={'chosen-product-info'}>
          <Box className={'info-box'}>
            <strong className={'product-name'}>
              {chosenProducts?.productName}
            </strong>
            <span className={'resto-name'}>{restaurant?.memberNick}</span>
            <span className={'resto-name'}>{restaurant?.memberPhone}</span>

            <Box className={'rating-box'}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={'evaluation-box'}>
                <div className={'product-view'}>
                  <RemoveRedEyeIcon sx={{ mr: '10px' }} />
                  <span>{chosenProducts?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={'product-desc'}>
              {chosenProducts?.productDesc ?? 'NO description'}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={'product-price'}>
              <span>Price:</span>
              <span>${chosenProducts?.productPrice}</span>
            </div>
            <div className={'button-box'}>
              <Button
                variant="contained"
                onClick={(e) => {
                  console.log('ButtonPressed');
                  onAdd({
                    _id: chosenProducts._id,
                    quantity: 1,
                    name: chosenProducts.productName,
                    price: chosenProducts.productPrice,
                    image: chosenProducts.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
