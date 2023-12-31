import { Accessor, Setter, Show } from 'solid-js';

const TextInput = (props: {
  accessor: Accessor<string | number | string[]>;
  class?: string;
  error?: string;
  full?: boolean;
  help?: string;
  isRequired?: boolean;
  label: string;
  placeholder?: string;
  setter: Setter<string | number | string[]> | ((value: string) => void);
  type?: 'text' | 'password' | 'email' | 'number';
}) => {
  return (
    <div class={props.class ?? ''}>
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <input
        type={props.type ?? 'text'}
        class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pri focus:border-pri block p-2.5 ${
          props.full ? 'w-full' : ''
        }`}
        placeholder={props.placeholder ?? ''}
        required={props.isRequired ?? false}
        value={props.accessor()}
        onInput={(e) => props.setter(e.currentTarget.value)}
      />
      <Show when={props.help}>
        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500">
          {props.help}
        </p>
      </Show>
      <Show when={props.error}>
        <p id="helper-text-explanation" class="mt-2 text-sm text-red-700">
          {props.error}
        </p>
      </Show>
    </div>
  );
};

export default TextInput;
