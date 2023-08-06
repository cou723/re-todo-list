import { Accessor, JSX, Setter } from 'solid-js';

const Select = (props: {
  class?: string;
  label: string;
  accessor?: Accessor<string>;
  setter: Setter<string> | ((value: string) => void);
  children: JSX.Element;
}) => {
  return (
    <div>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 "
      >
        {props.label}
      </label>
      <select
        class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pri focus:border-pri block p-2.5 ${
          props.class ?? ''
        }`}
        value={props.accessor ? props.accessor() : 'undefined'}
        onChange={(e) => props.setter(e.currentTarget.value)}
      >
        {props.children}
      </select>
    </div>
  );
};

export default Select;
