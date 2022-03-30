import { createStore } from 'redux'

import rootReducer from '../index'

const configStore = () => {
    const store = createStore(
        rootReducer,
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}

export default configStore