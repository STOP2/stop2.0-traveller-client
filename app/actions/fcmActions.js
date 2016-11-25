export const SET_FCM_TOKEN = 'SET_FCM_TOKEN'

export let setFCMToken = function(token)
{
    return {
        type: SET_FCM_TOKEN,
        token: token
    }
}
