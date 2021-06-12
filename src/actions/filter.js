import axios from 'axios'
import { ACTION_TYPES } from '../reducers/filter'

const addStore = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.addStore,
    payload: data,
  })
}
export const fetchFilters = (store) => async (dispatch) => {
  const { data: colors } = await axios.get('http://localhost:3000/colors')
  const { data: shapes } = await axios.get('http://localhost:3000/shapes')
  const { data: sizes } = await axios.get('http://localhost:3000/sizes')
  const { filters } = { ...store.getState().appStore }
  filters.Color = colors.map((c, i) => ({
    ...c,
    selected: filters.Color[i]?.selected,
  }))
  filters.Shape = shapes.map((c, i) => ({
    ...c,
    selected: filters.Shape[i]?.selected,
  }))
  filters.Size = sizes.map((c, i) => ({
    ...c,
    selected: filters.Size[i]?.selected,
  }))
  dispatch(addStore({ filters: { ...filters } }))
}

const getStatus = (filter, id) => {
  if (filter.selected && filter.id !== id) return true
  if (filter.id === id && filter.selected) {
    return false
  }

  return filter.id === id
}
export const updateFilter = (store, type, id) => async (dispatch) => {
  const { filters } = { ...store.getState().appStore }
  const updatedFilter = filters[type].map((filter) => ({
    ...filter,
    selected: getStatus(filter, id),
  }))
  dispatch(addStore({ filters: { ...filters, [type]: updatedFilter } }))
}

export default addStore