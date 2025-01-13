import { setSubArray } from '@/src/utilities/util';
import Label from '../Label/Label';
import { useGrid } from './useGrid';
import styles from './Grid.module.scss';
import FormButton from '../FormButton/FormButton';
import Cell from '../Cell/Cell';
import { Edit, Trash } from 'react-feather';

type GridProps = {
  canEditGrid: boolean;
  setCanEditGrid: (value: boolean) => void;
  setCanEditForm: (value: boolean) => void;
};

const Grid: React.FC<GridProps> = ({
  canEditGrid,
  setCanEditGrid,
  setCanEditForm,
}: GridProps) => {
  const {
    context,
    // dispatch,
    handleTitleChange,
    editItemClick,
    deleteItemClick,
  } = useGrid(setCanEditGrid, setCanEditForm);

  const {
    beats,
    subs,
    numOfCells,
    rows,
    patternTitle,
    clickedPatternId,
    hideGrid,
    editMode,
  } = context;

  const renderLabel = () => {
    const subDivArray = setSubArray(subs);

    const labelArr = [];
    for (let i = 0; i < beats; i++) {
      // display big beats
      labelArr.push(
        <Label
          canEditGrid={canEditGrid}
          label={`${i + 1}`}
          type="beat"
          key={i}
        />
      );

      for (let x = 0; x < subDivArray.length; x++) {
        // display sub divisions
        labelArr.push(
          <Label
            canEditGrid={canEditGrid}
            label={subDivArray[x]}
            type="sub"
            key={`${i}-${x}`}
          />
        );
      }
    }
    return labelArr;
  };

  const renderRows = () => {
    const rowArr = [];

    for (let i = 0; i < rows; i++) {
      rowArr.push(
        <div className={styles.gridRow} key={`${i + 1}`}>
          {renderCells(i + 1)}
        </div>
      );
    }

    return rowArr;
  };

  const renderCells = (rowIndex: number) => {
    const cellArr = [];
    for (let i = 0; i < numOfCells; i++) {
      cellArr.push(
        <Cell
          canEditGrid={canEditGrid}
          // dispatch={dispatch}
          className={`row-${rowIndex}`}
          id={`row-${rowIndex}-cell-${i + 1}`}
          key={`${rowIndex}-${i + 1}`}
        />
      );
    }
    return cellArr;
  };

  return (
    <>
      <section
        className={`${styles.rhythmGrid} ${hideGrid ? `${styles.hide}` : ''}`}
      >
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            {rows && (
              <input
                disabled={!canEditGrid}
                onChange={handleTitleChange}
                value={patternTitle}
                max="25"
                type="text"
                className={styles.gridTitleInput}
                placeholder="Title"
                required
              />
            )}
            {clickedPatternId && (
              <FormButton
                disabled={editMode}
                icon={<Edit size={18} />}
                name={'Edit'}
                onClick={editItemClick}
              />
            )}
            {clickedPatternId && (
              <FormButton
                icon={<Trash size={18} />}
                name={'Delete'}
                onClick={deleteItemClick}
              />
            )}
          </div>
        </div>
        <div className={styles.gridRow}>
          {rows && beats ? renderLabel() : <></>}
        </div>
        {renderRows()}
      </section>
    </>
  );
};

export default Grid;
