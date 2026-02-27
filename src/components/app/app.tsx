import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import {
  Location,
  useLocation,
  useParams,
  Routes,
  Route
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '@selectors';
import { checkUserAuth, fetchIngredients } from '@slices';

const IngredientDetailsPage = () => (
  <div className={styles.detailPageWrap}>
    <h2 className={`${styles.detailHeader} text text_type_main-large mb-6`}>
      Детали ингредиента
    </h2>
    <IngredientDetails />
  </div>
);

const OrderInfoPage = () => {
  const { number } = useParams();

  return (
    <div className={styles.detailPageWrap}>
      {number && (
        <h2
          className={`${styles.detailHeader} text text_type_digits-default mb-10`}
        >
          #{String(number).padStart(6, '0')}
        </h2>
      )}
      <OrderInfo />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);

  const state = location.state as { background?: Location } | null;
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const closeModal = () => window.history.back();

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading && !ingredients.length ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='/ingredients/:id'
              element={<IngredientDetailsPage />}
            />
            <Route path='/feed/:number' element={<OrderInfoPage />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfoPage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Modal title='' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title='' onClose={closeModal}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
