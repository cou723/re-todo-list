import { JSX, Switch, Match } from 'solid-js';
import LinkButton from './LinkButton';
import NormalButton from './NormalButton';

export type ButtonProps = {
  class?: string;
  onClick?: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  href: string;
  outline?: boolean;
};

const Button = (props: ButtonProps) => {
  return (
    <Switch>
      <Match when={props.href === undefined}>
        <NormalButton {...props}>{props.children}</NormalButton>
      </Match>
      <Match when={props.href}>
        <LinkButton {...props}>{props.children}</LinkButton>
      </Match>
    </Switch>
  );
};

export default Button;
