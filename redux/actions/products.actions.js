import { PRODUCTS } from "../types"

const allProducts = (products) => {
    return {type: PRODUCTS.ALL, payload: products}
}

export {
    allProducts
}