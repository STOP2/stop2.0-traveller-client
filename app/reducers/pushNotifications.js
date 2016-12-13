import { SET_FCM_TOKEN } from '../actions/fcmActions';
import { RESET_STATE } from '../actions/resetStateAction';

export const initialState = { token: null };

const pushNotifications = (state = initialState, action) => {
  switch (action.type) {
    case SET_FCM_TOKEN:
      return Object.assign({}, state, { token: action.token });

    case RESET_STATE:
      return Object.assign({}, state, initialState);


    default:
      return state;
  }
};

export default pushNotifications;
