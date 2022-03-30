import { PRODUCTS } from '../types/index'

const initState = {
    all: []
};

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTS.ALL: return {...state, all: action.payload}
        default: return state
    }
}

export default productsReducer