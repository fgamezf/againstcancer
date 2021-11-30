// src/components/bootstrap-carousel.component.js
import React from "react";
import { ethers } from "ethers";
import { Carousel, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomCarousel = ({ allWaves }) => {

    return (
       <Carousel>
        {allWaves.map((wave, index) => {
            return (
                <Carousel.Item key={index}>
                    <Image
                        className="d-block w-100"
                        src="https://bestanimations.com/media/candles/674118152vintage-mood-large-candle-burning.gif"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="carousel">
                            <h3>{wave.timestamp.toLocaleString("en-US")}</h3>
                            <h2>{wave.address.substring(0,5) + ' ... ' + wave.address.substring(wave.address.length - 5 ,wave.address.length)}</h2>
                            <h1>{wave.message}</h1>
                            <p>Donated: {ethers.utils.formatEther(wave.amount)} {process.env.REACT_APP_COIN}</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            )
          })}
          </Carousel>
    
    )

}

export default CustomCarousel;