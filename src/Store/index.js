import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import allreducers from './../Store/Reducers';
import {Poemapp} from './Auth';
import {getMainApis} from './Main';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  blacklist: [Poemapp.reducerPath, getMainApis.reducerPath],
};

const rootReducer = (state, action) => {
  return allreducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Poemapp.middleware, getMainApis.middleware),
});

export const persistor = persistStore(Store);
