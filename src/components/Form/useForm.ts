import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getPatterns,
  saveNewPatternPOST,
  updatePattern,
} from '@/src/api/patterns-api.js';
import { AppDispatch, AppState, Pattern } from '@/src/types/types.js';
import {
  AppContext,
  AppDispatchContext,
} from '../../../src/contexts/AppContext';

interface UseFormReturn {
  context: AppState;
  dispatch: AppDispatch;
  // handleHHCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleBassDrumCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSnareDrumCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleBeatChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateRandomPattern: () => void;
  savePattern: (e: React.MouseEvent<HTMLButtonElement>) => void;
  createPattern: (e: React.MouseEvent<HTMLButtonElement>) => void;
  resetPattern: () => void;
  handleSavedButtonClick: () => void;
  showSavedList: boolean;
}

export const useForm = (
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>,
  setCanEditGrid: React.Dispatch<React.SetStateAction<boolean>>
): UseFormReturn => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const [showSavedList, setShowSavedList] = useState(false);

  const {
    beats,
    subs,
    rows,
    clickedIds,
    patternTitle,
    addMode,
    editMode,
    _id,
  } = context;

  // const handleBeatChange = () => {
  //   // const val = Number(event.target.value);
  //   dispatch({ type: 'SET_NUM_OF_CELLS' });
  //   // dispatch({ type: 'SET_BEATS', payload: val });
  // };

  // const handleSubChange = () => {
  //   // const val = Number(event.target.value);
  //   dispatch({ type: 'SET_NUM_OF_CELLS' });
  //   // dispatch({ type: 'SET_SUBS', payload: val });
  // };

  // const handleHHCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = event.target.checked;
  //   dispatch({ type: 'SET_HH', payload: val });
  // };

  // const handleBassDrumCheckBox = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const val = event.target.checked;
  //   dispatch({ type: 'SET_BD', payload: val });
  // };

  // const handleSnareDrumCheckBox = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const val = event.target.checked;
  //   dispatch({ type: 'SET_SD', payload: val });
  // };

  const createPattern = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCanEditGrid(true);
    setCanEditForm(false);

    dispatch({ type: 'ADD_MODE', payload: true });
  };

  const resetPattern = () => {
    setCanEditGrid(false);
    setCanEditForm(true);

    dispatch({ type: 'ADD_MODE', payload: false });
    dispatch({ type: 'EDIT_MODE', payload: false });
    dispatch({ type: 'RESET_PATTERN' });
  };

  const handleSavedButtonClick = () => {
    setShowSavedList(!showSavedList);
  };

  const generateRandomPattern = () => {
    const numArr = [1, 2, 3, 4];
    const min = 1;
    const max = 4;
    const beatsNum = numArr[Math.floor(Math.random() * (max - min) + min)];
    const subsNum = numArr[Math.floor(Math.random() * (max - min) + min)];
    const numOfCellsNum = beatsNum * subsNum;
    const rowsNum = numArr[Math.floor(Math.random() * (max - min) + min)];

    const clicksNum = Math.floor(Math.random() * (numOfCellsNum * rowsNum));

    const randomClickedIds: string[] = [];
    for (let i = 0; i < clicksNum; i++) {
      randomClickedIds.push(
        `row-${Math.floor(Math.random() * rowsNum + 1)}-cell-${Math.floor(
          Math.random() * numOfCellsNum + 1
        )}`
      );
    }

    dispatch({ type: 'RESET_PATTERN' });

    setTimeout(() => {
      dispatch({
        type: 'GENERATE_RANDOM',
        payload: {
          numOfCells: numOfCellsNum,
          beats: beatsNum,
          subs: subsNum,
          rows: rowsNum,
          clickedIds: randomClickedIds,
        },
      });
    }, 50);

    setCanEditGrid(true);
    setCanEditForm(false);

    dispatch({ type: 'ADD_MODE', payload: true });
  };

  const savePattern = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (addMode) {
      const newPattern: Pattern = {
        rows,
        beats,
        subs,
        numOfCells: beats * subs,
        clickedIds,
        patternTitle,
        _id: null,
      };

      if (patternTitle.length > 0) {
        saveNewPatternPOST(newPattern);

        getPatterns()
          .then((patterns: Pattern[]) => {
            dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
            dispatch({
              type: 'SET_CLICKED_PATTERN',
              payload: patterns[patterns.length - 1],
            });
            dispatch({ type: 'EDIT_MODE', payload: false });
            dispatch({ type: 'ADD_MODE', payload: false });
            dispatch({ type: 'SAVE_CLICKED', payload: true });
            setCanEditForm(false);
            setCanEditGrid(false);
          })
          .catch((error: unknown) => console.log(error));
      } else {
        toast.error('Pattern Title is Required!');
      }
    } else if (editMode) {
      const editedPattern: Pattern = {
        rows,
        beats,
        subs,
        numOfCells: beats * subs,
        clickedIds,
        patternTitle,
        _id,
      };

      if (patternTitle.length > 0) {
        updatePattern(_id, editedPattern);

        getPatterns()
          .then((patterns: Pattern[]) => {
            dispatch({ type: 'SET_INITIAL_PATTERNS', payload: patterns });
            dispatch({
              type: 'SET_CLICKED_PATTERN',
              payload:
                patterns[
                  patterns.findIndex((item) => Number(item._id) === Number(_id))
                ],
            });
            dispatch({ type: 'EDIT_MODE', payload: false });
            setCanEditForm(false);
            setCanEditGrid(false);
          })
          .catch((error: unknown) => console.log(error));
      } else {
        toast.error('Pattern Title is Required!');
      }
    }
  };

  return {
    context,
    dispatch,
    // handleHHCheckBox,
    // handleBassDrumCheckBox,
    // handleSnareDrumCheckBox,
    // handleBeatChange,
    // handleSubChange,
    generateRandomPattern,
    savePattern,
    createPattern,
    resetPattern,
    handleSavedButtonClick,
    showSavedList,
  };
};
