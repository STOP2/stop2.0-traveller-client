export const SET_LOCATION = 'SET_LOCATION'

export let setLocation = function(locationData)
{
    return {
        type: SET_LOCATION,
        locationData: locationData
    }
}
