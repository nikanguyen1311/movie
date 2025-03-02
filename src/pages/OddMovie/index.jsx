import React, { useState, useEffect, useRef } from "react";
import { Carousel, Card, Button, Col, Row, Image, Typography, Skeleton, Spin, Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import './index.css';

const { Title } = Typography;

const OddMovie = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [numColumns, setNumColumns] = useState(3);
    const carouselRef = useRef();
    const [oddMovies, setOddMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18;

    useEffect(() => {
        let page = 3;

        const fetchMovies = async () => {
            const url = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setOddMovies(data.items);
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

    useEffect(() => {
        document.title = "Phim lẻ";
    }, []);

    const next = () => {
        carouselRef.current.next();
    };

    const prev = () => {
        carouselRef.current.prev();
    };

    const renderMoviesInGroups = () => {
        const groupedMovies = [];
        for (let i = 0; i < oddMovies.length; i += numColumns) {
            groupedMovies.push(oddMovies.slice(i, i + numColumns));
        }
        return groupedMovies;
    };

    useEffect(() => {
        if (oddMovies?.length > 0) {
            setIsLoading(false); 
        }
    }, [oddMovies]);

    const handlePageChange = (page) => {
        setIsPageLoading(true); 
        setCurrentPage(page);
        setTimeout(() => setIsPageLoading(false), 500); 
    };

    const startIndex = (currentPage - 1) * pageSize;
    const currentMovies = oddMovies.slice(startIndex, startIndex + pageSize);

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", padding: '20px', marginTop: '100px' }}>
                <Spin tip="Đang tải phim..." size="large" />
            </div>
        );
    }

    return (
        <div
            style={{ padding: "20px", marginTop: "100px", textAlign: "center" }}
        >
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
                                                    <LazyLoad
                                                        height={200}
                                                        offset={100}
                                                        placeholder={<Skeleton.Image />}
                                                        debounce={300} 
                                                    > 
                                                        <Image
                                                            className="scalable-image"
                                                            preview={false}
                                                            src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`}
                                                            alt={movie.name}
                                                            style={{ width: '100%', height: 'auto' }}
                                                            loading="lazy"
                                                        />
                                                    </LazyLoad>
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
                <div>
                    {isPageLoading ? (
                        <div style={{ textAlign: "center", padding: "20px", marginTop: '50px' }}>
                            <Spin tip="Đang chuyển trang..." size="large" />
                        </div>
                    ) : (
                        <Row gutter={[16, 16]}>
                            {currentMovies.map((value, index) => (
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
                                                    style={{ width: '100%', height: 'auto' }}
                                                    loading="lazy"
                                                />
                                            </LazyLoad>
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
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={oddMovies.length}
                        onChange={handlePageChange}
                        className="pagination-container"
                    />
                </div>
            )}
        </div>
    );
};

export default OddMovie;
