import { Accessor } from 'solid-js';

const Checkbox = (props: {
  isChecked: Accessor<boolean>;
  onClick: () => void;
}) => {
  return (
    <input
      type="checkbox"
      value={props.isChecked() ? 1 : 0}
      onClick={() => props.onClick()}
    />
  );
};

export default Checkbox;
