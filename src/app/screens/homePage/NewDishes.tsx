import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
// To'g'ri yo'l: components/divider emas, components/headers
import Divider from '../../components/headers';

// Yangi taomlar ro'yxati
const newDishes = [
  { productName: 'Cutlet', imagePath: '/img/cutlet.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab-fresh.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab.webp' },
  { productName: 'Lavash', imagePath: '/img/lavash.webp' },
];

export default function NewDishes() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className={'main'}>
          <Box className={'category-title'}>Fresh Menu</Box>

          {/* CssVarsProvider — Joy UI komponentlari uchun bir marta, tashqarida */}
          <CssVarsProvider>
            {/* newDishes bo'sh emas → kartochkalar | bo'sh → "no-data" xabari */}
            {newDishes.length !== 0 ? (
              <Stack className={'cards-frame'} direction={'row'}>
                {newDishes.map((ele, index) => {
                  return (
                    <Card key={index} variant="outlined" className={'card'}>
                      {/* Rasm — AspectRatio 1:1 nisbatda kvadrat ko'rsatadi */}
                      <CardOverflow>
                        <div className="product-sale">Normal size</div>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt={ele.productName} />
                        </AspectRatio>
                      </CardOverflow>

                      {/* Taom nomi, narxi va ko'rishlar soni */}
                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          {/* direction={'row'} — nomi va narxi yonma-yon */}
                          <Stack direction={'row'}>
                            <Typography className={'title'}>
                              {ele.productName}
                            </Typography>
                            {/* Ajratuvchi vertikal chiziq */}
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={'price'}>$12</Typography>
                          </Stack>

                          <Stack>
                            <Typography className={'views'}>
                              20
                              <VisibilityIcon sx={{ fontSize: 20, marginLeft: '5px' }} />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <Box className="no-data">New products are not available</Box>
            )}
          </CssVarsProvider>
        </Stack>
      </Container>
    </div>
  );
}
