import React from 'react';
import { Container, Typography } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import styled from 'styled-components';

const NotFound = ({ message = "Page not found" }) => {
  return (
    <CenteredContainer component="main" maxWidth="xs">
      <SentimentDissatisfied fontSize="large" sx={{ mb: 2 }} />
      <Title variant="h1" component="h1">
        404
      </Title>
      <Description variant="h6" component="p">
        {message}
      </Description>
    </CenteredContainer>
  );
};

export default NotFound;

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 16px;
`;

const Title = styled(Typography)`
  font-size: 6rem;
  margin-bottom: 16px;
`;

const Description = styled(Typography)`
  font-size: 1.5rem;
`;
