import routesReducer, { initialState } from '../../reducers/routes';

describe('routes reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(routesReducer(initialState, { type: '_NULL' })).toMatchSnapshot();
  });
});
