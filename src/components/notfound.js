import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #666;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #999;
  margin-bottom: 40px;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function NotFound() {
    return (
        <Wrapper>
            <Title>404</Title>
            <Subtitle>Page Not Found</Subtitle>
            <ErrorMessage>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</ErrorMessage>
            <HomeButton to="/">Go to Home</HomeButton>
        </Wrapper>
    );
}
