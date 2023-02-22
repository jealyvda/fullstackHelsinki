import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timer) => {
  return async dispatch => {
    dispatch(notification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer)
  }
}

export default notificationSlice.reducer