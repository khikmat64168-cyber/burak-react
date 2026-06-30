import { Box, Container, Stack } from '@mui/material';
import Card from '@mui/joy/Card';
import { CssVarsProvider, Typography } from '@mui/joy';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';

const activeUsers = [
  { memberNick: 'Martin', memberImage: '/img/martin.webp' },
  { memberNick: 'Justin', memberImage: '/img/justin.webp' },
  { memberNick: 'Rose', memberImage: '/img/rose.webp' },
  { memberNick: 'Nusret', memberImage: '/img/nusret.webp' },
];

export default function ActiveUsers() {
  return (
    <div className={'active-users-frame'}>
      <Container>
        <Stack className={'main'}>
          <Box className={'category-title'}>Active Users</Box>
          <CssVarsProvider>
            {activeUsers.length !== 0 ? (
              <Stack
                className={'cards-frame'}
                direction={'row'}
                sx={{ gap: 2 }}
              >
                {activeUsers.map((ele, index) => {
                  return (
                    <Card
                      key={index}
                      variant="outlined"
                      className="card"
                      sx={{ flex: 1, height: '360px' }}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.memberImage} alt={ele.memberNick} />
                        </AspectRatio>
                      </CardOverflow>
                      <Typography className={'member-nickname'}>
                        {ele.memberNick}
                      </Typography>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <Box className={'no-data'}>No Active users!!</Box>
            )}
          </CssVarsProvider>
        </Stack>
      </Container>
    </div>
  );
}
