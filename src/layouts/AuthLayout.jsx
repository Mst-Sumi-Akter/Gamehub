import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </header>
        </div>
    );
};

export default AuthLayout;