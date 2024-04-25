import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import userReducer from "./Slices/UserSlices"


const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
   
})

const persistedReducer = persistReducer(persistConfig,  rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
    }),
});




export default store
export const persistor = persistStore(store)