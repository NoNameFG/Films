import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
//Reducers
import filmList from '../Reducers/filmList.js'


const allReducers = combineReducers({
  filmList
})

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
