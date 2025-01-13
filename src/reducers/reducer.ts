import { Action, AppState } from '../types/types';

export const initialState: AppState = {
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

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'SET_ROWS':
      return action.payload === 'increment'
        ? { ...state, rows: state.rows++ }
        : { ...state, rows: state.rows-- };
    case 'SET_BEATS':
      return action.payload === 'increment'
        ? { ...state, beats: state.beats++ }
        : { ...state, beats: state.beats-- };
    case 'SET_SUBS':
      return action.payload === 'increment'
        ? { ...state, subs: state.subs++ }
        : { ...state, subs: state.subs-- };
    case 'SET_NUM_OF_CELLS':
      return { ...state, numOfCells: state.beats * state.subs };
    case 'GENERATE_RANDOM':
      if (typeof action.payload === 'object' && action.payload !== null) {
        return { ...state, ...action.payload };
      }
      throw new Error('Payload must be an object');
    case 'SET_TITLE':
      if (typeof action.payload === 'string' && action.payload !== null) {
        return { ...state, patternTitle: action.payload };
      }
      throw new Error('Payload must be a string');
    case 'ADD_ID':
      if (typeof action.payload === 'string' && action.payload !== null) {
        return { ...state, clickedIds: [...state.clickedIds, action.payload] };
      }
      throw new Error('Payload must be a string');
    case 'REMOVE_ID':
      const clickedIds = state.clickedIds.filter(
        (item) => item !== action.payload
      );
      return { ...state, clickedIds: [...clickedIds] };
    case 'SET_INITIAL_PATTERNS':
      if (Array.isArray(action.payload) && action.payload !== null) {
        return { ...state, patterns: action.payload };
      }
    case 'SET_PATTERN':
      if (typeof action.payload === 'object' && action.payload !== null) {
        return { ...state, ...action.payload };
      }
      throw new Error('Payload must be an object');
    case 'RESET_PATTERN':
      return {
        rows: 1,
        beats: 1,
        subs: 1,
        numOfCells: 1,
        clickedIds: [],
        patternTitle: '',
        patterns: state.patterns,
        clickedPatternId: null,
        hideGrid: false,
        editMode: false,
        addMode: false,
        saveClicked: false,
      };
    case 'SET_CLICKED_PATTERN':
      if (typeof action.payload === 'object' && action.payload !== null) {
        return { ...state, clickedPatternId: action.payload._id };
      }
    case 'ADD_MODE':
      if (typeof action.payload === 'boolean' && action.payload !== null) {
        return { ...state, addMode: action.payload };
      }
    case 'HIDE_GRID':
      if (typeof action.payload === 'boolean' && action.payload !== null) {
        return { ...state, hideGrid: action.payload };
      }
    case 'EDIT_MODE':
      if (typeof action.payload === 'boolean' && action.payload !== null) {
        return { ...state, editMode: action.payload };
      }
    case 'SAVE_CLICKED':
      if (typeof action.payload === 'boolean' && action.payload !== null) {
        return { ...state, saveClicked: action.payload };
      }
    default:
      throw new Error('Error Dispatching...');
  }
};
