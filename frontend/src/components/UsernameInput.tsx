import { Accessor, Setter } from 'solid-js';

import TextInput from './util/TextInput';

const UsernameInput = (props: {
  isDuplicateUsername?: boolean;
  setValue: Setter<string>;
  value: Accessor<string>;
}) => {
  return (
    <TextInput
      full
      label="Username"
      accessor={props.value}
      setter={props.setValue}
      placeholder="UserName10203"
      isRequired
      error={props.isDuplicateUsername ? 'ユーザー名が既に使われています。' : undefined}
    />
  );
};

export default UsernameInput;
