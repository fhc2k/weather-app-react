import styled from "styled-components";

export const LayoutContainer = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1e1f24;
`;

export const LayoutMain = styled.div `
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const LayoutSearcher = styled.div `
    width: 325px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #28292e;
    color: #FFF;
    padding: 2rem;
    border-radius: 20px;
    text-align: center; 
`

export const LayoutData = styled.div `
    width: 325px;
    background-color: #28292e;
    color: #FFF;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
`;

