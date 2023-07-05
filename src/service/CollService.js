
import axios from 'axios';

export class CollService {


    AjouterColl(ajoutColl) {
        return axios.post('http://localhost:8080/api/users/add-staff', ajoutColl )
    }
    async getProducts() {
        const res = await axios.get('assets/demo/data/products.json');
        return res.data.data;
    }
    async getUsers() {
        const res = await axios.get('http://localhost:8080/api/users/');
        return res.data;
    }
    async DeleteCole(id) {
        const res = await axios.delete(`http://localhost:8080/api/users/delete-staff/${id}`);
        return res.data;
      }

    UpdateCollaborateur(collId,UpdateColl) {
        return axios.put(`http://localhost:8080/api/users/update-staff/${collId}`,UpdateColl);
    }
    async getCollaborateurById(collId) {

    }

}
