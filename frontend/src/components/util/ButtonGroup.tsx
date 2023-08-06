// import { JSX, For, createEffect, children } from 'solid-js';

// const ButtonGroup = (props: { children: JSX.Element[] }) => {
//   const c = children(() => props.children);
//   createEffect(() => {
//     return c().forEach((e, i) => {
//       if (i == 0) e.props.class = `${e.props.class} bg-pri-light`;
//       e.props.class = `${e.props.class} rounded-l-none`;
//     });
//   });
//   return <div class="inline-flex shadow">{c()}</div>;
// };

// export default ButtonGroup;
