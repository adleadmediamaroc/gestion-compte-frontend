// import { FileUpload } from 'primereact/fileupload';
//import { Rating } from 'primereact/rating';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';



import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RoleService } from '../../service/RoleService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
//import { Tag } from 'primereact/tag';
import AddRole from './AddRole';
//import UpdatRoll from './UpdatRole'
import UpdatRoll from './UpdatRoll'

 function Crud() {

    /*****************/
    
    /*****************/
    let emptyProduct = {
        roleId: null,
        roleName : '' 
    };
    const [visible, setVisible ]= useState(false);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
   
    const [product, setProduct] = useState(emptyProduct);


    const [selectedProducts, setSelectedProducts] = useState(null);
  
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    
       const loadRoles =() =>{
        const roleService = new RoleService();
        roleService.getRoles().then(data => 
            {setProducts(data)
            console.log(data);
            })
      };
       useEffect(() => {
         loadRoles();
     }, []);


      const cree = ()=>{
            loadRoles();    
      };


    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
   // delete product
    const deleteProduct = () => {
        const roleService = new RoleService();
        roleService.DeleteRole(product.roleId).then(data => 
       { //setProducts(data)
            console.log(data);
           setProduct(emptyProduct); 
            loadRoles();
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

  

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                  <Button label="Ajout  Rôle" icon="pi pi-plus" className="mr-2 mb-2" onClick={() => setVisible(true)} />
              { /*<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length}/> */ }
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
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
            <span className="p-input-icon-left search-input" style={{ textAlign: 'right' }}>
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
   
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
  

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            
                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Rolls" globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                  
                    <Column field="roleName" header="Role" sortable style={{ minWidth: '20rem' }}></Column>
                    <Column  header="Option"  body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                   
                </DataTable>
            </div>  
          {  /*---------  Dialog Pour afficher l'ajout D'un Roll -------------- */}
            <Dialog header="Ajouter Role" visible={visible} maximizable style={{ width: '70vw' }} onHide={() => {setVisible(false); cree(); }    } >
                      <AddRole/> 
             </Dialog>

             {  /*---------  Dialog Pour fair l'update   D'un Roll -------------- */}
            <Dialog visible={productDialog}  maximizable style={{ width: '70vw' }} onHide={() => {setProductDialog(false); cree();}}>
                 <UpdatRoll role={product}/>
             
            </Dialog>
            
            {  /*---------  Dialog Pour afficher Suppri D'un Roll -------------- */}
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                          Êtes-vous sûr que vous voulez supprimer <b>{product.roleName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            
        </div>
    );
}


export default Crud;      