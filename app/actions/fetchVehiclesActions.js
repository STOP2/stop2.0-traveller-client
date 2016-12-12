import config from '../config/config'

export const REQUEST_VEHICLES = 'REQUEST_VEHICLES'
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES'
export const REQUEST_VEHICLES_ERROR = 'REQUEST_VEHICLES_ERROR'

const API_ENDPOINT = '/vehicles/beacons'

export let requestVehicles = function(beacons)
{
    return {
        type: REQUEST_VEHICLES,
        isFetching: true,
        beacons: beacons
    }
}

export let receiveVehicles = function(json)
{
    console.log('CALLING RECEIVE VEHICLES')
    console.log(json)
    return {
        type: RECEIVE_VEHICLES,
        isFetching: false,
        isReady: true,
        error: false,
        departures: json.stops
    }
}

export let requestVehiclesError = function()
{
    console.log('FETCH ERRORED')
    return {
        type: REQUEST_VEHICLES_ERROR,
        error: true
    }
}

export let fetchVehicles = function(beacons)
{
    return dispatch =>
    {
        console.log('DOING THE FETCH')
        console.log(JSON.stringify({beacons}))
        return fetch(config.API_URL + API_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({beacons})
            })
            .then(response =>
              {
                if (response.ok)
                {
                    return response.json()
                }
                else
                {
                    dispatch(requestVehiclesError())
                }
            })
            .then(json => dispatch(receiveVehicles(json)))
            .catch(error => dispatch(requestVehiclesError(error)))
    }
}
