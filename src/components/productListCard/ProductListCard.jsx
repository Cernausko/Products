import { Link } from "react-router-dom"

const ProductListCard = (props)=>{
return (

<div className="col mb-5">
                <div className="card h-100">
                    <img className="card-img-top" src={props.productData.image_url} alt="Nėra produkto nuotraukos" />
                    <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder">{props.productData.title}</h5>
                            {props.productData.price} Kaina
                        </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><Link className="btn btn-primary mt-auto" to={`/product/${props.productData.id}`}>Apžvelgti</Link></div>
                    </div>
                </div>
            </div>
)}

export default ProductListCard