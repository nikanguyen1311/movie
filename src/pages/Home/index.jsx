import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import add from "../../assets/img/add.jpg";
import "./index.css";
import MovieList from "../../components/MovieList";

const { Title } = Typography;

const HomePage = () => {
    const [movieList1, setMovieList1] = useState([]);
    const [movieList2, setMovieList2] = useState([]);
    const [movieList3, setMovieList3] = useState([]);

    useEffect(() => {
        (async function() {
            const urls = [
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1",
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=2",
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=3"
            ];
    
            const fetchMovies = async (url) => {
                return await fetch(url).then((response) => response.json());
            }
            
            try {
                const response = await Promise.all(urls.map(fetchMovies));
                setMovieList1(response[0].items);
                setMovieList2(response[1].items);
                setMovieList3(response[2].items);
            }catch (err) {
                console.log("Error fetching data:", err);
            }
        })();
    }, []);

    useEffect(() => {
        document.title = "Trang chủ phim";
    }, []);

    return (
        <>
            <div style={{ textAlign: "center", padding: '20px' }}>
                {/* list 1 */}
                <div style={{ marginBottom: "40px" }}>
                    <div>
                        <Title level={2} style={{ color: "#fff" }}>Phim Đề Cử</Title>
                    </div>
                    <MovieList movieList={movieList3}/>
                </div>
                {/* list 2 */}
                <div style={{ marginBottom: "40px" }}>
                    <div>
                        <Title level={2} style={{ color: "#fff" }}>Phim Mới</Title>
                    </div>
                    <MovieList movieList={movieList1}/>
                </div>
                {/* list 3 */}
                <div>
                    <div>
                        <Title level={2} style={{ color: "#fff" }}>Phim Nổi Bật</Title>
                    </div>
                    <MovieList movieList={movieList2}/>
                </div>
            </div>
        </>
    );
};

export default HomePage;
