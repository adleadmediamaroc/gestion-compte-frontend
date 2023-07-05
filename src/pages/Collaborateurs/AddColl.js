import React, { useState ,useEffect,useRef} from "react";
import { Card, Nav, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';
//import classNames from 'classnames';
import { RoleService } from '../../service/RoleService';
import { CollService } from '../../service/CollService';

import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';




const AddProfil = () => {
  

   
    const toast = useRef(null);
    const [isadmin,setIsAdmin] = useState(null);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [prenom, setPrenom] = useState([]);
    const [nom, setNom] = useState([]);
    const [email, setEmail] = useState([]);
    const [tele, setTele] = useState([]);
    const [sigemail, setSigemail] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };   

    const [password,setPassword]=useState('');
    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] = useState(null);

    const [data, setData] = useState([]);

    const RoleSelect =(event)=>{
        setSelectedRole(event);
        console.log(event.rolePermissions)
               
        const convertedData = event.rolePermissions.map(permission => {
         // console.log(permission)
             
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
              canCreate: permission.canCreate,
              canEdit: permission.canEdit,
              canDelete: permission.canDelete
            }
          });
        //  
        console.log(convertedData);
         setData(convertedData)
         console.log(data)

    }

    const onCheckboxChange2 = (e, rowData, optionKey) => {
        const updatedData = [...data];
       console.log(updatedData)
        const rowIndex = updatedData.findIndex(row => row.id === rowData.id);
        console.log(rowIndex)
        updatedData[rowIndex][optionKey] = e.target.checked;
       // setData(updatedData)
        //setUpdata(updatedData);
      };
      const checkboxTemplate = (rowData, optionKey) => {
        //console.log(optionKey)
        return (
          <div className="p-col-12 p-md-4">
            <label>
              <input type="checkbox" checked={rowData[optionKey]} onChange={(e) => onCheckboxChange2(e, rowData, optionKey)}  ReadOnly/>
            </label>
          </div>
        );
      };
    const loadRoles =() =>{
            const roleService = new RoleService();
            roleService.getRoles().then(data => 
                {setRoles(data)
                console.log(data);
                })
        };

      useEffect(() => {
        loadRoles();
    }, []);

    
    const roleOptions = [];
for (let i = 0; i < roles.length; i++) {
      roleOptions.push({
        label: roles[i].roleName,
        value: roles[i]
      });
    }


  const onCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    let updatedValues = [];
    if (event.target.checked) {
      updatedValues = [...checkboxValue, selectedValue];
    } else {
      updatedValues = checkboxValue.filter((value) => value !== selectedValue);
    }
    setCheckboxValue(updatedValues);
    setIsAdmin(updatedValues.includes("Admin") ? "Oui" : "Non");
    //console.log(isadmin)

  };

