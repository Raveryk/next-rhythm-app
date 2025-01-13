import React from 'react';

export type Pattern = {
  _id: string | null;
  // title: string;
  rows: number;
  beats: number;
  subs: number;
  cells?: Array<string>;
  numOfCells: number;
  clickedIds: Array<string>;
  patternTitle: string;
};

export interface AppState {
  rows: number;
  beats: number;
  subs: number;
  numOfCells: number;
  clickedIds: Array<string>;
  patternTitle: string;
  patterns: Array<Pattern>;
  clickedPatternId: string | number | null | undefined;
  hideGrid: boolean;
  editMode: boolean;
  addMode: boolean;
  saveClicked: boolean;
  _id: string | null;
}

export type Action =
  | { type: 'SET_ROWS'; payload: 'increment' | 'decrement' }
  | { type: 'SET_BEATS'; payload: 'increment' | 'decrement' }
  | { type: 'SET_SUBS'; payload: 'increment' | 'decrement' }
  | { type: 'SET_NUM_OF_CELLS' }
  | { type: 'GENERATE_RANDOM'; payload: Partial<AppState> }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'ADD_ID'; payload: string }
  | { type: 'REMOVE_ID'; payload: string }
  | { type: 'SET_INITIAL_PATTERNS'; payload: Pattern[] }
  | { type: 'SET_PATTERN'; payload: Partial<AppState> }
  | { type: 'RESET_PATTERN' }
  | { type: 'SET_CLICKED_PATTERN'; payload: Pattern }
  | { type: 'ADD_MODE'; payload: boolean }
  | { type: 'HIDE_GRID'; payload: boolean }
  | { type: 'EDIT_MODE'; payload: boolean }
  | { type: 'SAVE_CLICKED'; payload: boolean };

export type AppDispatch = React.Dispatch<Action>;
