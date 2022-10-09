import axios from "axios";
import Header from './auth-header'

const API = "http://localhost:8000/api/tags/";
class TagsService {
    get(data) {
        return axios.get(API + 'Get/' + data)
    }
}

export default new TagsService();
