import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Button, Typography, Card } from "antd";
import MovieList from "../../components/MovieList";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const WatchMovie = () => {
    const { slug } = useParams();
    const [movieWatch, setMovieWatch] = useState(null);
    const [title, setTitle] = useState(null);   
    const [description, setDescription] = useState(null);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [movieListWatch, setMovieListWatch] = useState([]);

    useEffect(() => {
        (async function() {
            const urls = [
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=5",
            ];
    
            const fetchMovies = async (url) => {
                return await fetch(url).then((response) => response.json());
            }
            
            try {
                const response = await Promise.all(urls.map(fetchMovies));
                setMovieListWatch(response[0].items);
            }catch (err) {
                console.log("Error fetching data:", err);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchMovieWatch = async () => {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${slug}`);
                setMovieWatch(response?.data?.episodes || []); 
                setTitle(response?.data?.movie?.name);
                setDescription(response?.data?.movie?.content);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết phim:", error);
            }
        };

        fetchMovieWatch();
    }, [slug]);

    useEffect(() => {
        document.title = `Xem phim ${title}`;
    }, [title]);

    if (!movieWatch || movieWatch.length === 0) {
        return (
            <Layout>
                <Content style={{ padding: "20px" }}>
                    <p>Không có dữ liệu tập phim.</p>
                </Content>
            </Layout>
        );
    }

    const currentEpisode = movieWatch[0]?.server_data?.[currentEpisodeIndex];

    return (
        <Layout style={{ backgroundColor: '#212f3c' }}>
            <Content style={{ padding: "20px" }}>
                <div style={{ maxWidth: "1000px", margin: "auto", marginTop: '100px', marginBottom: '50px' }}>
                    {currentEpisode ? (
                        <div>
                            <Title level={3} style={{ color: '#fff'}}>{title}</Title>
                            <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                <iframe
                                    src={currentEpisode?.link_embed}
                                    title={currentEpisode.filename}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen; orientation-lock"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <p>Không có dữ liệu tập phim.</p>
                    )}

                    {/* Nút điều khiển tập */}
                    <div style={{ marginTop: "20px" }}>
                        <Button.Group>
                            <Button
                                type="primary"
                                onClick={() => setCurrentEpisodeIndex((prev) => prev - 1)}
                                disabled={currentEpisodeIndex === 0}
                                style={{ color: '#fff', marginRight: '10px'}}
                            >
                                Tập trước
                            </Button>

                            <Button
                                type="primary"
                                onClick={() => setCurrentEpisodeIndex((prev) => prev + 1)}
                                disabled={currentEpisodeIndex >= movieWatch[0].server_data.length - 1}
                                style={{ color: '#fff'}}
                            >
                                Tập tiếp theo
                            </Button>
                        </Button.Group>
                    </div>

                    {/* Danh sách các tập phim */}
                    <div style={{ marginTop: "20px" }}>
                        <h4 style={{ color: '#fff' }}>Chọn tập:</h4>
                        {movieWatch[0]?.server_data?.map((episode, index) => (
                            <Button
                                key={index}
                                type={index === currentEpisodeIndex ? "primary" : "default"}
                                onClick={() => setCurrentEpisodeIndex(index)}
                                style={{ margin: "5px" }}
                            >
                                {episode.name}
                            </Button>
                        ))}
                    </div>

                    {/* Mô tả phim */}
                    <Layout style={{ backgroundColor: '#212f3c'}}>
                        <Content style={{ padding: "20px" }}>
                            <Card>
                                <Paragraph>
                                    <strong level={5}>Mô tả: </strong>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: description || '' }}
                                    />
                                </Paragraph>
                            </Card>
                        </Content>
                    </Layout>
                </div>

                <Title level={3} style={{ color: '#fff', marginBottom: '30px' }}>Có thể bạn cũng muốn xem</Title>
                <div style={{ textAlign: 'center' }}>
                    <MovieList movieList={movieListWatch}/>
                </div>
            </Content>
        </Layout>
    );
};

export default WatchMovie;
