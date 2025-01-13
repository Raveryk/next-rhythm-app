// import '../../App.css';
// import './form.css';
import styles from './Form.module.scss';
import FormButton from '../../components/FormButton/FormButton';
import { Gift, MoreVertical, Plus, RefreshCw, Save } from 'react-feather';
import { useForm } from './useForm';
import SavedList from '../SavedList/SavedList';
import Counter from '../Counter/Counter';

interface FormProps {
  canEditForm: boolean;
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCanEditGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({
  canEditForm,
  setCanEditForm,
  setCanEditGrid,
}) => {
  const {
    context,
    generateRandomPattern,
    savePattern,
    createPattern,
    resetPattern,
    handleSavedButtonClick,
    showSavedList,
  } = useForm(setCanEditForm, setCanEditGrid);

  const { beats, subs, rows, addMode, editMode, saveClicked } = context;

  return (
    <>
      <div className={styles.actionButtons}>
        {!addMode && !editMode && !saveClicked ? (
          <FormButton
            icon={<Plus size={18} />}
            name={'Create Pattern'}
            onClick={createPattern}
            disabled={false}
          />
        ) : (
          <FormButton
            icon={<Save size={18} />}
            disabled={!addMode && !editMode}
            name={'Save Pattern'}
            onClick={savePattern}
          />
        )}
        <FormButton
          disabled={!addMode && !editMode && !saveClicked}
          icon={<RefreshCw size={18} />}
          name={'Reset'}
          onClick={resetPattern}
        />
        <FormButton
          icon={<Gift size={18} />}
          name={'Random'}
          onClick={generateRandomPattern}
          disabled={false}
        />
        <FormButton
          icon={<MoreVertical size={18} />}
          name={'Saved List'}
          onClick={handleSavedButtonClick}
          disabled={false}
        />
      </div>
      {showSavedList && (
        <div className={styles.savedListKabobContainer}>
          <SavedList
            setCanEditGrid={setCanEditGrid}
            setCanEditForm={setCanEditForm}
          />
        </div>
      )}
      <div className={styles.counterGroupContainer}>
        <Counter
          disabled={!canEditForm}
          label="rows"
          state={rows}
          max={4}
          min={1}
        />
        <Counter
          disabled={!canEditForm}
          label="beats"
          state={beats}
          max={4}
          min={1}
        />
        <Counter
          disabled={!canEditForm}
          label="subs"
          state={subs}
          max={4}
          min={1}
        />
      </div>
    </>
  );
};

export default Form;
