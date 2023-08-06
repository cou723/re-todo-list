const Title = (props: { children: string; class: string }) => (
  <h1 class={`text-3xl font-bold ${props.class ?? ''}`}>{props.children}</h1>
);

export default Title;
