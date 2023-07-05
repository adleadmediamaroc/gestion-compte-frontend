import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import '../../assets/demo/user.css'

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';
import { Link } from 'react-router-dom';
export const InputDemo = () => {

    const legendTemplate = (
        <div className="flex align-items-center text-primary">
            <span className="pi pi-user mr-2"> User Profile</span>
        </div>
    );
    const [inputsEnabled, setInputsEnabled] = useState(false);
    function handleEditProfileClick() {
        setInputsEnabled(true);
      }
    return (
        <div className="grid p-fluid">
            
            <div className="col-12 md:col-8">
            <Button label="Edit" icon="pi pi-pencil" onClick={handleEditProfileClick} style={{width:'20%'}}></Button>
            <div><br></br></div>
               <div className="card">
                    <h5></h5>
                   
                    <h6>User Informations</h6>
                    <div className="grid formgrid">
                    <div className="col-12 mb-2 lg:col-6 lg:mb-4">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user-edit" />
                                <InputText type="text" placeholder="First name" disabled={!inputsEnabled} />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-6 lg:mb-4">
                            <span className="p-input-icon-left">
                                <InputText type="text" placeholder="Last name" disabled={!inputsEnabled} />
                                <i className="pi pi-user-edit" />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-6 lg:mb-4">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText type="text" placeholder="Username" disabled={!inputsEnabled} />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-6 lg:mb-4">
                            <span className="p-input-icon-left">
                                <InputText type="text" placeholder="Phone number" disabled={!inputsEnabled}/>
                                <i className="pi pi-user-edit" />
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-12 lg:mb-4">
                            <span className="p-input-icon-left">
                            <i className="pi pi-envelope" />
                                <InputText type="text" placeholder="Email Address" disabled={!inputsEnabled}/>
                              
                            </span>
                        </div>

                        <Divider />
                    </div>
                    <div className="grid formgrid">
                    <h6>Contact Informations</h6>
                    </div>
                
                </div>

                
           
         </div>
           
            <div className="col-12 md:col-4">
                <div className="card">
             
                <div className="user-image">
                <img src="https://i.pravatar.cc/150?img=1" alt="user" />
                </div>
                <div className="user-info">
                 <h2>User Name</h2>
                 <p><Link to="/changePassword">change Password</Link></p>
                 <p>User Bio</p>
                 <p>
                 The Bio - About page is the default landing page for the Universal Profile. 
                 This page displays a user's image, contact information, summary information, skills, interests,
                  team hierarchy, and additional information. Users with the appropriate permissions may be able
                   to view their own Bio Profile page or the Bio page for other users within their permission
                    constraints.
                 </p>
                 </div>
              
                </div>

            </div>
           
           
        </div >
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(InputDemo, comparisonFn);