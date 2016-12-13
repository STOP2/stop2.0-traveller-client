import { resetState } from '../resetStateAction';

describe('reset state action', () => {
  it('creates a RESET_STATE action', () => {
    expect(resetState()).toMatchSnapshot();
  });
});
