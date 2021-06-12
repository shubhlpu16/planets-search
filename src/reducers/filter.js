// eslint-disable-next-line import/no-extraneous-dependencies
import produce from 'immer'

export const DEFAULT_STORE = {
  filters: {
    Color: [],
    Size: [],
    Shape: [],
  },
}

export const ACTION_TYPES = {
  addStore: 'addStore',
  updateFilterStore: 'updateFilterStore',
}

export default function storeAdd(state = DEFAULT_STORE, action) {
  switch (action.type) {
    case ACTION_TYPES.addStore: {
      const newState = produce(state, (draftState) => {
        const keysToUpdate = Object.keys(action.payload)
        keysToUpdate.forEach((key) => {
          draftState[key] = action.payload[key] //eslint-disable-line
        })
      })
      return newState
    }
    case ACTION_TYPES.updateFilterStore: {
      return { filters: action.payload }
    }

    default:
      return state
  }
}
