import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import CategoryAPI from '../api/CategoryAPI';
import { setCategoryList } from '../redux/action';
import { RootState } from '../redux/reducers';


const DetailCategory: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const categoryID = useSelector((state: RootState) => state.categoryId.categoryId);
    const category = useSelector((state: RootState) => state.category.category);
    let paging = useSelector((state: RootState) => state.setStatePaging.paging);

    
    const [code, setCategoryCode] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createAt, setCreateAt] = useState("");
    const [updateAt, setUpdateAt] = useState("");

    useEffect(() => {
        async function getData() {
            await setCategoryCode(category.code);
            await setCategoryId(category.categoryId);
            await setName(category.name);
            await setDescription(category.description);
            await setCreateAt(category.createTime);
            await setUpdateAt(category.updateTime);
           
        }
        getData();
 
    }, [category]);

    

    // async function Loaddata() {
    //     const result = await CategoryAPI.CategoryItem(categoryID);
    //     // result.then( res => {
    //     //     setCategory(res.data);
    //     //     console.log(category);
    //     // }
    //     // );
    //     setCategory(result.data);
    //     console.log(category);
       
       
        
    //     return true;
    
    // }
    // useEffect(() => {
    //     // cách 1
    //     async function getData() {
    //         // const result = await Loaddata(); 
    //         const result = await CategoryAPI.CategoryItem(categoryID);
    //         setCategory(result.data);
                
    //         console.log(category); 
    //     }
    //     getData();

    //     //cách 2
    //     const result = CategoryAPI.CategoryItem(categoryID);
    //     result.then(res => {
    //         setCategory(res.data);
    //     });
            


 
    // }, [categoryID]);

    async function editCategory() {
       
        const UpdateResult = await CategoryAPI.updateCategory(categoryID, {code, name, description});
        console.log(UpdateResult);
        const result = await CategoryAPI.CategoryList(paging.page, paging.size);
        dispatch(setCategoryList(result.data));

        history.replace('/category')
        
    }
    function closeDetail(){
        history.replace('/category')
    }
 
    return (
        <React.Fragment>
            {/* <!-- Modal --> */}
            
    
            {/* <div className="modal fade" id="detail-category-modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true"> */}
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detail Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeDetail}></button>
                        </div>
                        <div className="modal-body">
                            <div id="form">
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="userId-add" className="col-sm-3 col-form-label">Category Code <span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="userId-add" placeholder="Category code"
                                                value={code}
                                                 onChange={(e) => setCategoryCode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="userName-add" className="col-sm-3 col-form-label">Category Id<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="userName-add" placeholder="Category id"
                                                value={categoryId}  onChange={(e) => setCategoryId(e.target.value)} disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="teamName-add" className="col-sm-3 col-form-label">Name<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="teamName-add" placeholder="Name"
                                                value={name}  onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language-add" className="col-sm-3 col-form-label">Description<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" id="language-add" placeholder="Description"
                                            value={description}  onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language-add" className="col-sm-3 col-form-label">Create At<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" id="language-add" placeholder="Create At"
                                            value={createAt} onChange={(e) => setCreateAt(e.target.value)} disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language-add" className="col-sm-3 col-form-label">Update At<span style={{ color: 'red' }}>*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" id="language-add" placeholder="Update At"
                                               value={updateAt} onChange={(e) => setUpdateAt(e.target.value)} disabled
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
                                onClick={editCategory}
                            >Edit</button>
                            <button type="button" className="btn btn-primary " data-bs-toggle="modal"
                                data-bs-target="#add-confirm-modal" aria-label="Close" data-bs-dismiss="modal"
                                onClick={closeDetail}
                            >Cancel</button>
                            <div className="col-sm-5 col-form-label"></div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </React.Fragment>
    )
}
export default DetailCategory