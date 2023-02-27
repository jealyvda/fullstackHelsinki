import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "VOTE":
      return `You have voted on ${action.payload.anecdote.content}`
    case "CREATE":
      return `You have created a new note ${action.payload.newAnecdote.content}`
    case "ERROR":
      return `Too short anecdote, must have length 5 or more`
    default:
      return undefined
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, undefined)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContent = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}


export default NotificationContext