import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllHandBook } from '../../../services/userService';

class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandBook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandBook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandBook: res.data ? res.data : []
            })
        }
    }
    render() {
        let { dataHandBook } = this.state;
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm Nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandBook && dataHandBook.length > 0 &&
                                dataHandBook.map((item, index) => {
                                    return (
                                        <div className='section-customize hb-child' key={index}>
                                            <div className='bg-image section-handbook'
                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='handbook-title'>{item.title}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
