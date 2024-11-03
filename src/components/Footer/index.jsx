import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ textAlign: "center", padding: "20px 0", backgroundColor: "#17202a", color: '#fff', marginTop: '70px' }}>
            <div>
                <p>&copy; {new Date().getFullYear()} My Movie App. All rights reserved.</p>
            </div>
            <div>
                <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link>
            </div>
        </Footer>
    );
};

export default FooterComponent;