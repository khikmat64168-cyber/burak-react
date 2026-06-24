import React from 'react';
import '../css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

function App() {
  // containerning o'zining props lari bor
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={'column'}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={'h4'}>
            Create App on Typescript with REDUX
          </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  );
}

export default App;
