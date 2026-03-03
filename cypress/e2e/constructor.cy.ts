describe('Страница конструктора бургера', () => {
  const bunName = 'Краторная булка N-200i';
  const mainName = 'Биокотлета из марсианской Магнолии';
  const sauceName = 'Соус Spicy-X';

  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('добавляет ингредиенты в конструктор', () => {
    cy.contains('[data-cy="ingredient-card"]', bunName)
      .contains('button', 'Добавить')
      .click();
    cy.contains('[data-cy="ingredient-card"]', mainName)
      .contains('button', 'Добавить')
      .click();
    cy.contains('[data-cy="ingredient-card"]', sauceName)
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains(`${bunName} (верх)`).should('exist');
      cy.contains(`${bunName} (низ)`).should('exist');
      cy.contains(mainName).should('exist');
      cy.contains(sauceName).should('exist');
    });
  });

  it('открывает и закрывает модальное окно ингредиента (крестик и оверлей)', () => {
    cy.contains('[data-cy="ingredient-card"]', mainName)
      .find('a')
      .click();

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('[data-cy="modal"]').contains(mainName).should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.contains('[data-cy="ingredient-card"]', mainName)
      .find('a')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    cy.setCookie('accessToken', 'Bearer test-access-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.reload();
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('[data-cy="ingredient-card"]', bunName)
      .contains('button', 'Добавить')
      .click();
    cy.contains('[data-cy="ingredient-card"]', mainName)
      .contains('button', 'Добавить')
      .click();

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('123456').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Выберите булки').should('have.length.at.least', 1);
      cy.contains('Выберите начинку').should('be.visible');
    });

  });
});
