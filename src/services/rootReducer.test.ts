import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние при UNKNOWN_ACTION', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderModalData: null,
        orderRequest: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      auth: {
        user: null,
        isLoading: false,
        error: null,
        updateUserError: null,
        isAuthChecked: false
      },
      orderInfo: {
        orderData: null,
        isLoading: false,
        error: null
      }
    });
  });
});
