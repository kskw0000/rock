import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => (
  <Container component="footer" maxWidth={false} style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: 'auto', padding: '20px 0' }}>
    <Typography variant="body1" align="center">
      © 2023 proreach,inc. All rights reserved.
    </Typography>
  </Container>
);

export default Footer;
