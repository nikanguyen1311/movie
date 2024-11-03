import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Image, Button, Space, Modal, List } from "antd";
import { Link, useParams } from "react-router-dom";
import add from "../../assets/img/add.jpg";
import axios from "axios";
import MovieList from "../../components/MovieList";
import ActorDirectorComponent from "./components/ActorDirectorComponent";
import TypeCountryComponent from "./components/TypeCountryComponent";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DetailMovie = ({ movie }) => {
    const { slug } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movieListDetail, setMovieListDetail] = useState([]);

    useEffect(() => {
        (async function() {
            const urls = [
                "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=4",
            ];
    
            const fetchMovies = async (url) => {
                return await fetch(url).then((response) => response.json());
            }
            
            try {
                const response = await Promise.all(urls.map(fetchMovies));
                setMovieListDetail(response[0].items);
            }catch (err) {
                console.log("Error fetching data:", err);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${slug}`)
                    .then((res) => {
                        setMovieDetail(res?.data?.movie);
                        console.log(res.data.movie);  
                    });
                
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết phim:", error);
            }
        };

        fetchMovieDetail(); 
    }, [slug]);

    useEffect(() => {
        document.title = `Chi tiết phim ${movieDetail?.name}`
    }, [movieDetail]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout style={{ backgroundColor: '#212f3c'}}>
            <Content style={{ padding: "20px" }}>
                <Card style={{ width: "100%", maxWidth: 800, margin: "auto", marginTop: '100px', marginBottom: '50px' }}>
                    <Image
                        width={300}
                        height={400}
                        src={movieDetail?.thumb_url}
                        alt=""
                    />
                    <Title level={2} style={{ marginTop: '10px'}}>{movieDetail?.name}</Title>

                    <Space size="middle" style={{ marginBottom: '10px'}}>
                        <Button type="primary" onClick={showModal}>
                            Xem trailer
                        </Button>
                        <Link to={`/watch-movie/${movieDetail?.slug}`}>
                            <Button type="primary" danger>Xem phim</Button>
                        </Link>
                    </Space>
                    <Paragraph>
                        <strong level={5}>Mô tả: </strong>
                        <span
                            dangerouslySetInnerHTML={{ __html: movieDetail?.content || '' }}
                        />
                    </Paragraph>
                    <Paragraph>
                        <strong>Đang phát: </strong><span> {movieDetail?.quality} {movieDetail?.lang}</span>
                    </Paragraph>
                    <Paragraph>
                        <strong>Đạo diễn: </strong>
                        <ActorDirectorComponent actorDirector={movieDetail?.director}/>
                    </Paragraph>
                    <Paragraph>
                        <strong>Diễn viên: </strong>
                        <ActorDirectorComponent actorDirector={movieDetail?.actor}/>
                    </Paragraph>
                    <Paragraph>
                        <strong>Điểm IMDb: </strong> {movieDetail?.tmdb?.vote_average}
                    </Paragraph>
                    <Paragraph>
                        <strong>Năm phát hành: </strong> {movieDetail?.year}
                    </Paragraph>
                    <Paragraph>
                        <strong>Thể loại: </strong> 
                        <TypeCountryComponent typeCountry={movieDetail?.category}/>
                    </Paragraph>
                    <Paragraph>
                        <strong>Quốc gia: </strong>
                        <TypeCountryComponent typeCountry={movieDetail?.country} />
                    </Paragraph>

                    <Modal
                        title="Xem trailer"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={800} 
                    >
                        <iframe
                            width="100%"
                            height="400px"
                            src={movieDetail?.trailer_url}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Modal>
                </Card>

                <Title level={3} style={{ color: '#fff', marginBottom: '30px' }}>Có thể bạn cũng muốn xem</Title>
                <div style={{ textAlign: 'center' }}>
                    <MovieList movieList={movieListDetail}/>
                </div>
            </Content>
        </Layout>
    );
};

export default DetailMovie;
