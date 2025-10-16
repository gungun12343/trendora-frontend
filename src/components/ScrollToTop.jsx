import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export const ScrollToTop = () => {
    const {pathname} = useLocation();
    //const location = useLocation();

    useEffect(() => {
        if(pathname.startsWith("/shop")) {
            window.scrollTo(0, 0);
        }
        //window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}   