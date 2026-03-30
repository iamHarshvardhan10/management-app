import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authSlice from './slices/authSlice.js'
import suggestionsSlice from './slices/suggestionSlice.js'
import usersSlice from './slices/userSlice.js'
import leaveSlice from './slices/leavesSlice.js'

const rootReducer = combineReducers({
    auth: authSlice,
    suggestions: suggestionsSlice,
    users: usersSlice,
    leave: leaveSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistor = persistStore(store)