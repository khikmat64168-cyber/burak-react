import { Box, Button, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Basket from './Basket';

// Bosh sahifadan boshqa barcha sahifalarda ko'rinadigan navbar
export default function OtherNavbar() {
  // authMember — foydalanuvchi holati. Hozircha null (kirmagan)
  const authMember = null;

  return (
    <div className="other-navbar">
      <Container className="navbar-container">

        {/* direction={'row'} — logo va linklar gorizontal joylashadi */}
        <Stack className="menu" direction={'row'}>
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" alt="Burak logo" />
            </NavLink>
          </Box>

          {/* direction={'row'} — barcha linklar bir qatorda */}
          <Stack className="links" direction={'row'}>
            <Box className={'hover-line'}>
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className={'hover-line'}>
              <NavLink to="/products" activeClassName="underline">Products</NavLink>
            </Box>

            {/* Faqat kirgan foydalanuvchiga Orders va My Page ko'rinadi */}
            {authMember ? (
              <Box className={'hover-line'}>
                <NavLink to="/orders" activeClassName="underline">Orders</NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={'hover-line'}>
                <NavLink to="/member-page" activeClassName="underline">My Page</NavLink>
              </Box>
            ) : null}

            {/* Kirilmagan: Login tugmasi | Kirgan: foydalanuvchi avatar rasmi */}
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-buttons">Login</Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={'/icons/default-user.svg'}
                alt="user avatar"
                aria-haspopup={'true'}
              />
            )}
            <Box>
              <NavLink to="/help">Help</NavLink>
            </Box>

            {/* Savat ikonkasi — alohida komponent */}
            <Basket />
          </Stack>
        </Stack>

        {/* OtherNavbar da banner matni ham mavjud (HomeNavbar kabi) */}
        <Stack className={'header-frame'}>
          <Stack className="detail">
            <Box className={'head-main-text'}>World's most delicious cusine</Box>
            <Box className={'wel-text'}>The choice, not just a choice</Box>
            <Box className={'service-text'}>24 hour service</Box>
            <Box className={'signup'}>
              {!authMember ? (
                <Button variant={'contained'} className={'signup-button'}>SIGN UP</Button>
              ) : null}
            </Box>
          </Stack>
        </Stack>

      </Container>
    </div>
  );
}
