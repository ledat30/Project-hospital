import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailPolicy.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailPolicyById, getAllPolicy } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class DetailPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailPolicy: {},
            dataPolicy: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailPolicyById({
                id: id
            });
            this.setState({
                dataDetailPolicy: res.data
            })
        }

        let policy = await getAllPolicy();
        if (policy && policy.errCode === 0) {
            this.setState({
                dataPolicy: policy.data ? policy.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let id = this.props.match.params.id;
            let res = await getDetailPolicyById({
                id: id
            });

            this.setState({
                dataDetailPolicy: res.data
            })
        }

        if (this.props.match.params.id !== prevProps.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailPolicyById({
                id: id
            });

            this.setState({
                dataDetailPolicy: res.data
            })
        }
    }


    render() {
        let { dataDetailPolicy, dataPolicy } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-sepcialty-body'>
                    <div className='description-specialty'>
                        {dataDetailPolicy && !_.isEmpty(dataDetailPolicy)
                            &&
                            <>
                                <div className='title-policy'>{language === LANGUAGES.VI ? dataDetailPolicy.nameVI : dataDetailPolicy.nameEN}</div>
                                <div dangerouslySetInnerHTML={language === LANGUAGES.VI ?
                                    { __html: dataDetailPolicy.contentHTMLVi }
                                    :
                                    { __html: dataDetailPolicy.contentHTMLEn }}>
                                </div>
                            </>

                        }
                    </div>

                    <div className='container-tag'>
                        <div className='title-tag'><FormattedMessage id={'patient.handbook.category'} /></div>
                        <div className='containers'>
                            {dataPolicy && dataPolicy.length > 0 && dataPolicy.map((item, index) => {
                                return (
                                    <Link to={`/detail-policy/${item.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <div className='tag_category' key={index}>
                                            # {language === LANGUAGES.VI ? item.nameVI : item.nameEN}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPolicy));
