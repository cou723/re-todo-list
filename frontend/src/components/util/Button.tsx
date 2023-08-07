import { JSX, Switch, Match } from 'solid-js';
import LinkButton from './LinkButton';
import NormalButton from './NormalButton';

export type ButtonProps = {
  variant?: 'primary' | 'danger' | 'outline-primary' | 'outline-danger';
  class?: string;
  onClick: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  outline?: boolean;
};

function isButtonProps(
  props: ButtonProps | LinkButtonProps,
): props is ButtonProps {
  return 'onClick' in props;
}

export type LinkButtonProps = {
  variant?: 'primary' | 'danger' | 'outline-primary' | 'outline-danger';
  class?: string;
  children: string | JSX.Element;
  disabled?: boolean;
  href: string;
  outline?: boolean;
};

function isLinkButtonProps(
  props: ButtonProps | LinkButtonProps,
): props is LinkButtonProps {
  return 'href' in props;
}

const Button = (props: ButtonProps | LinkButtonProps) => (
  <Switch>
    <Match when={isButtonProps(props)}>
      <NormalButton {...props}>{props.children}</NormalButton>
    </Match>
    <Match when={isLinkButtonProps(props)}>
      <LinkButton {...props}>{props.children}</LinkButton>
    </Match>
  </Switch>
);

export function getClass(
  variant: ButtonProps['variant'],
  classString?: string,
  disabled?: boolean,
): string {
  return `${getButtonColor(variant)} font-bold py-2 px-4 rounded-lg ${
    classString ?? ''
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} `;
}

export function getButtonColor(variant: ButtonProps['variant']): string {
  switch (variant) {
    case 'danger':
      return 'bg-red-500 hover:bg-red-700 text-white';
    case 'outline-danger':
      return 'bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white';
    case 'outline-primary':
      return 'bg-white text-pri border border-pri hover:bg-pri hover:text-white';
    default:
      return 'bg-pri hover:bg-pri-dark text-white';
  }
}

export default Button;
