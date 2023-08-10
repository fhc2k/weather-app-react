import styled from "styled-components";
import { css } from "styled-components";

export const Button = styled.button `
    width: 100%;
    background-color: #FFF0;
    font-family: inherit;
    border-radius: 30px;
    padding: 0.85rem;
    border: none;
    outline: none;
    cursor: pointer;
    ${props => props.primary && css`
        background-color: #2567ff;
        color: #FFF;
    `
    }
    ${props => props.secondary && css`
        background-color: #e3ecff;
        color: #2567ff;
    `
    }  
`