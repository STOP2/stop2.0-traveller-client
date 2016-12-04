import { SET_FCM_TOKEN } from '../actions/fcmActions'

export let initialState = {token: null}

const pushNotifications = (state = initialState, action) =>
{
    switch (action.type)
  {
    case SET_FCM_TOKEN:
        return Object.assign({}, state, {token: action.token})

    default:
        return state
    }
}

export default pushNotifications
