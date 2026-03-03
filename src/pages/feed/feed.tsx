import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeed, selectFeedOrders } from '@selectors';
import { fetchFeeds } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const { isLoading } = useSelector(selectFeed);

  useEffect(() => {
    dispatch(fetchFeeds());

    const timerId = window.setInterval(() => {
      dispatch(fetchFeeds());
    }, 5000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
