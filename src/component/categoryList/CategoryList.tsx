import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Tables from './Table';
import Modal from 'react-modal';
import './CategoryList.css';


import { FaUserCircle } from 'react-icons/fa';
import CreateCategory from '../CreateCategory';
import CategoryAPI from '../../api/CategoryAPI';
import DetailCategory from '../DetailCategory';
import { ComboWombo, setCategory, setCategoryId, setCategoryList } from '../../redux/action';
import categoryId from '../../redux/reducers/categoryId';
import { RootState } from '../../redux/reducers';

function CategoryList() {

    let paging = useSelector((state: RootState) => state.setStatePaging.paging);
    let usermana = useSelector((state: RootState) => state.categoryList.categoryList);

    const [code, setCategoryCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const history = useHistory();
    const dispatch = useDispatch();

    // const [usermana, setUsermana] = useState(useSelector((state) => state.categoryList.categoryList));
    // const [category, setCategory] = useState("");




    async function Loaddata(paging: any) {
        let result = await CategoryAPI.CategoryList(paging.page - 1, paging.size);


        // console.log(result);
        // setUsermana(result.data);
        dispatch(setCategoryList(result.data));
        console.log(usermana);

        return true;
    }

    useEffect(() => {
        async function getData() {
            const result = await Loaddata(paging);
            if (!result) history.replace('/login');
        }
        getData();

    }, [history]);

    async function getDetailModal(e: any) {
        // setCategoryDetail(e.target.getAttribute('data-category-id'));
        // console.log(e.target.getAttribute('data-category-id'));
        console.log('categoryDetail');
        console.log(e.target.getAttribute('data-category-id'));
        dispatch(setCategoryId(e.target.getAttribute('data-category-id')));
        const result = await CategoryAPI.CategoryItem(e.target.getAttribute('data-category-id'));
        dispatch(setCategory(result.data));
        console.log('done');
        history.replace('/category/detail');

    }


    const data = React.useMemo(
        () => [
            {

                categoryId: 1234,
                name: 'Hello',
            },
            {
                name: 'react-table',
                categoryId: '1234',
            },
            {
                name: 'whatever',
                categoryId: '1234',
            },
        ],
        []
    )


    // console.log(data);
    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                width: '10%',
                iconSort: true,
                Cell: (cell: any) => <span>{cell.row.index + 1 + paging.size * (paging.page - 1)}</span>
            },
            {
                Header: 'Name Category',
                width: '50%',
                accessor: 'name',
            },
            {
                Header: 'ID Category',
                width: '30%',
                accessor: 'categoryId',
            },
            {
                Header: 'Detail',
                width: '30%',
                Cell: (cell: any) => <button type="button" className="btn btn-danger btn-detail" data-bs-toggle="modal" data-bs-target="#delete-modal" data-category-id={cell.row.cells[2].value}
                    onClick={getDetailModal}
                >Detail</button>
            }
        ],
        []
    )
    function Logout() {
        history.replace("/login");
    }
    // function Create() {
    //     let myDialog: any = document.getElementById("add-category-modal");
    //     myDialog.showModal();
    //     // window.$('#add-category-modal').modal('show');
    // }
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openModal = () => {
        setModalIsOpen(true);
        console.log(modalIsOpen);
        document.getElementById('body')?.setAttribute('opacity', "0.1")
    };
    const reSetForm = () => {
        setCategoryCode("");
        setName("");
        setDescription("");
    }

    async function addNewCategory() {
        console.log(code);
        console.log(name);
        console.log(description);
        const createCategoryResult = await CategoryAPI.createCategory({ code, name, description });
        console.log(createCategoryResult);
        const result = await CategoryAPI.CategoryList(paging.page, paging.size);
        dispatch(setCategoryList(result.data));
        closeModal();
        reSetForm();

    }

    return (
        <div>
            <div id="body">
                <div className="user">

                    <div className="dropdown">
                        <div className="userId-header-tab dropdown-toggle" id="user-detai" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaUserCircle size={40} />
                        </div>

                        <div className="user-detai-drop dropdown-menu" aria-labelledby="user-detai"  >
                            <div className="text-user-logout" onClick={Logout}>Log Out</div>
                        </div>

                    </div>
                </div>
                <div className="header-page" >List Category</div>
                <div className="divBtn-create">
                    <div className="btn btn-light btn-create" onClick={openModal}>Create Category</div>

                </div>
                <div className="table-category"><Tables columns={columns} data={usermana} /></div>
                {/* <CreateCategory /> */}
                {/* <DetailCategory /> */}


                {/* <!-- Modal --> */}
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="createModal" >
                    <div>
                        <div className="modal-header">
                            <h5 className="modal-title">Create Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div id="form">
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="userId-add" className="col-sm-3 col-form-label">Category Code <span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="email" className="form-control " id="userId-add" placeholder="Category code"
                                                value={code} onChange={(e) => setCategoryCode(e.target.value)}
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="teamName-add" className="col-sm-3 col-form-label">Name<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="teamName-add" placeholder="Name"
                                                value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language-add" className="col-sm-3 col-form-label">Description<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="language-add" placeholder="Description"
                                                value={description} onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </form>
                                <div className="create-result text-center text-danger">
                                    {/* {createResult} */}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary " data-bs-toggle="modal"
                                data-bs-target="#add-confirm-modal"
                                onClick={addNewCategory}
                            >Create</button>
                            <div className="col-sm-5 col-form-label"></div>
                        </div>

                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default CategoryList