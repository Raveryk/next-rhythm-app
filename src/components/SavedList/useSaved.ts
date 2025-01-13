import {
  AppContext,
  AppDispatchContext,
} from '../../../src/contexts/AppContext';
import { deletePattern, getPatterns } from '@/src/api/patterns-api.js';
import { useContext, useEffect } from 'react';
import { Pattern } from '@/src/types/types.js';

export const useSaved = (
  setCanEditGrid: (arg0: boolean) => void,
  setCanEditForm: (arg0: boolean) => void
) => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const { patterns, editMode, saveClicked } = context;

  useEffect(() => {
    getPatterns().then((patterns: Pattern[]) => {
      dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
    });
  }, [saveClicked]);

  const savedItemClick = (id: string | null) => {
    if (!id) return;
    const pattern = patterns.filter((item) => Number(item._id) === Number(id));

    setCanEditForm(false);
    setCanEditGrid(false);

    dispatch({ type: 'RESET_PATTERN' });
    dispatch({ type: 'HIDE_GRID', payload: true });
    dispatch({ type: 'SAVE_CLICKED', payload: true });

    setTimeout(() => {
      dispatch({ type: 'ADD_MODE', payload: false });
      dispatch({ type: 'EDIT_MODE', payload: false });
      dispatch({ type: 'SET_PATTERN', payload: pattern[0] });
      dispatch({ type: 'SET_CLICKED_PATTERN', payload: pattern[0] });
      dispatch({ type: 'HIDE_GRID', payload: false });
      // dispatch({ type: 'SAVE_CLICKED', payload: false })
    }, 250);
  };

  // const deleteItemClick = (id) => {

  //     deletePattern(id).then(() => {
  //         getPatterns()
  //             .then(patterns => {
  //                 dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
  //             })
  //             .catch(error => console.log(error));

  //         setTimeout(() => {
  //             dispatch({ type: 'RESET_PATTERN' })
  //             setHideGrid(true)
  //         }, 50)
  //     })
  // }

  // const editItemClick = (e) => {
  //     // const pattern = patterns.filter(item => item.id == e.target.id)

  //     // dispatch({ type: 'SET_EDIT', payload: pattern });

  //     // setCanEditForm(true);
  //     // setCanEditGrid(true);

  //     // setHideGrid(true);
  //     // dispatch({ type: 'RESET_PATTERN' })

  //     // setTimeout(() => {
  //     //     dispatch({ type: 'SET_PATTERN', payload: pattern[0] })
  //     //     setHideGrid(false)
  //     // }, 50)
  // }

  return {
    patterns,
    editMode,
    savedItemClick,
    // deleteItemClick,
    // editItemClick,
  };
};
