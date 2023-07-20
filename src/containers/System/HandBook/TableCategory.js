import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableCategory.scss';
import * as actions from '../../../store/actions';


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
        if (prevProps.listCategory !== this.props.listCategory) {
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


    render() {
        let arrCategoryHandBook = this.state.CategoryhandBookRedux;
        return (
            <>
                <table id='TableCategory'>
                    <tbody>
                        <tr>
                            <th>Tên danh mục -vi</th>
                            <th>Tên danh mục -en</th>
                            <th>Action</th>
                        </tr>
                        {arrCategoryHandBook && arrCategoryHandBook.length > 0 && arrCategoryHandBook.map((item, index) => {
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
                        })}
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
