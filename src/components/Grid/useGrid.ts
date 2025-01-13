import { Pattern } from '@/src/types/types.js';
// import { deletePattern, getPatterns } from '../../apis/pattern-apis.js';
// import { AppContext, AppDispatchContext } from '../../contexts/appContext.ts';
import { useContext } from 'react';
import {
  AppContext,
  AppDispatchContext,
} from '../../../src/contexts/AppContext';

export const useGrid = (
  setCanEditGrid: (arg0: boolean) => void,
  setCanEditForm: (arg0: boolean) => void
) => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const { clickedPatternId } = context;

  const handleTitleChange = (e: { target: { value: string } }) => {
    dispatch({ type: 'SET_TITLE', payload: e.target.value });
  };

  const deleteItemClick = () => {
    const id = clickedPatternId;

    deletePattern(id).then(() => {
      getPatterns()
        .then((patterns: Pattern[]) => {
          dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
        })
        .catch((error: unknown) => console.log(error));

      setTimeout(() => {
        dispatch({ type: 'RESET_PATTERN' });
        setCanEditForm(true);
        // dispatch({ type: 'HIDE_GRID', payload: true })
      }, 50);
    });
  };

  const editItemClick = () => {
    setCanEditForm(true);
    setCanEditGrid(true);

    dispatch({ type: 'EDIT_MODE', payload: true });
  };

  return {
    context,
    dispatch,
    handleTitleChange,
    deleteItemClick,
    editItemClick,
  };
};
