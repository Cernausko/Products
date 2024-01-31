import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { getProductById, uploadProduct, updateProduct } from '../../services/productService';

const AddProductForm = ({ show, handleClose, authToken, productIdToUpdate, requestUpdate}) => {

    const [formProductData, setFormProductData] = useState(
        {
            "Pavadinimas": '',
            "Kaina": '',
            "Nuotrauka": '',
            "description": ''
        }
    )

    const handleChange = (event) =>{
        if (event.target.name === 'Nuotrauka') {
            setFormProductData({
                ...formProductData,
                [event.target.name]: event.target.files[0]
                
            });
        }
        else{
            let { name, value } = event.target;
            setFormProductData({
            ...formProductData,
            [event.target.name]:value
        })
        }
        
    }

    useEffect(()=>{
        if(productIdToUpdate){
            getProductById(authToken, productIdToUpdate).then(data=>{
                let formData = {
                    "Pavadinimas": data.data.title,
                    "Kaina": data.data.price,
                    "Nuotrauka": data.data.image_url,
                    "description": data.data.description
                }
                setFormProductData(formData)
            })
        }
        else{
            setFormProductData({
                "Pavadinimas": '',
                "Kaina": '',
                "Nuotrauka": '',
                "description": ''
            })
        }
      }, [productIdToUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        if(productIdToUpdate){
            
            updateProduct(authToken, formProductData,productIdToUpdate).then(requestUpdate())
        }
        else{
            console.log("bando įkelti su šiuo kūnu:")
            console.log(formProductData)
            uploadProduct(authToken, formProductData).then(requestUpdate())
        }
        
        handleClose()
    };

    useEffect(()=>{

    },[formProductData])
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title className='overflow-auto text-center'>{productIdToUpdate ? "Atnaujinti produktą" : "Įkėlti produktą"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-auto'>
            <form className='form' onSubmit={submitHandler}>
                <div className="mb-3">
                    <input name="title" id="title" className="form-control" placeholder="Produkto pavadinimas" value={formProductData.title} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <input name="price" id="price" className="form-control" placeholder="Produkto kaina" value={formProductData.price} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    {formProductData.image?<img className='center' src={formProductData.image}></img>: <></>}
                    <input type='file' name="image" id="image" className="form-control" placeholder="Pridėkite nuotrauka" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <input name="description" id="description" className="form-control" placeholder="Produkto aprašymas" value={formProductData.description} onChange={handleChange}></input>
                </div>
                <div class="row justify-content-center">
                   <div class="col-auto">
                   <button className="btn btn-primary" type="submit">{productIdToUpdate? "Atnaujinti" : "Pridėti"}</button>
                   </div>
                </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

export default AddProductForm