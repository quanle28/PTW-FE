import * as React from "react";
import {Hero} from "../components/Hero.tsx";
import LatestCollection from "../components/LatestCollection.tsx";
import BestSeller from "../components/BestSeller.tsx";
import OurPolicy from "../components/OurPolicy.tsx";
import NewsletterBox from "../components/NewsletterBox.tsx";

export const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
        </>
    );
};
