import {combineReducers} from 'redux';

import {Poemapp} from './Auth';
// import {getTrainerApis} from './Trainer';
import Slice from './Slice';
import {getMainApis} from './Main';
export default combineReducers({
  Slice,
  [Poemapp.reducerPath]: Poemapp.reducer,
  [getMainApis.reducerPath]: getMainApis.reducer,
});
