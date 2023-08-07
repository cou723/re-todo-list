import { Accessor } from 'solid-js';
import './Checkbox.css';

const Checkbox = (props: {
  isChecked: Accessor<boolean>;
  onClick: () => void;
}) => {
  return (
    <>
      <input
        type="checkbox"
        class="w-9 h-9 text-pri bg-gray-100 border-gray-300 rounded focus:ring-pri-light "
        checked={props.isChecked()}
        onClick={props.onClick}
      />
      <span class="checkmark" />
    </>
  );
};

export default Checkbox;
