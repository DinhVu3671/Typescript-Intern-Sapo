import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CategoryAPI from '../api/CategoryAPI';
import { setCategoryList } from '../redux/action';
import { RootState } from '../redux/reducers';
import Modal from 'react-modal';
import "./categoryList/create.css";

const CreateCategory: React.FC = () => {

    const dispatch = useDispatch();
    const [code, setCategoryCode] = useState("");
    // const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    let paging = useSelector((state: RootState) => state.setStatePaging.paging);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const openModal = () => {
    //     setState({ modalIsOpen: true });
    //   };

    //   closeModal = () => {
    //     this.setState({ modalIsOpen: false });
    //   };


    async function addNewCategory() {
        console.log(code);
        console.log(name);
        console.log(description);
        const createCategoryResult = await CategoryAPI.createCategory({ code, name, description });
        console.log(createCategoryResult);
        const result = await CategoryAPI.CategoryList(paging.page, paging.size);
        dispatch(setCategoryList(result.data));

        let myDialog: any = document.getElementById("add-category-modal");
        myDialog.showModal();
        // window.$('#add-category-modal').modal('hide');
        // console.log(createCategoryResult);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openModal = () => {
        setModalIsOpen(true);
    };
    const styles = {
        container: {
            fontWeight: "bold",
        },
    } as const;

    return (
        <React.Fragment>
            {/* <!-- Modal --> */}
            <button onClick={openModal}>Open Modal</button>
            <div className="test">
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
        </React.Fragment>
    )
}
export default CreateCategory