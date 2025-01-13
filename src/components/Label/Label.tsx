// import '../../App.css';
import './Label.css';

interface LabelProps {
  label: string;
  type: 'beat' | 'sub';
  canEditGrid: boolean;
}

function Label({ label, type, canEditGrid }: LabelProps) {
  return (
    <>
      <div
        className={`${type === 'beat' ? `beatLabel label` : 'subLabel label'} ${
          canEditGrid ? '' : 'disabled'
        }`}
      >
        {label}
      </div>
    </>
  );
}

export default Label;
