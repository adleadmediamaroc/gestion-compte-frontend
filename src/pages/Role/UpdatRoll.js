import React from 'react';
import { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { combineEventUis } from '@fullcalendar/core';

const UpdatRoll = (props) => {
    
    const{ roleId,  roleName} = props.role;
    const [role, setRole] = useState(roleName);
    console.log(roleId)
    console.log('///////')
    console.log(props.role)
  

    const convertedData = props.role.rolePermissions.map(permission => {
      //let permissionName = '';
        if (permission.permissionId === 1) {
         permission.permissionName = 'Paramètres';
        } 
       if (permission.permissionId === 2) {
        permission.permissionName = 'Collaborateurs';
         }
         if (permission.permissionId === 3) {
          permission.permissionName = 'Roles Collaborateurs';
      }
      return {
        id: permission.permissionId,
        permission: permission.permissionName,
        canView: permission.canView,
        canViewOwn: permission.canViewOwn,
        canCreate: permission.canCreate,
        canEdit: permission.canEdit,
        canDelete: permission.canDelete
      }
    });
   const [data, setData] = useState(convertedData);
   
    const [updata, setUpdata] = useState();
   
      function validateForm() {
      let valid = true;
  
      if (!role.trim()) {
        valid = false;
      }
  
      return valid;
    } 
    let  dat ={  
       "permissionId":0,
      "canCreate": false,
      "canDelete": false,
      "canEdit": false,
      "canView": false,
   
     
     } 
     const onSave = () => {
      if(validateForm() && updata){
      const datafinal = [];
      let i = 0;
      while (i < 3) {
       dat = {};
          dat.permissionId = updata[i].id;
          dat.canCreate = updata[i].canCreate;
          dat.canDelete = updata[i].canDelete
          dat.canEdit = updata[i].canEdit
          dat.canView = updata[i].canView;
         
         datafinal.push(dat);
         i++;
     }
    console.log(datafinal);
    const UpdateRoll = {
      "roleId": props.role.id,
      "roleName": role,
      "rolePermissions": datafinal
     }
     console.log(UpdateRoll) 
     
     axios.put(`http://localhost:8080/api/roles/update-role/${roleId}`,UpdateRoll)
     .then(response => {
       console.log(UpdateRoll); 
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Le rôle a été Modifier avec succès', life: 3000 });
      
     })
     .catch(error => {
       console.log(error); // Affiche l'erreur s'il y en a une
       //toast.current.show({ severity: 'info', summary: 'Info ', detail: 'Ce role existe déjà', life: 3000 });
       //toast.current.show({severity:'Info', summary: 'Info Message', detail:'Ce role existe déjà', life: 3000});
       console.log('matenregistrawesh');

     })
    }
      else   toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Role vide /  aucune Modification Effectuée', life: 3000 });
     }
     
    
    
      const toast = useRef(null);
      const header = (
        <div className="table-header-container" >
            <p>Modifier Rôle</p>
            <hr></hr>
            <p> <em style={{color : 'red'}}>* </em> Rôle</p>
            <span className="p-float-label">
                        <InputText id="name" type="text" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%'}} required={true}/>
                        <label htmlFor="name"></label>
                    </span>
          
           
        </div>
    );
 
  const onCheckboxChange = (e, rowData, optionKey) => {
    const updatedData = [...data];
   console.log(updatedData)
    const rowIndex = updatedData.findIndex(row => row.id === rowData.id);
    console.log(rowIndex)
    updatedData[rowIndex][optionKey] = e.target.checked;
   // setData(updatedData)
    setUpdata(updatedData);
  };
  const checkboxTemplate = (rowData, optionKey) => {
    //console.log(optionKey)
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

    
     <DataTable value={data} resizableColumns={true} columnResizeMode="expand" scrollable scrollHeight="400px" header={header}>
    
      <Column key="id" field="id" header="ID" style={{ display: 'none' }} />
      <Column
        key="actions"
        header="Permissions"
        field= "permission"
      />
      <Column
        key="option1"
        field="canView"
        header="Affichage"
        body={rowData => checkboxTemplate(rowData, 'canView')}
      />
      <Column
        key="option3"
        field="canCreate"
        header="Créer"
        body={rowData => checkboxTemplate(rowData, 'canCreate')}
      />
      <Column
        key="option4"
        field="canEdit"
        header="Modifier"
        body={rowData => checkboxTemplate(rowData, 'canEdit')}
      />
      <Column
        key="option5"
        field="canDelete"
        header="Supprimer"
        body={rowData => checkboxTemplate(rowData, 'canDelete')}
      />
    </DataTable>
    <br></br>
      <div className="p-justify-end">  <Button label="Modifier" className="p-button-raised mr-2 mb-2  "  onClick={onSave}  /></div> 
          </div>
        </div>
      </div>
  </div>
    );
};

export default UpdatRoll;
