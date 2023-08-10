import styled from "styled-components";

export const WeatherMain = styled.div `
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
`;

export const WeatherTemperature = styled.h1 `
    font-size: 3rem;
    margin: 0;
`;

export const WeatherTextData = styled.p `
    text-transform: capitalize;
    color: #808080;
    margin: 0.5rem 0;
`;

export const WeatherData = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
`;

export const WeatherDataItem = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

export const WeatherDataDescription = styled.p `
    font-size: 0.75rem;
    color: #808080;
`;