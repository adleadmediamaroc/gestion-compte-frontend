import React from 'react';
import { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const AddRole = () => {

    const [role, setRole] = useState('');
    const [updata, setUpdata] = useState();
    let  dat ={  
       "permissionId":0,
      "canCreate": false,
      "canDelete": false,
      "canEdit": false,
      "canView": false,
     
     
     } 
     
    const [data, setData] = useState([
        { id: 1, permission: 'Paramètres ', option1: false, option2: false, option3: false, option4: false, option5: false, defaultOption2: true  },
        { id: 2, permission: 'Collaborateurs', option1: false, option2: true, option3: false, option4: false, option5: false },
        { id: 3, permission: 'Roles Collaborateurs', option1: false, option2: false, option3: false, option4: false, option5: false }
     
      ]);
      const toast = useRef(null);
      const header = (
        <div className="table-header-container" >
            <p>Ajout  Rôle</p>
            <hr></hr>
            <p> <em style={{color : 'red'}}>* </em> Rôle</p>
            <span className="p-float-label">
                        <InputText id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%'}}/>
                        <label htmlFor="role"></label>
                    </span>
          
           
        </div>
    );
      const cols = [
        { field: 'permission', header: 'Permission', style: { width: '30%' } },
        { field: 'canView', header: 'Affichage' },
        { field: 'canCreate', header: 'Créer' },
        { field: 'canEdit', header: 'Modifier' },
        { field: 'canDelete', header: 'Supprimer' ,style: { color : 'red'} }
      ];
     // const toastTL = useRef(null);
     function validateForm() {
      let valid = true;
  
      if (!role.trim()) {
        valid = false;
      }
  
      return valid;
    }
      const onSave = () => {
        if(validateForm()){

        const datafinal = [];
        let i = 0;
       while (i < 3) {
        dat = {};
      dat.permissionId = updata[i].id;
      //dat.permission = updata[i].permission 
     
      if(updata[i].canCreate === undefined ) 
      dat.canCreate = false;
      else  dat.canCreate = updata[i].canCreate;
      
      if(updata[i].canDelete === undefined ) 
      dat.canDelete = false;
      else dat.canDelete = updata[i].canDelete
      
      if(updata[i].canEdit === undefined ) 
      dat.canEdit = false;
      else dat.canEdit = updata[i].canEdit
      
      if(updata[i].canView === undefined ) 
      dat.canView = false;
      else dat.canView = updata[i].canView;

      // if(updata[i].canViewOwn === undefined ) 
      // dat.canViewOwn = false;
      // else  dat.canViewOwn =updata[i].canViewOwn

      datafinal.push(dat);
       i++;
     }
    
     console.log(datafinal);
     const ajoutRoll = {
      "roleName": role,
      "rolePermissions": datafinal
  }
     axios.post('http://localhost:8080/api/roles/create-role', ajoutRoll )
     .then(response => {
       console.log(ajoutRoll);
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Le rôle a été créé avec succès', life: 3000 });
      
     })
     .catch(error => {
       console.log(error); // Affiche l'erreur s'il y en a une
       toast.current.show({ severity: 'info', summary: 'Info ', detail: 'Ce role existe déjà', life: 3000 });
       //toast.current.show({severity:'Info', summary: 'Info Message', detail:'Ce role existe déjà', life: 3000});
       console.log('matenregistrawesh');

     }); }
     
     else   toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Entrer un Role', life: 3000 });
    
      };
      
  const onCheckboxChange = (e, rowData, optionKey) => {
    const updatedData = [...data];
    const rowIndex = updatedData.findIndex(row => row.id === rowData.id);
    updatedData[rowIndex][optionKey] = e.target.checked;
    setData(updatedData);
    setUpdata(updatedData);
  };
  const checkboxTemplate = (rowData, optionKey) => {
    return (
      <div className="p-col-12 p-md-4">
        <label>
          <input type="checkbox" checked={rowData[optionKey]} onChange={(e) => onCheckboxChange(e, rowData, optionKey)} />
        </label>
      </div>
    );
  };

    return (
      <div>
         <Toast ref={toast} />
        <div className="grid">
              <div className="col-12">
                <div className="card">
                
                <div className="datatable-with-checkbox">
               <DataTable value={data} resizableColumns={true} columnResizeMode="expand"  header={header} >
                {cols.map(col => (
                  <Column key={col.field} field={col.field} header={col.header} style={col.style} body={col.field !== 'permission' && ((rowData) => checkboxTemplate(rowData, col.field))} />
                   ))}
                </DataTable>
                <br></br>
                <div className="p-justify-end">  <Button label="ENREGISTRER" className="p-button-raised mr-2 mb-2  "  onClick={onSave}  /></div> 
               

                </div>
                
                </div></div></div>
                </div>
    );
};

export default AddRole;
