import { useState, SyntheticEvent, useEffect } from 'react';
import { Container, Stack, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PausedOrders from './PausedOrders';
import ProcessOrders from './ProcessOrders';
import FinishedOrders from './FinishedOrders';
import '../../../css/order.css';
import { setPauseOrders, setFinishedOrders, setProcessOrders } from './slice';
import { Order, OrderInquiry } from '../../../lib/types/order';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { OrderStatus } from '../../../lib/enums/order.enum';
import OrderService from '../../services/OrderService';
import { useGlobals } from '../../hooks/useGlobals';
import { serverApi } from '../../../lib/config';

const actionDispatch = (dispatch: Dispatch) => ({
  setPauseOrders: (data: Order[]) => dispatch(setPauseOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

export default function OrdersPage() {
  const { setFinishedOrders, setPauseOrders, setProcessOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState('3');
  const { authMember, orderBuilder } = useGlobals();

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    limit: 5,
    page: 1,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPauseOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={'order-page'}>
      <Container className="order-container">
        <Stack className={'order-left'}>
          <TabContext value={value}>
            <Box className={'order-nav-frame'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={'table_list'}
                >
                  <Tab label="PAUSED ORDERS" value={'1'} />
                  <Tab label="PROCESS ORDERS" value={'2'} />
                  <Tab label="FINISHED ORDERS" value={'3'} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={'order-main-content'}>
              <PausedOrders setValues={setValue} />
              <ProcessOrders
                setValues={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={'order-right'}>
          <Box className={'order-info-box'}>
            <Box className={'member-box'}>
              <div className={'order-user-img'}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : '/icons/default-user.svg'
                  }
                  className={'order-user-avatar'}
                  alt="user avatar"
                />
                <div className={'order-user-icon-box'}>
                  <img
                    src={'/icons/user-badge.svg'}
                    className={'order-user-prof-img'}
                    alt="user badge"
                  />
                </div>
              </div>
              <span className={'order-user-name'}>
                {authMember?.memberNick ?? 'Guest'}
              </span>
              <span className={'order-user-prof'}>
                {authMember?.memberType ?? 'User'}
              </span>
            </Box>
            <Box className={'liner'}></Box>
            <Box className={'order-user-address'}>
              <div style={{ display: 'flex' }}>
                <LocationOnIcon />
              </div>
              <div className={'spec-address-txt'}>Do not exist</div>
            </Box>
          </Box>
          <Box className={'order-info-box'} sx={{ mt: '15px' }}>
            <input
              type={'text'}
              name={'cardNumber'}
              placeholder={'Card number : **** 4090 2002 7495'}
              className={'card-input'}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <input
                type={'text'}
                name={'cardPeriod'}
                placeholder={'07 / 24'}
                className={'card-half-input'}
              />
              <input
                type={'text'}
                name={'cardCVV'}
                placeholder={'CVV : 010'}
                className={'card-half-input'}
              />
            </div>
            <input
              type={'text'}
              name={'cardCreator'}
              placeholder={'Justin Robertson'}
              className={'card-input'}
            />
            <div className={'cards-box'}>
              <img src={'/icons/western-card.svg'} alt="western card" />
              <img src={'/icons/master-card.svg'} alt="master card" />
              <img src={'/icons/paypal-card.svg'} alt="paypal" />
              <img src={'/icons/visa-card.svg'} alt="visa" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
