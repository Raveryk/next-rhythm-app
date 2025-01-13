import { AppContext, AppDispatchContext } from '@/src/contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

export const useCell = (id: string, canEditGrid: boolean) => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [cellClick, setCellClick] = useState(false);

  const { clickedIds } = context || { clickedIds: [] };

  useEffect(() => {
    if (context) {
      setCellClick(context.clickedIds.includes(id));
    }
  }, [clickedIds, context, id]);

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (canEditGrid && dispatch) {
      if (cellClick) {
        dispatch({ type: 'REMOVE_ID', payload: event.currentTarget.id });
      } else {
        dispatch({ type: 'ADD_ID', payload: event.currentTarget.id });
      }
      setCellClick(!cellClick);
    }
  };

  return {
    context,
    cellClick,
    handleCellClick,
  };
};
