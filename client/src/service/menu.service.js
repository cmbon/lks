import axios from "axios";
import Header from './auth-header'

const API = "http://localhost:8000/api/menu/";
class MenuService {
    getMenu() {
        return axios.get(API + 'GetAll')
    }
    getDetail(id, data) {
        return axios.get(API + 'GetDetail/'+ id + '/' + data, {headers:Header()})
    }
    getTag(data) {
        return axios.get(API + 'Category/' + data)
    }
}

export default new MenuService();
