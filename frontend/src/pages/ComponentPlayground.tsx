import Alert from '@/components/utils/Alert';
import Button from '@/components/utils/Button';
import Select from '@/components/utils/Select';
import TextInput from '@/components/utils/TextInput';
// import ButtonGroup from '@/components/utils/ButtonGroup';
import { Component, createSignal } from 'solid-js';

const ComponentPlayground: Component = () => {
  const [test, setTest] = createSignal('test');
  return (
    <div class="p-5">
      <Button
        onClick={() => {
          console.log('click');
        }}
        class="m-2"
      >
        ボタン
      </Button>
      <Button
        onClick={() => {
          console.log('click');
        }}
        class="m-2"
        href="/"
      >
        href
      </Button>
      <Alert variant="error" class="m-2" onClose={() => console.log('close')}>
        error
      </Alert>
      <Alert variant="normal" class="m-2" onClose={() => console.log('close')}>
        normal
      </Alert>
      {/* <ButtonGroup>
        <Button />
        <Button />
        <Button />
      </ButtonGroup> */}
      <TextInput class="m-2" label="test" accessor={test} setter={setTest} />
      <Select class="m-2" label="test" accessor={test} setter={setTest}>
        <option value="test">test</option>
        <option value="test2">test2</option>
      </Select>
    </div>
  );
};

export default ComponentPlayground;
