import { ButtonProps } from './Button';

const NormalButton = (props: ButtonProps) => (
  <button
    class={`bg-pri hover:bg-pri-dark text-white font-bold py-2 px-4 rounded ${
      props.class ?? ''
    } ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
