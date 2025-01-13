// import '../../App.css';
import styles from './FormButton.module.scss';
import React from 'react';

interface FormButtonProps {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  name,
  onClick,
  icon,
  disabled,
}) => {
  return (
    <button
      aria-label={name}
      name={name}
      disabled={disabled ? disabled : false}
      className={styles.formButton}
      onClick={onClick}
    >
      {icon ? icon : name}
    </button>
  );
};

export default FormButton;
