import React, { useEffect, useState } from "react";
import { Carousel, Typography } from "antd";
import bag_1 from '../../assets/img/bag-1.jpg';

const { Title, Paragraph } = Typography;

const banners = {
    id: 1,
    title: "Movie 1",
    description: "This is the first movie description.",
    backgroundImage: bag_1,
    floatingImage: "https://via.placeholder.com/200x300/7f7fff", 
}

const BannerCarousel = () => {
    const [bannerMovie, setBannerMovie] = useState([]);

    useEffect(() => {
        (async function() {
            const urls = [
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1",
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=2",
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=3"
            ];

            const fetchMovieBanner = async (url) => {
                return await fetch(url).then((response) => response.json());
            }

            try {
                const response = await Promise.all(urls.map(fetchMovieBanner));
                setBannerMovie(response[0].items);
            }catch (e) {
                console.log("Error fetching data:", err);
            }
        })();
    }, []);

    return (
        <div style={{ marginTop: '50px', marginBottom: '40px' }}>
            <Carousel autoplay dots={false}>
                {bannerMovie.map((value, index) => (
                    <div key={index}>
                        <div style={{
                                position: "relative",
                                height: "700px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(https://img.ophim.live/uploads/movies/${value.poster_url})`,
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    filter: "blur(4px)",
                                    position: "absolute",
                                    width: "100%",
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                }}
                            ></div>
                            <div
                                style={{
                                    position: "absolute",
                                    zIndex: 2,
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={`https://img.ophim.live/uploads/movies/${value.thumb_url}`}
                                    alt="Floating Image"
                                    style={{
                                        width: "400px",
                                        height: "500px",
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 3,
                                    top: "200px",
                                    textAlign: "center",
                                    color: "#fff",
                                }}
                            >
                                <Title level={2} style={{ color: "#fff" }}>
                                    {/* {value.name} */}
                                </Title>
                                <Paragraph>
                                    {/* {banners.description} */}
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BannerCarousel;
