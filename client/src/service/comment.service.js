import axios from "axios";
import Header from './auth-header'

const API = "http://localhost:8000/api/comment/";
class CommentService {
    postComment(data) {
        return axios.post(API + 'Comment',data, {headers:Header()})
    }
    getCommentdata(data) {
        return axios.post(API + 'GetComment', data, {headers: Header()})
    }
    getidComment(data) {
        return axios.get(API + 'idAll/'+ data, {headers:Header()} )
    }
}

export default new CommentService();
