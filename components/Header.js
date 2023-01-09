import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`

    & nav {
        position: fixed;
        width: 100%;
        top: 0;
        background-color: rgba(255, 255, 255, 0.8);
        height: 10vh;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & .logo {
        background-image: url(./resources/61b685d20908dc4ade4f8283_BloomTech-Logo-Black-FMA.png);
        height: 8vh;
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
        width: 25%;
        margin-left: 3%;
        opacity: .75;
    }

    & .links {
        width: 50%;
        display: flex;
        justify-content: flex-end;

        & a {
            text-decoration: none;
            letter-spacing: 3px;
            color: #4f4f4f;
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
            margin: 0 10% 0 10%;

            &:hover {
                color: #ffb720;
            }
        }
    }

`

function Header() {
    const linkList = ['Home', 'Order', 'Help']

    return (
        <StyledHeader>
            <nav>
                <div className="logo"></div>
                <div className="links">
                    <Link to='/'>Home</Link>
                    <Link to='/pizza'>Order</Link>
                </div>
            </nav>
        </StyledHeader>
    )
};

export default Header;