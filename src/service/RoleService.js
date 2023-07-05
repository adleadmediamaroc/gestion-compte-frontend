
import axios from 'axios';

export class RoleService {

    getRoles() {
        return axios.get('http://localhost:8080/api/roles/').then(res => res.data);
    }
    DeleteRole(id) {
        return axios.delete(`http://localhost:8080/api/roles/delete-role/${id}`)
          .then(res => res.data);
      }

   
}