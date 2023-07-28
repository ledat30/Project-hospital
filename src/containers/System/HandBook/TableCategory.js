import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableCategory.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';


class TableCategory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            CategoryhandBookRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchAllCategoryHandBookRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCategory !== this.props.listCategory
            && this.state.CategoryhandBookRedux.length === 0) {
            this.setState({
                CategoryhandBookRedux: this.props.listCategory
            })
        }
    }

    handleDeleteCategoryHandbook = (categoryHandBook) => {
        this.props.deleteCategoryRedux(categoryHandBook.id);
    }

    handleEditCategoryHandbook = (category) => {
        this.props.handleEditCategoryHandBookFromPaentKey(category)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-category?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    CategoryhandBookRedux: result.results
                })
            } else {
                this.setState({
                    CategoryhandBookRedux: this.props.listCategory
                })
            }
        } else {
            this.setState({
                CategoryhandBookRedux: this.props.listCategory
            })
        }
    }, 300)

    render() {
        let arrCategoryHandBook = this.state.CategoryhandBookRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search category ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableCategory'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage-handbook.name1'} /></th>
                            <th><FormattedMessage id={'manage-handbook.name2'} /></th>
                            <th><FormattedMessage id={'manage-handbook.Action'} /></th>
                        </tr>
                        {arrCategoryHandBook && arrCategoryHandBook.length > 0 ? arrCategoryHandBook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nameVI}</td>
                                    <td>{item.nameEN}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditCategoryHandbook(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteCategoryHandbook(item)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            (
                                <b><FormattedMessage id={'patient.detail-category.tb'} /></b>
                            )
                        }
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listCategory: state.admin.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategoryHandBookRedux: () => dispatch(actions.fetchAllCategoryHBStart()),
        deleteCategoryRedux: (id) => dispatch(actions.deleteCategoryHB(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
