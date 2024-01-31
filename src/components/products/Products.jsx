import { useState } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";
import AddProductForm from "../addProductForm/AddProductForm";

function Products() {

const [isFormOpen, setIsFormOpen] = useState()
const [Products, setProducts] = useState()
const [productIdToUpdate, setProductIdToUpdate] = useState('')
const [updateRequest, setUpdateRequest] = useState('')

const {authToken} = useContext(AppContext);
const navigate = useNavigate();
const [showDisplayForm, setShowDisplayForm] = useState(false);
let {id} = useParams()

useEffect(()=>{
  if(!authToken){
    navigate('/login')
  }
}, [authToken])

useEffect(()=>{
  if(authToken){
     getProducts(authToken, id).then(data=>setProducts(data))
    
  }
}, [id, updateRequest])

  const handleCreateProduct = () =>{
    setProductIdToUpdate('')
    setShowDisplayForm(true);
  }

  const handleUpdateProduct = (productId) =>{
    setProductIdToUpdate(productId)
    setShowDisplayForm(true);

  }

  const requestUpdate = () =>{
    setUpdateRequest(!updateRequest)
  }

  const handleDeleteProduct = (productId) =>{
    deleteProduct(authToken, productId).then(getProducts(authToken, id).then(data=>setProducts(data)))
    requestUpdate()
  }

  const handleCloseDisplayForm = () => {
      setShowDisplayForm(false);
  };

return (
  <div className="container">
    <AddProductForm show={showDisplayForm} handleClose={handleCloseDisplayForm} authToken={authToken} productIdToUpdate={productIdToUpdate} requestUpdate ={requestUpdate}/>
  <div className="mt-3 ml-3">
    <button type="button" className="btn btn-primary" onClick={handleCreateProduct}>Pridėti produktą</button>
  </div>
  <div className="overflow-x-auto">
  <table className="table mt-3">
    <thead className="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Pavadinimas</th>
        <th scope="col">Aprašymas</th>
        <th scope="col">Kaina</th>
        <th scope="col">Atnaujinimai</th>
        <th scope="col">Ištrinimai</th>
      </tr>
    </thead>
    <tbody>
      {Products? 
        Products.data.data.map((productData)=>
        <tr key={productData.id}>
          <td>{productData.id}</td>
          <td>{productData.title}</td>
          <td className>{productData.description}</td>
          <td>{productData.price}</td>
          <td><button className="btn btn-primary active" onClick={() => {handleUpdateProduct(productData.id)}}>Atnaujinti</button></td>     
          <td><button className="btn btn-primary active" onClick={() => {handleDeleteProduct(productData.id)}}>Ištrinti</button></td>    
        </tr>)
        :
        <div>Kraunama...</div>
      }
    </tbody>
  </table>
  </div>
  </div>
  
);
}

export default Products;
