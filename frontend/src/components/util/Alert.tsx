import { createSignal, JSX, Show } from 'solid-js';

const Alert = (props: {
  children: JSX.Element | string;
  class?: string;
  disabled?: boolean;
  onClose: any;
  variant?: 'normal' | 'error';
}) => {
  const [boxClass, setBoxClass] = createSignal('bg-red-100 border-red-400 text-red-700');
  const [textColorClass, setTextColorClass] = createSignal('text-red-500');
  // eslint-disable-next-line solid/reactivity
  if (props.variant !== 'error') {
    setBoxClass('bg-blue-100 border-blue-400 text-blue-700');
    setTextColorClass('text-blue-500');
  }

  return (
    <Show when={!props.disabled}>
      <div
        class={`border ${boxClass()} pl-4 pr-12 py-3 rounded relative ${props.class}`}
        role="alert"
      >
        <span class="block sm:inline">{props.children}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class={`fill-current h-6 w-6 ${textColorClass()}`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            // eslint-disable-next-line solid/reactivity
            onClick={props.onClose}
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </Show>
  );
};

export default Alert;
