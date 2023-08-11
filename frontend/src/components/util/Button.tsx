import { JSX, Switch, Match } from 'solid-js';

import LinkButton from './LinkButton';
import NormalButton from './NormalButton';

export type ButtonProps = {
  children: string | JSX.Element;
  class?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  outline?: boolean;
  variant?: 'primary' | 'danger' | 'outline-primary' | 'outline-danger';
};

function isButtonProps(props: ButtonProps): props is ButtonProps {
  return 'onClick' in props;
}

// ButtonPropsはLinkButtonPropsとNormalButtonPropsで別の型にしてユニオン型にしたかったが、solidjsのMatchでwhen式にis typeの型を充てても認識しなかったため、このような実装になっている。
const Button = (props: ButtonProps) => (
  <Switch>
    <Match when={isButtonProps(props)}>
      <NormalButton {...props}>{props.children}</NormalButton>
    </Match>
    <Match when={true}>
      <LinkButton {...props}>{props.children}</LinkButton>
    </Match>
  </Switch>
);

export function getClass(
  variant: ButtonProps['variant'],
  classString?: string,
  disabled?: boolean,
): string {
  return `${getButtonColor(variant)} font-bold py-2 px-4 rounded-lg ${classString ?? ''} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } `;
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
