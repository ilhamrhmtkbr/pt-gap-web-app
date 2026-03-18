import {useState} from "react";
import {productService} from "../services/productService.js";

export const useProduct = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)

    const index = async (filters) => {
        setLoading(true)
        try {
            const {data} = await productService.index(filters)
            if (data) {
                setProducts(data)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const show = async (id) => {
        setLoading(true)
        try {
            const {data} = await productService.show(id)
            if (data) setProduct(data?.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return {index, show, loading, products, product, setProduct}
}