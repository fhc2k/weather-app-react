import styled, { keyframes } from "styled-components";

const spin = keyframes `
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
`;

export const Spinner = styled.div `
    border: 2px solid;
    width: 40px;
    height: 40px;
    border-color: #2567ff rgba(0,0,0,.1) rgba(0,0,0,.1);
    border-radius: 50%;
    display: inline-block;
    animation: ${spin} 750ms linear infinite;
`