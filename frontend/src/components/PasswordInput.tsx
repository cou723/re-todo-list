import TextInput from './util/TextInput';

const PasswordInput = (props: { accessor: any; setter: any }) => (
  <TextInput
    full
    label="Password"
    accessor={props.accessor}
    setter={props.setter}
    type="password"
    placeholder="**********"
  />
);

export default PasswordInput;
