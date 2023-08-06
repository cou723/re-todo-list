import { ButtonProps, getClass } from './Button';

const NormalButton = (props: ButtonProps) => (
  <button
    class={`${getClass(props.variant, props.class, props.disabled)}`}
    onClick={
      props.onClick ??
      (() => {
        console.log('click');
      })
    }
  >
    {props.children}
  </button>
);

export default NormalButton;
