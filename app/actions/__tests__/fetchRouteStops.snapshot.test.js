import mockStore from 'redux-mock-store'

import { fetchRouteStops } from '../fetchRouteStops'

const store = mockStore()

beforeEach(() =>
{
    store.clearActions()
})

describe('fetchRouteStops actions', () =>
{
    it('should handle REQUEST_ROUTE_STOPS action', async() =>
    {
        const response = '{"stops": [{"stop": {"arrives_in": 4, "stop_code": 3028, "stop_id":"HSL:1240118", "stop_name":"Kumpulan kampus"}}]}'

        fetch.mockResponseSuccess(response)

        await store.dispatch(fetchRouteStops('HSL:1240118', '1234', false))

        expect(store.getActions()).toMatchSnapshot()
    })
})
