import { Accessor, Resource, Setter } from 'solid-js';
import TextInput from './util/TextInput';

const UsernameInput = (props: {
  value: Accessor<string>;
  setValue: Setter<string>;
  isDuplicateUsername?: Resource<boolean>;
}) => {
  return (
    <TextInput
      full
      label="Username"
      accessor={props.value}
      setter={props.setValue}
      placeholder="UserName10203"
      error={
        props.isDuplicateUsername
          ? props.isDuplicateUsername()
            ? 'ユーザー名が既に使われています。'
            : ''
          : undefined
      }
    />
  );
};

export default UsernameInput;
