import Alert from '@/components/utils/Alert';
import Button from '@/components/utils/Button';
// import ButtonGroup from '@/components/utils/ButtonGroup';
import { Component } from 'solid-js';

const ComponentPlayground: Component = () => {
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
    </div>
  );
};

export default ComponentPlayground;
