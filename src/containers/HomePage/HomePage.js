import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome';
import Specialty from './Section/Specialty';
import CoSoYte from './Section/CoSoYte';
import './HomePage.scss';
// Import css files slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import Footer from './Footer';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }
        return (
            <div>
                <HeaderHome />
                <Specialty settings={settings} />
                <CoSoYte settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <Footer/>
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
