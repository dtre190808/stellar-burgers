import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectProfileOrders, selectProfileOrdersLoading } from '@selectors';
import { fetchProfileOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());

    const timerId = window.setInterval(() => {
      dispatch(fetchProfileOrders());
    }, 5000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
