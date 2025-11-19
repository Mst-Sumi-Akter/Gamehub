import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import PopularGames from '../components/PopularGames';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import AllGames from '../components/AllGames';


const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <header>
                <Banner></Banner>
                 <PopularGames></PopularGames>
                 <AllGames></AllGames>

                
            </header>
            <main>
                <Outlet>
                   
                 </Outlet>

            </main>
            <Newsletter></Newsletter>

            <footer>
                <Footer></Footer>

            </footer>
        </div>
    );
};

export default HomeLayout;