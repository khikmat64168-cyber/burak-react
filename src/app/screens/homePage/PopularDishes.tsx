import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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
          <Stack className="cards-frame" direction={'row'} sx={{ gap: 2 }}>
            {list.map((ele, index) => {
              return (
                <Card
                  key={index}
                  className="card"
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '360px',
                    flex: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={ele.imagePath}
                    alt={ele.productName}
                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        pb: 1,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#fff' }}>
                        {ele.productName}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        20
                        <VisibilityIcon sx={{ fontSize: 22 }} />
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        py: 1.5,
                        px: 2,
                        borderTop: '1px solid rgba(255,255,255,0.2)',
                        height: '50px',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          fontSize: 14,
                        }}
                      >
                        <DescriptionOutlinedIcon sx={{ fontSize: 18 }} /> This is delicious meal
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
