import mockStore from 'redux-mock-store';

import { cancelStopRequest, stopRequestCancellationError } from '../cancelStopRequest';

const store = mockStore();

beforeEach(() => {
  store.clearActions();
});

describe('cancelStopRequest actions', () => {
  it('should handle STOPREQUEST_FROM_CANCELLATION_ERROR action', () => {
    expect(stopRequestCancellationError(true, true)).toMatchSnapshot();
  });

  it('should handle STOPREQUEST_DESTINATION_CANCELLATION_ERROR action', () => {
    expect(stopRequestCancellationError(false, true)).toMatchSnapshot();
  });

  it('should handle SEND_STOPREQUEST_FROM_CANCELLATION action', async () => {
    const response = '';

    fetch.mockResponseSuccess(response);

    await store.dispatch(cancelStopRequest(123, true));

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle SEND_STOPREQUEST_DESTINATION_CANCELLATION action', async () => {
    const response = '';

    fetch.mockResponseSuccess(response);

    await store.dispatch(cancelStopRequest(123, false));

    expect(store.getActions()).toMatchSnapshot();
  });
});
