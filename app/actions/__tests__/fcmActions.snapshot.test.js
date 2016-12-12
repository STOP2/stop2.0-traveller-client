import { setFCMToken } from '../fcmActions';

describe('fcm actions', () => {
  it('creates a SET_FCM_TOKEN action', () => {
    expect(setFCMToken(12345)).toMatchSnapshot();
  });
});
