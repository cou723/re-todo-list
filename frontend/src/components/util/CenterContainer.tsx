import { JSX } from 'solid-js';

const CenterContainer = (props: { children: JSX.Element; class?: string }) => (
  <div class={`px-0 md:px-24 lg:px-64 ${props.class ?? ''}`}>{props.children}</div>
);

export default CenterContainer;
