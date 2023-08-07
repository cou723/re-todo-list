import { Link } from '@solidjs/router';
import { ButtonProps, getClass } from './Button';

const LinkButton = (props: ButtonProps) => {
  return (
    <a
      class={`${getClass(props.variant, props.class, props.disabled)}`}
      href={props.href!}
      style={{
        display: 'inline-block',
        'pointer-events': props.disabled ? 'none' : 'auto',
      }}
    >
      {props.children}
    </a>
  );
};

export default LinkButton;
