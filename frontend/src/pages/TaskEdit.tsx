import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const TaskEdit: Component = () => {
    const params = useParams();
    return <>Task Id: {params.id}</>;
}

export default TaskEdit;