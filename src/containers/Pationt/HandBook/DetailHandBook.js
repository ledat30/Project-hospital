import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailHandBook.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailHandBookById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';


class DetailHandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandBook: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandBookById({
                id: id
            });

            this.setState({
                dataDetailHandBook: res.data
            })

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    returnToBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }

    render() {
        let { dataDetailHandBook } = this.state;
        console.log(dataDetailHandBook)
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-sepcialty-body'>
                    <div className='description-specialty'>
                        <div className='back' onClick={() => this.returnToBlog()}>
                            <i className="fas fa-reply"></i> <u>Quay lại</u></div>
                        {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                            &&
                            <>
                                <div className='title-HB'>{dataDetailHandBook.title}</div>
                                <div dangerouslySetInnerHTML={language === LANGUAGES.VI ?
                                    { __html: dataDetailHandBook.contentHTMLVi }
                                    :
                                    { __html: dataDetailHandBook.contentHTMLEn }}>
                                </div>
                            </>

                        }

                    </div>
                </div>
                <HomeFooter />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailHandBook));
