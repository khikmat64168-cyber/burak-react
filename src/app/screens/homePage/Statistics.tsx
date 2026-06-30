import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import Divider from '../../components/headers';

// Statistika section — restoran haqida 4 ta raqamli ko'rsatkich
export default function Statistics() {
  return (
    // "static-frame" — home.css da background va height belgilangan
    <div className={'static-frame'}>
      <Container>
        {/* direction={'row'} — to'rtta blok yonma-yon joylashadi */}
        <Stack className="info" direction={'row'}>

          <Stack className="static-box">
            <Box className="static-num">12</Box>
            <Box className="static-text">Restaurant</Box>
          </Stack>

          {/* Divider — bloklarni ajratuvchi oltin rangli vertikal chiziq */}
          <Divider height="64" width="2" bg="#E3C08D" />

          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Experience</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08D" />

          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Menu</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08D" />

          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-text">Clients</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08D" />

        </Stack>
      </Container>
    </div>
  );
}
