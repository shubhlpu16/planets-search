import axios from 'axios'
import { ACTION_TYPES } from '../reducers/filter'

const addStore = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.addStore,
    payload: data,
  })
}
export const fetchFilters = (store) => async (dispatch) => {
  const { data: colors } = await axios.get(
    'https://planet-server-api.herokuapp.com/colors',
  )
  const { data: shapes } = await axios.get(
    'https://planet-server-api.herokuapp.com/shapes',
  )
  const { data: sizes } = await axios.get(
    'https://planet-server-api.herokuapp.com/sizes',
  )
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
  const colorObject = {}
  colors.forEach((color) => {
    colorObject[color.id] = color.name
  })
  const shapeObject = {}
  shapes.forEach((shape) => {
    shapeObject[shape.id] = shape.name
  })

  dispatch(
    addStore({
      filters: { ...filters },
      colors: { ...colorObject },
      shapes: { ...shapeObject },
    }),
  )
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

export const getSearchResults = (store) => async (dispatch) => {
  const { filters, searchText } = { ...store.getState().appStore }

  let searchUrl = `https://planet-server-api.herokuapp.com/planets`
  if (searchText) {
    searchUrl = `${searchUrl}?q=${searchText}`
  } else {
    // Uncertain whether search will happen with or without entering
    // the text in search field for now I have enabled search when no text is entered
    // I have tried contacting the team

    searchUrl = `${searchUrl}?`
    // dispatch(addStore({ searchResults: [] }))
    // return
  }
  Object.keys(filters).forEach((key) => {
    filters[key].forEach((filter) => {
      if (filter.selected) {
        if (searchUrl.includes(key.toLowerCase())) {
          searchUrl = `${searchUrl},${filter.id}`
        } else {
          searchUrl = `${searchUrl}&${key.toLowerCase()}=${filter.id}`
        }
      }
    })
  })

  const { data } = await axios.get(searchUrl)
  dispatch(addStore({ searchResults: [...data] }))
}

export const handleSearchChange = (value) => (dispatch) => {
  dispatch(addStore({ searchText: value }))
}

export default addStore
