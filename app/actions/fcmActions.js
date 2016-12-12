export const SET_FCM_TOKEN = 'SET_FCM_TOKEN';

export const setFCMToken = function setFCMToken(token) {
  return {
    type: SET_FCM_TOKEN,
    token,
  };
};
