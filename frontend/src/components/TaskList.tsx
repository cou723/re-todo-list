import {For} from 'solid-js';
import {Button, Card, Stack} from 'solid-bootstrap';
import {type ITask} from '../../../backend/common/Task';
import {type ITaskView} from '../types/TaskView';
import {Task} from './Task';

const TaskList = (props: {tasks: ITaskView[]}) =>
	<Stack>
		<For each={props.tasks}>{task => <Task task={task}/>}</For>
	</Stack>;

export default TaskList;
