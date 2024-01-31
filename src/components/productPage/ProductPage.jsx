import { AppContext } from "../../context/AppContext"
import { useContext,useState,useEffect } from "react"
import { getProductById } from "../../services/productService";
import { useNavigate, useParams } from "react-router-dom";

function ProductPage() {
    const [productData, setProductData] = useState()
    let {id} = useParams()

    const {authToken} = useContext(AppContext);

    const navigate = useNavigate();
    useEffect(()=>{
        if(!authToken)
    {
        navigate('/login')
    }
    }, [authToken])

    useEffect(()=>{
        if(!productData)
        {
            getProductById(authToken, id).then(data=>setProductData(data))
        }
    }, [id])
    
    if(productData)
    {
        console.log(productData)
    }
  
    return (
        <section>
        <div className="container px-4 px-lg-5 my-5">
            {productData?
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6 card"><img className="card-img-top mb-5 mt-4 mb-md-4" src={productData.data.image_url} alt="Nėra nuoteraukos" /></div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bolder">{productData.data.title}</h1>
                    <div className="fs-5 mb-5">
                        <span>{productData.data.price} Kaina</span>
                    </div>
                    <p className="lead">{productData.data.description}</p>
                    <div className="d-flex">
                    </div>
                </div>
            </div>
            :
            <div>Kraunama...</div>
            }
        </div>
    </section>
    );
  }
  
  export default ProductPage;
  