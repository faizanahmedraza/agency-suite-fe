// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import dataTables from '@src/views/tables/data-tables/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  dataTables,
}

export default rootReducer
