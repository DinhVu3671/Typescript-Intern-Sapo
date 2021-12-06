import axios from 'axios';
import callAPI from './index';



class CategoryAPI {

    // [GET] /
    CategoryList(page = 0, size = 10){
        return callAPI.get('category', {params: { page, size}});
    }

    // [GET]
    CategoryItem (data: any) {
        return callAPI.get(`category/${data}`);
    }

    // [POST]
    createCategory (data: any) {
        return callAPI.post('category/', data)
    }

    // [PUT]
    updateCategory (id: any, data: any) {
        return callAPI.put(`category/${id}`,data)
    }


}
export default new CategoryAPI();