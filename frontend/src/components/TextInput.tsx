import { Form } from 'solid-bootstrap';

const TextInput = (props: {
  label: string;
  value: any;
  setValue: any;
  type?: string;
  placeholder?: string;
}) => (
  <Form.Group class="mb-3" controlId="formBasicEmail">
    <Form.Label>{props.label}</Form.Label>
    <Form.Control
      type={props.type ?? 'text'}
      placeholder={props.placeholder ?? props.label}
      value={props.value()}
      onInput={(e) => props.setValue(e.currentTarget.value)}
    />
  </Form.Group>
);

export default TextInput;
