
import axios from 'axios';

export class ProductService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }
    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }
    getRoles() {
        return axios.get('http://localhost:8080/roles/roles').then(res => res.data);
    }
    DeleteRole(id) {
        return axios.delete(`http://localhost:8080/roles/supprimer/${id}`)
          .then(res => res.data);
      }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}