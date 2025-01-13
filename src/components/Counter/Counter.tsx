// import '../../App.css';
// import './Counter.css';
import styles from './Counter.module.scss';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useCounter } from './useCounter';

interface CounterProps {
  disabled: boolean;
  label: string;
  state: number;
  max: number;
  min: number;
}

const Counter: React.FC<CounterProps> = ({
  disabled,
  label,
  state,
  max,
  min,
}) => {
  const { handleDecrementClick, handleIncrementClick } = useCounter();

  return (
    <>
      <div className={styles.counterContainer}>
        <label className={styles.counterLabels}>{label}</label>
        <button
          className={styles.counterButton}
          disabled={state >= max || disabled}
          onClick={() => handleIncrementClick(label)}
        >
          <ArrowUp />
        </button>
        <span className={styles.counterVal}>{state}</span>
        <button
          className={styles.counterButton}
          disabled={state <= min || disabled}
          onClick={() => handleDecrementClick(label)}
        >
          <ArrowDown />
        </button>
      </div>
    </>
  );
};

export default Counter;
