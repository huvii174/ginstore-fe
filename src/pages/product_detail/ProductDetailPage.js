import React, { useEffect, useState } from "react";
import Category from "../../pages/product_detail/include/Category";
import Product from "../../pages/product_detail/include/Product";
import SimilarProduct from "../product_detail/include/SimilarProduct";
import ProductDescribe from "./include/ProductDescribe";
import Comment from "./include/Comment";
import { isWideScreen } from "../../helpers/screen";
import DetailHeader from "./include/mobile/DetailHeader";
import { useParams } from "react-router";
import productApi from "../../api/ProductService";
import HomeSuggest from "../home/include/HomeSuggest";
import {useDispatch} from "react-redux";
import {addItemProductId} from "../../store/locaStorageStore";

function ProductDetailPage() {

    let { id } = useParams();
    const [category, setCategory] = useState();
    const [categoryID, setCategoryId] = useState(null);
    const [products, setProducts] = useState();
    const [pro_price, setPro_Price] = useState();
    const [productSuggest, setProductSuggest] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const getProductsDetail = async () => {
        const response = await productApi.findById(id);
        if (response.status === 200) {
            setProducts(response.data);
            setCategory(response.data.category);
            setCategoryId(response.data.pro_category_id);
            setPro_Price(response.data.pro_price.toLocaleString())
            setLoading(false);
            dispatch(addItemProductId(response.data));
        }
    }

    const getProductByCategory = async () => {
        if (categoryID)
        {
            const response = await productApi.getListsProducts({
                category_id: products.pro_category_id,
                page_size: 18
            });
            if (response.status === 200) {
                setProductSuggest(response.data);
                console.log('---------------- r', response.data);
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductsDetail();
        getProductByCategory();
    }, [id, categoryID]);

    return (
        <main className={isWideScreen() ? 'desktop' : 'mobile'}>
            {isWideScreen() &&
                <>
                    <div className="container">
                        <Category category={category} products={products} />
                        <Product products={products} pro_price={pro_price} loading={loading}/>
                        <SimilarProduct  products={productSuggest}/>
                        <ProductDescribe products={products}/>
                        <Comment id={id} products={products}/>
                        <HomeSuggest />

                    </div>
                </>
            }

            {!isWideScreen() &&
                <>
                    <DetailHeader />
                    <Product products={products} pro_price={pro_price} loading={loading}/>
                    <ProductDescribe products={products}/>
                    <Comment id={id} products={products}/>
                    <HomeSuggest />
                    {/* <DetailFooter /> */}
                </>
            }
        </main>
    )
}

export default ProductDetailPage;
