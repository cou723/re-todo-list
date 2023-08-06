import { Accessor } from 'solid-js';

const Checkbox = (props: {
  isChecked: Accessor<boolean>;
  onClick: () => void;
}) => {
  return (
    <input
      type="checkbox"
      checked={props.isChecked()}
      onClick={props.onClick}
    />
  );
};

export default Checkbox;
