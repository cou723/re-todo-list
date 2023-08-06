import { JSX, Switch, Match } from 'solid-js';
import { Link } from '@solidjs/router';

const LinkButton = (props: {
  class?: string;
  onClick?: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  href: string;
  outline?: boolean;
}) => {
  return (
    <Link
      class={`bg-pri hover:bg-pri-dark text-white font-bold py-2 px-4 rounded ${
        props.class ?? ''
      } ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      href={props.href}
      style={{ display: 'inline-block' }}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
