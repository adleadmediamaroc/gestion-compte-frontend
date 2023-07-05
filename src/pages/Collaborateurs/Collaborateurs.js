
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CollService } from '../../service/CollService';
import { Toast } from 'primereact/toast';
import { Card, Form } from "react-bootstrap";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import AddColl from "./AddColl";


 function Collaborateur() {
    let emptyColl = {

        staffId: '',
        firstName : '',
        lastName: '',
        email: '',
        active: 0,
        lastLogin: '',
        phoneNumber:'',
      
    };
    const [visible, setVisible ]= useState(false);

    const [products, setProducts] = useState(null);

    const [colls, setColls] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [coll, setColl] = useState(emptyColl);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    
    const loadColl = () => {
        const collService = new CollService();
        collService.getUsers() .then(data => 
            {setColls(data)
            console.log(data);
            })
       
    };
    useEffect(() => {
        loadColl();
        //collService.getProducts().then(data => setProducts(data));
    }, []);

 
   
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteCoLLDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
       
    };

    const editProduct = (product) => {
        setColl({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (Coll) => {
        setColl(Coll);
        setDeleteProductDialog(true);
    };

    const deleteColl = () => {
        const collService = new CollService();
        collService.DeleteCole(coll.staffId).then(data => 
       { //setProducts(data)
            console.log(data);
          // setColl(emptyColl); 
           loadColl();
           setDeleteProductDialog(false);   
           toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
           
        })
        .catch(error => {
            console.error('Error:', error);
          });
        
        //let _products = products.filter((val) => val.id !== product.id);
        // setProducts(_products);
       
    };
    

   

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

  
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                  <Button label="Ajouter Un Collaborateur" icon="pi pi-plus" className="mr-2 mb-2" onClick={() => setVisible(true)} />
              { /*<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length}/> */ }
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

   // const imageBodyTemplate = (rowData) => {
      //  return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    //};

    const activeBodyTemplate = (rowData) => {
      
        if(rowData.active === true)
        return 'Oui';
        else
        return 'Non';
    };
     const lastloginBodyTemplate = (rowData) => {
        
        const Llogin = rowData.lastLogin[0]+'/'+rowData.lastLogin[1]+'/'+ rowData.lastLogin[2];
        return Llogin;
        
    };
   



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
               
               <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-button-outlined mr-2 mb-2"  onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Collaborateur</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Confirmer" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCoLLDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteColl} />
        </React.Fragment>
    );
 
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
           
                  <DataTable ref={dt} value={colls} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                    <Column field="firstName"   header="Prenom " sortable  ></Column>
                    <Column field="lastName"   header="Name" sortable  ></Column> 
                    <Column field="email" header="Email" sortable ></Column>
                    <Column field="lastLogin" header="Dernire Connexion "   body={lastloginBodyTemplate}></Column>
                    <Column field="active" header="Actif"  body={activeBodyTemplate}  ></Column>
                    <Column  header="Option"  body={actionBodyTemplate} exportable={false}></Column> 
                </DataTable>

            </div>  
          {  /*---------  Dialog Pour afficher page de l'ajout D'un Coll -------------- */}
            <Dialog header="Ajouter Profile" visible={visible} maximizable style={{ width: '70vw' }} onHide={() => {setVisible(false); loadColl()}}>
                      <AddColl/> 
             </Dialog>
           
           
            <Dialog visible={productDialog} style={{ width: '80rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Modifier Collaborateur" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
               
                <Form>
                           <label >Image profil</label>
                                            <Form.Group controlId="formBasicName">
                                                <Card style={{
                                                    width: '100%',
                                                    padding: '10px'
                                                }}><input
                                                        type="file"
                                                        id="upload-image"
                                                        name="upload-image"
                                                        accept="image/*"

                                                    /></Card>


                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}} >* </span>
                                            <label >Prénom</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="prenom" value={coll.firstName} name="prenom" type="text" required />

                                                   
                                                </div>
                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}}>* </span>

                                            <label >Nom</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText value={coll.lastName} id="nom" type="text" required />
                                                  
                                                </div>
                                            </Form.Group>
                                            <span className="required-field" style={{color : 'red'}}>* </span>
                                            <label >Email</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="email" type="text" value={coll.email} required />
                                                   
                                                </div>
                                            </Form.Group>
                                           
                                            <label >Télephone</label>
                                            <Form.Group controlId="formBasicName">
                                                <div className="p-inputgroup">
                                                    <InputText id="name1" type="text" value={coll.phoneNumber} />
                                                </div>
                                            </Form.Group>  
                                        </Form>
                                         </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteCoLLDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {coll && (
                        <span>
                            Are you sure you want to delete <b>{coll.firstName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            
        </div>
    );
}


export default Collaborateur;      