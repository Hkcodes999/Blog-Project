import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Mainlayout = () => {
    return (
        <div>
            <Header/>
            <Outlet />
            <Footer />
        </div>
    );
}

export default Mainlayout;
