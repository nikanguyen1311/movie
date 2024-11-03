import React, { useState, useEffect, useRef } from "react";
import { Carousel, Card, Button, Col, Row, Image, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import add from "../../assets/img/add.jpg";
import { Link } from "react-router-dom";
import './index.css';

const { Meta } = Card;
const { Title } = Typography;

const NewMovie = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [numColumns, setNumColumns] = useState(3); 
    const carouselRef = useRef();
    const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
        let page = 1;
    
        const fetchMovies = async () => {
            const url = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`;
    
            try {
                const response = await fetch(url);
                const data = await response.json();
                setNewMovies(data.items);
            } catch (err) {
                console.log("Error fetching data:", err);
            }
        };
    
        fetchMovies();
    
        const interval = setInterval(() => {
            page += 1;
            fetchMovies(); 
        }, 43200000);

        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 480) {
                setNumColumns(2); 
            } else if (window.innerWidth < 768) {
                setNumColumns(3);
            } else {
                setNumColumns(0); 
            }
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const next = () => {
        carouselRef.current.next();
    };

    const prev = () => {
        carouselRef.current.prev();
    };

    const renderMoviesInGroups = () => {
        const groupedMovies = [];
        for (let i = 0; i < newMovies.length; i += numColumns) {
            groupedMovies.push(newMovies.slice(i, i + numColumns));
        }
        return groupedMovies;
    };

    return (
        <div style={{ padding: "20px", marginTop: '100px', textAlign: 'center' }}>
            {isMobile ? (
                <div style={{ position: "relative" }}>
                    <Button
                        onClick={prev}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "0",
                            zIndex: 1,
                            transform: "translateY(-50%)",
                        }}
                        icon={<LeftOutlined />}
                    />
                    <Carousel ref={carouselRef} dots={false}>
                        {renderMoviesInGroups().map((group, index) => (
                            <div key={index}> 
                                <Row gutter={[16, 16]} justify="center">
                                    {group.map((movie, idx) => (
                                        <Col xs={24 / numColumns} key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                                            <Link to={`/detail-movie/${movie.slug}`} 
                                                className="image-link"
                                                style={{ textDecoration: 'none', width: '100%' }}
                                            >
                                                <div className="image-container" style={{ width: '100%', position: 'relative', overflow: 'hidden'}}>
                                                    <Image
                                                        className="scalable-image"
                                                        preview={false}
                                                        src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`}
                                                        alt={movie.name}
                                                        style={{ width: '100%', height: 'auto' }}
                                                    />
                                                </div>
                                                <Title className="title" level={5} style={{ margin: '10px 0', color: '#fff', textAlign: 'center' }}>
                                                    {movie?.name}
                                                </Title>
                                            </Link>
                                            <p style={{ color: '#fff', margin: 0 }}>{movie?.year}</p>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </Carousel>
                    <Button
                        onClick={next}
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            zIndex: 1,
                            transform: "translateY(-50%)",
                        }}
                        icon={<RightOutlined />}
                    />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {newMovies.map((value, index) => (
                        <Col
                            key={index}
                            xs={12}  
                            sm={12}  
                            md={8}   
                            lg={5} 
                            xl={4}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Link to={`/detail-movie/${value.slug}`} 
                                className="image-link"
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <div className="image-container" style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <Image
                                        className="scalable-image"
                                        preview={false}
                                        src={`https://img.ophim.live/uploads/movies/${value.thumb_url}`}
                                        alt={value.name}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                                <Title className="title" level={5} style={{ margin: '10px 0', color: '#fff', textAlign: 'center' }}>
                                    {value?.name}
                                </Title>
                            </Link>
                            <p style={{ color: '#fff', margin: 0 }}>{value?.year}</p>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default NewMovie;
