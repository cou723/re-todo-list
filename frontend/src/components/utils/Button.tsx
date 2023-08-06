import { JSX, Show } from 'solid-js';
import { Link } from '@solidjs/router';

const Button = (props: {
  class?: string;
  onClick?: () => void;
  children?: string | JSX.Element;
  disabled?: boolean;
  href?: string;
}) => {
  return (
    <Show
      when={props.href}
      fallback={
        <button
          class={`bg-pri hover:bg-pri-dark text-white font-bold py-2 px-4 rounded ${
            props.class
          } ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}}`}
          onClick={
            props.onClick ??
            (() => {
              console.log('click');
            })
          }
        >
          {props.children ?? 'ボタン'}
        </button>
      }
    >
      <Link
        class={`bg-pri hover:bg-pri-dark text-white font-bold py-2 px-4 rounded ${
          props.class
        } ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}}`}
        href={props.href!}
        style={{ display: 'inline-block' }}
      >
        {props.children ?? 'Link'}
      </Link>
    </Show>
  );
};

export default Button;
