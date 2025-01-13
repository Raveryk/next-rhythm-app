// import '../../App.css';
// import { getPatterns } from '../../apis/pattern-apis';
// import FormButton from '../../components/FormButton/FormButton';
// import { MoreVertical } from 'react-feather';
import SavedItem from './SavedItem/SavedItem';
import { useSaved } from './useSaved';

interface SavedListProps {
  setCanEditGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavedList: React.FC<SavedListProps> = ({
  setCanEditGrid,
  setCanEditForm,
}) => {
  const { patterns } = useSaved(setCanEditGrid, setCanEditForm);

  return (
    <>
      {patterns && patterns.length > 0 && (
        <ul>
          {patterns.map((item) => (
            <SavedItem
              savedItem={item.patternTitle}
              setCanEditGrid={setCanEditGrid}
              setCanEditForm={setCanEditForm}
              id={item._id}
              key={item._id}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedList;
