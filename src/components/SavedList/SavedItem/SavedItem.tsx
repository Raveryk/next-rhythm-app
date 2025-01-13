// import '../../App.css';
import { useSaved } from '../useSaved';

interface SavedItemProps {
  savedItem: string;
  id: string | null;
  setCanEditGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavedItem: React.FC<SavedItemProps> = ({
  savedItem,
  id,
  setCanEditGrid,
  setCanEditForm,
}) => {
  const { savedItemClick } = useSaved(setCanEditGrid, setCanEditForm);

  return (
    <>
      <li onClick={() => savedItemClick(id)}>
        {savedItem}
        {/* <button disabled={editMode} onClick={() => editItemClick(id)}>Edit</button>
                <button onClick={() => deleteItemClick(id)}>Delete</button> */}
      </li>
    </>
  );
};

export default SavedItem;
