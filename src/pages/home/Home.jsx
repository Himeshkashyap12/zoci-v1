import React, { useEffect } from "react";
import CategarySection from "../../components/home/CategarySection";
import HeroSection from "../../components/home/HeroSection";
import Footer from "../../components/footer/Footer";

const HomePage=()=>{
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
        <HeroSection/>
        <CategarySection/>
        </>
    )
}
export default HomePage;