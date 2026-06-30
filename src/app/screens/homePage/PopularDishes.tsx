import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

// Mashhur taomlar ro'yxati
const list = [
  { productName: 'Lavash', imagePath: '/img/lavash.webp' },
  { productName: 'Cutlet', imagePath: '/img/cutlet.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab-fresh.webp' },
];

export default function PopularDishes() {
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          {/* CssVarsProvider — Joy UI komponentlari uchun, bir marta tashqarida o'raladi */}
          <CssVarsProvider>
            {/* list bo'sh emas → kartochkalar ko'rinadi | bo'sh → "no-data" xabari */}
            {list.length !== 0 ? (
              <Stack className="cards-frame" direction={'row'} sx={{ gap: 2 }}>
                {list.map((ele, index) => {
                  return (
                    <Card key={index} className="card" sx={{ flex: 1, height: '360px' }}>
                      {/* CardCover — rasm to'liq kartani qoplaydi */}
                      <CardCover>
                        <img src={ele.imagePath} alt={ele.productName} />
                      </CardCover>

                      {/* Ikkinchi CardCover — gradient overlay (CSS da belgilangan) */}
                      <CardCover className="card-cover" />

                      {/* Taom nomi va ko'rishlar soni — pastki qismda */}
                      <CardContent sx={{ justifyContent: 'flex-end' }}>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* level="h2" fontSize="lg" — Joy UI Typography ning o'z proplari */}
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 'md',
                              color: 'neutral.300',
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            20{' '}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: '5px' }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      {/* CardOverflow — karta pastidan chiqadigan tavsif qatori */}
                      <CardOverflow
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          py: 1.5,
                          px: 'var(--Card-padding)',
                          borderTop: '1px solid',
                          height: '60px',
                        }}
                      >
                        {/* startDecorator — matndan oldin ikonka qo'yadi (Joy UI xususiyati) */}
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          This is delicious meal
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <Box className="no-data">Popular dishes are not available</Box>
            )}
          </CssVarsProvider>
        </Stack>
      </Container>
    </div>
  );
}
