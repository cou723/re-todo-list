import { Link } from '@solidjs/router';
import { ButtonProps, getButtonColor, getClass } from './Button';

const LinkButton = (props: ButtonProps) => {
  return (
    <Link
      class={`${getClass(props.variant, props.class, props.disabled)}`}
      href={props.href!}
      style={{ display: 'inline-block' }}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
