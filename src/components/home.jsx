
import React, { Component } from 'react';
import Tickets from './tickets';
const Home = () => {
    const token = localStorage.getItem("token")

    return (
        <>
            {token && <Tickets />}
        </>
    );
}


export default Home;