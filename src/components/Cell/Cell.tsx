// import '../../App.css';
import './Cell.css';
import { useCell } from './useCell';

interface CellProps {
  id: string;
  canEditGrid: boolean;
  className: string;
}

const Cell: React.FC<CellProps> = ({ id, canEditGrid, className }) => {
  const { handleCellClick, cellClick } = useCell(id, canEditGrid);

  return (
    <>
      <div
        id={id}
        onClick={handleCellClick}
        className={
          cellClick
            ? `gridSquare ${canEditGrid ? className : `${className} disabled`}`
            : `gridSquare ${canEditGrid ? '' : 'disabled'}`
        }
      ></div>
    </>
  );
};

export default Cell;
