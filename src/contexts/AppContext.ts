import { createContext } from 'react';
import { AppDispatch, AppState } from '../types/types';

const initialState: AppState = {
  rows: 1,
  beats: 1,
  subs: 1,
  numOfCells: 1,
  clickedIds: [],
  patternTitle: '',
  patterns: [],
  clickedPatternId: null,
  hideGrid: false,
  editMode: false,
  addMode: false,
  saveClicked: false,
  _id: null,
};

const AppContext = createContext<AppState>(initialState);

const AppDispatchContext = createContext<AppDispatch>(() => {});

export { AppContext, AppDispatchContext, initialState };