const inputError = "";
    const [activeKey, setActiveKey] = useState("profil");
   // const [inputError, setInputError] = useState('');
    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
};

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function validateForm() {
        let valid = true;
    
        if (!(prenom && nom && email )) {
          valid = false;
          }
    
        return valid;
      }

    const onSave =()=>{
        if(validateForm()){
          let admin=false;

          if(isadmin === null)
          admin=false;
          if(isadmin === 'Oui')
          admin=true;
          
          
          

          //const pass = password;
          let addColl = {
            
            admin: admin,
            emailSignature:sigemail,
            firstName : prenom,
            lastName :nom,
            email: email,
            phoneNumber:tele,
            password:password,
            profileImage:'Image',
            roleDto: selectedRole
      
        }
       
        const collService = new CollService();
        collService.AjouterColl(addColl).then(response => 
            {
              console.log(addColl)
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Coll a été créé avec succès', life: 3000 });
            })
            .catch(error => 
              {
                console.log(error.message)
              })  
        }
        else 
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: ' Prenom / Nom / Email est vide  ', life: 3000 });

    }

   
    return (
       
                   <div>  
                     <Toast ref={toast} />
                        <Card>
                            <Card.Header>
                                <Nav variant="tabs" activeKey={activeKey} onSelect={handleSelect} >
                                    <Nav.Item>
                                        <Nav.Link eventKey="profil">Profil</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="permission">Permissions des modules</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body >
                                <Form onSubmit={handleSubmit}>
                                    {activeKey === "profil" && (
                                        
                                        <>  

                                   <div className="field-radiobutton">
                                     
                                    
                                     <Checkbox
                                      inputId="checkOption2"
                                      name="option2"
                                      value="Autho"
                                      checked={checkboxValue.indexOf("Autho") !== -1}
                                      onChange={onCheckboxChange}
                                    />

                                    <label htmlFor="checkOption2">Autoriser l'authentification en deux étapes</label>
                                    </div>
                                    <div className="field-radiobutton">
                                    <Checkbox
                                      inputId="checkOption1"
                                      name="option1"
                                      value="per"
                                      checked={checkboxValue.indexOf("per") !== -1}
                                      onChange={onCheckboxChange}
                                    />
                                    
                                    <label htmlFor="checkOption1">Ce n'est pas un membre de personnel</label>
                                  </div>
                                  
                                                                          
                                            
                                            <label >Image profil</label>
                                            <Form.Group controlId="formBasicName">
                                                <Card style={{
                                                    width: '100%',
                                                    padding: '10px'
                                                }}>  <input
                                                        type="file"
                                                        id="upload-image"
                                                        name="upload-image"
                                                        onChange={handleFileInputChange}
                                                      /></Card>


                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}} >* </span>
                                            <label >Prénom</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="prenom" name="prenom" type="text" required  value={prenom} onChange={(e) => setPrenom(e.target.value)}/>

                                                    {/* {inputError && <span style={{ color: 'red' }}>{inputError}</span>} */}
                                                </div>
                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}}>* </span>

                                            <label >Nom</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                                                    {/* {inputError && <span style={{ color: 'red' }}>{inputError}</span>} */}
                                                </div>
                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}}>* </span>
                                            <label >Email</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="email" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    {/* {inputError && <span style={{ color: 'red' }}>{inputError}</span>} */}
                                                </div>
                                            </Form.Group>
                                           
                                            <label >Télephone</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="name1" type="text" value={tele} onChange={(e) => setTele(e.target.value)} />
                                                </div>
                                            </Form.Group>  
                                            <label >Signature Email</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputTextarea autoResize rows="3" cols="30" value={sigemail} onChange={(e) => setSigemail(e.target.value)} />
                                                </div>
                                            </Form.Group>
                                            <br></br>
                                    
                                    <div className="field-radiobutton">
                                     <Checkbox
                                      inputId="checkOption4"
                                      name="option4"
                                      value="Admin"
                                      checked={checkboxValue.indexOf("Admin") !== -1}
                                      onChange={onCheckboxChange}
                                    />

                                    <label htmlFor="checkOption4">Définir comme administrateur</label>
                                    </div>
                                  
                                    <div className="field-radiobutton">
                                     <Checkbox
                                      inputId="checkOption3"
                                      name="option3"
                                      value="Email"
                                      checked={checkboxValue.indexOf("Email") !== -1}
                                      onChange={onCheckboxChange}
                                    />

                                    <label htmlFor="checkOption3">Envoyer e-mail de bienvenue</label>
                                    </div>
                                    
                                           
                                    {checkboxValue.includes("per") ?  (
                                             <Form.Group controlId="formBasicName">
                                                <span className="required-field" style={{color : 'red'}} ></span>
                                               <label>Password</label>
                                               <div className="p-inputgroup">
                                                 <Password id="password" required toggleMask disabled/>

                                                 {/* {inputError && <span style={{ color: "red" }}>{inputError}</span>} */}
                                               </div>
                                             </Form.Group>
                                           ) :  (
                                             <Form.Group controlId="formBasicName">
                                                <span className="required-field" style={{color : 'red'}} >* </span>
                                               <label>Password</label>
                                               <div className="p-inputgroup">
                                                 {/* <Password id="password" required  toggleMask value={password} onChange={(e) => setPassword(e.target.value)}/> */}
                                                 <Password inputid="password" value={password} onChange={(event) => setPassword(event.target.value)} ></Password>
                                                 {/* {inputError && <span style={{ color: "red" }}>{inputError}</span>} */}
                                               </div>
                                             </Form.Group>
                                           )}
                                         
                                            </>
                                    )}
                                    {activeKey === "permission" && (
                                        <div>                                                
                                        <Dropdown
                                           value={selectedRole}
                                           options={roleOptions}
                                           onChange={(e) =>  RoleSelect(e.value)}
                                           placeholder="Select a Role"
                                           className="w-full"
                                           disabled={checkboxValue.indexOf("Admin") !== -1}

                                         />   
                                         {/* // { console.log(selectedRole.rolePermissions) } */}
                                        <br></br>
                                        <br></br>
                                        

                                    <DataTable value={data} resizableColumns={true} columnResizeMode="expand" scrollable scrollHeight="400px"> 
                                        <Column key="id" field="id" header="ID" style={{ display: 'none' }} />
                                        <Column  key="actions" header="Permissions" field= "permission" />
                                        <Column key="option1" field="canView"header="Affichage" body={rowData => checkboxTemplate(rowData, 'canView')}  />
                                        <Column  key="option3" field="canCreate"  header="Créer" body={rowData => checkboxTemplate(rowData, 'canCreate')}  />
                                        <Column   key="option4"  field="canEdit" header="Modifier" body={rowData => checkboxTemplate(rowData, 'canEdit')} />
                                        <Column key="option5" field="canDelete" header="Supprimer"body={rowData => checkboxTemplate(rowData, 'canDelete')}/>
                                    </DataTable>  
                                    <br></br>
                                    {console.log(prenom)}
                                    <div className="p-justify-end">  <Button  className="p-button-raised mr-2 mb-2  "  onClick={onSave}> ENREGISTRER</Button></div> 

                                 
                                        </div> 
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                
          </div>   
    );

        
  
}

export default AddProfil;