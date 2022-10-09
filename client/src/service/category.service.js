import axios from "axios";
import Header from './auth-header'

const API = "http://localhost:8000/api/category/";
class CommentService {
    getCategory() {
        return axios.get(API + 'getAll')
    }
}

export default new CommentService();
