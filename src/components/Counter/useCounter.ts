import { useContext } from 'react';
import { AppContext, AppDispatchContext } from '@/src/contexts/AppContext';

export const useCounter = () => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const handleIncrementClick = (type: string) => {
    switch (type) {
      case 'rows':
        dispatch({ type: 'SET_ROWS', payload: 'increment' });
        break;
      case 'beats':
        dispatch({ type: 'SET_BEATS', payload: 'increment' });
        dispatch({ type: 'SET_NUM_OF_CELLS' });
        break;
      case 'subs':
        dispatch({ type: 'SET_SUBS', payload: 'increment' });
        dispatch({ type: 'SET_NUM_OF_CELLS' });
        break;
      default:
        break;
    }
  };

  const handleDecrementClick = (type: string) => {
    switch (type) {
      case 'rows':
        dispatch({ type: 'SET_ROWS', payload: 'decrement' });
        break;
      case 'beats':
        dispatch({ type: 'SET_BEATS', payload: 'decrement' });
        dispatch({ type: 'SET_NUM_OF_CELLS' });
        break;
      case 'subs':
        dispatch({ type: 'SET_SUBS', payload: 'decrement' });
        dispatch({ type: 'SET_NUM_OF_CELLS' });
        break;
      default:
        break;
    }
  };

  return {
    context,
    handleIncrementClick,
    handleDecrementClick,
  };
};
