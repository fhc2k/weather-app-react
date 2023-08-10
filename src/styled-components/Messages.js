import styled from "styled-components";
import { css } from "styled-components";

export const Message = styled.p `
    text-transform: capitalize;
    text-align: center;
    font-size: 0.95rem;
    ${props => props.error && css `color: #ff5666;`}
    ${props => props.info && css `color: #e3ecff;`}
`