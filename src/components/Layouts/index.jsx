import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Headers from "../Header";
import BannerCarousel from "../Banner";
import FooterComponent from "../Footer";

const Layouts = () => {
    const location = useLocation();

    const hideBanner =
        location.pathname.includes("/detail-movie") ||
        location.pathname.includes("/watch-movie") ||
        location.pathname.includes("/new-movie") ||
        location.pathname.includes("/odd-movie");

    return (
        <div>
            <div>
                <Headers />
            </div>
            {!hideBanner && (
                <div>
                    <BannerCarousel />
                </div>
            )}
            <div>{<Outlet />}</div>
            <div>
                <FooterComponent />
            </div>
        </div>
    );
};

export default Layouts;
