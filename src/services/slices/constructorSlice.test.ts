import {
  addIngredient,
  constructorReducer,
  moveIngredientDown,
  removeIngredient
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
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
};

const main1: TConstructorIngredient = {
  _id: 'main-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 11,
  fat: 3,
  carbohydrates: 6,
  calories: 180,
  price: 420,
  image: 'main-1.png',
  image_large: 'main-1-large.png',
  image_mobile: 'main-1-mobile.png',
  id: 'uuid-1'
};

const main2: TConstructorIngredient = {
  _id: 'main-2',
  name: 'Филе Люминесцентной тетрии',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'main-2.png',
  image_large: 'main-2-large.png',
  image_mobile: 'main-2-mobile.png',
  id: 'uuid-2'
};

describe('burgerConstructor reducer', () => {
  it('обрабатывает добавление ингредиента', () => {
    const withBun = constructorReducer(undefined, addIngredient(bun));
    const withMain = constructorReducer(withBun, addIngredient(main1));

    expect(withMain.bun).toEqual(bun);
    expect(withMain.ingredients).toEqual([main1]);
  });

  it('обрабатывает удаление ингредиента', () => {
    const stateWithItems = {
      bun,
      ingredients: [main1, main2]
    };

    const state = constructorReducer(
      stateWithItems,
      removeIngredient(main1.id)
    );

    expect(state.ingredients).toEqual([main2]);
  });

  it('обрабатывает изменение порядка начинок', () => {
    const stateWithItems = {
      bun,
      ingredients: [main1, main2]
    };

    const state = constructorReducer(stateWithItems, moveIngredientDown(0));

    expect(state.ingredients).toEqual([main2, main1]);
  });
});
