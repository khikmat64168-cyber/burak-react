import { Box, Button, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function HomeNavbar() {
  // authMember — foydalanuvchi tizimga kirganmi yo'qmi. Hozircha null (kirmagan)
  const authMember = null;

  return (
    // Faqat bosh sahifa "/" da ko'rinadigan navbar
    <div className="home-navbar">
      <Container className="navbar-container">

        {/* direction={'row'} — logo va linklar yonma-yon (gorizontal) joylashadi */}
        <Stack className="menu" direction={'row'}>
          <Box>
            {/* Logo bosilganda bosh sahifaga qaytadi */}
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" alt="Burak logo" />
            </NavLink>
          </Box>

          {/* direction={'row'} — navigatsiya linklari gorizontal tartibda */}
          <Stack className="links" direction={'row'}>
            <Box className={'hover-line'}>
              <NavLink to="/" activeClassName="underline">Home</NavLink>
            </Box>
            <Box className={'hover-line'}>
              <NavLink to="/products" activeClassName="underline">Products</NavLink>
            </Box>

            {/* authMember bo'lsa Orders va My Page ko'rinadi, aks holda yashiriladi */}
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

            {/* Kirilmagan bo'lsa Login tugmasi, kirgan bo'lsa avatar rasmi */}
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
          </Stack>
        </Stack>

        {/* Banner matn qismi — sahifaning markaziy sarlavhasi */}
        <Stack className={'header-frame'}>
          <Stack className="detail">
            <Box className={'head-main-text'}>World's most delicious cusine</Box>
            <Box className={'wel-text'}>The choice, not just a choice</Box>
            <Box className={'service-text'}>24 hour service</Box>
            <Box className={'signup'}>
              {/* Faqat kirmagan foydalanuvchiga Sign Up tugmasi ko'rsatiladi */}
              {!authMember ? (
                <Button variant={'contained'} className={'signup-button'}>SIGN UP</Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={'logo-frame'}>
            <div className={'logo-img'}></div>
          </Box>
        </Stack>

      </Container>
    </div>
  );
}
