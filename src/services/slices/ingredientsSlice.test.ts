import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const ingredientsMock: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  }
];

describe('ingredients reducer async actions', () => {
  it('обрабатывает action запроса (pending)', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает action успеха (fulfilled)', () => {
    const loadingState = {
      items: [],
      isLoading: true,
      error: null
    };

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.fulfilled(ingredientsMock, 'request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredientsMock);
  });

  it('обрабатывает action ошибки (rejected)', () => {
    const loadingState = {
      items: [],
      isLoading: true,
      error: null
    };

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.rejected(new Error('Ошибка запроса'), 'request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка запроса');
  });
});
