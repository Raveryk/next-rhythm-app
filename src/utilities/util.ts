import { EIGHTH_SUB, TRIPLET_SUB, SIXTEENTH_SUB } from './constants';

export const setSubArray = (subs: number) => {
  const subDiv = [];
  switch (subs.toString()) {
    case '1':
      break;
    case '2':
      subDiv.push(...EIGHTH_SUB);
      break;
    case '3':
      subDiv.push(...TRIPLET_SUB);
      break;
    case '4':
      subDiv.push(...SIXTEENTH_SUB);
      break;
    default:
      break;
  }
  return subDiv;
};
