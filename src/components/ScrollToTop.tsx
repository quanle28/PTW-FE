import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log("Route changed:", pathname);

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0; // <html>
        document.body.scrollTop = 0; // <body>
    }, [pathname]);

    return null;
};

export default ScrollToTop;
