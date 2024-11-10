import React, { useEffect } from "react";
import { Image, Typography, Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import LazyLoad from "react-lazy-load";
import "swiper/css/navigation";
import "swiper/css";
import "./index.css";

const { Title } = Typography;

const MovieList = ({ movieList }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={5}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Navigation]}
            navigation={true}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                },
            }}
        >
            {
                movieList &&
                    movieList.map((value, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Link
                                    to={`/detail-movie/${value.slug}`}
                                    style={{ textDecoration: "none" }}
                                    className="image-link"
                                >
                                    <div className="image-container">
                                        <LazyLoad
                                            height={200}
                                            offset={100}
                                            placeholder={<Skeleton.Image />}
                                            debounce={300} 
                                        >
                                            <Image
                                                className="scalable-image"
                                                preview={false}
                                                src={`https://img.ophim.live/uploads/movies/${value.thumb_url}`}
                                                alt={value.name}
                                                loading="lazy"
                                            />
                                        </LazyLoad>
                                    </div>
                                    <Title className="title" level={5} style={{ margin: 0, color: '#fff' }}>
                                        {value?.name}
                                    </Title>
                                </Link>
                                <p style={{ color: '#fff'}}>{value?.year}</p>
                            </SwiperSlide>
                        )
                    })
            }
        </Swiper>
    );
};

export default MovieList;
