import React from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const StyledSection = styled.section`
    height: 85vh;
    background-image: url(./resources/OIP.png);
    margin-top: 10vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    & .titles {
        margin: 25% 65% 0 0;
        padding: 1.5%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        font-family: 'Courier New', Courier, monospace;

        & #order-pizza {
            display: block;
            width: 50%;
            margin: auto;
        }
    }
`

function Home() {
    const history = useHistory();

    function clickHandler() {
        history.push('/pizza')
    }

    return (
        <StyledSection id="home">
            <div className="titles">
                <h1>Delicious Pizza</h1>
                <h2>Quick Delivery <br/> Every Time</h2>
                <button onClick={clickHandler} id='order-pizza'>Order Now</button>
            </div>
        </StyledSection>
    )
}

export default Home;