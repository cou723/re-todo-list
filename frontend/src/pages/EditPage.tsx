import { useParams } from '@solidjs/router';
import { type Component } from 'solid-js';

const EditPage: Component = () => {
  const params = useParams();
  return <>Task Id: {params.id}</>;
};

export default EditPage;
