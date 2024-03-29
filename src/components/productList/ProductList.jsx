import ProductListCard from "../productListCard/ProductListCard"
import { getProductPage } from "../../services/productService"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Pages from "../pages/Pages"

const ProductList = ()=>{
    let {id} = useParams()
    const [pageData, setPageData] = useState()
    
    if(!id){
        id = 1
    }
    
    useEffect(()=>{
        getProductPage(id).then(data=>setPageData(data))
    }, [id])
    
    return (
    <section className="py-5">
    <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {pageData? 
                pageData.data.data.map((productData)=>
                    <ProductListCard key = {productData.id} productData = {productData}/>
                )
                :
                <div>Kraunama...</div>
            }
        </div>
        {pageData?
        <Pages pageAmount = {pageData.data.last_page} currentPage = {id} linkWord = {'products'}/>
        :
        <div>Kraunama...</div>
        }
    </div>
</section>

    )
}

export default ProductList