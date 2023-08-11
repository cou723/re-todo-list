import { Accessor, JSX, Setter } from 'solid-js';

const Select = (props: {
  accessor?: Accessor<string>;
  children: JSX.Element;
  class?: string;
  label: string;
  setter: Setter<string> | ((value: string) => void);
}) => {
  return (
    <div>
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">
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
