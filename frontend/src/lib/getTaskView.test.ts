import {getTaskViewTree} from './getTaskView';
import {Task} from '../../../backend/common/Task';
import {Ok} from 'ts-results';
import {TaskView} from '../types/TaskView';
describe('endpoints', () => {
	it('non tree', () => {
		const tree = getTaskViewTree([
			new TaskView(new Task(1, 1)),
			new TaskView(new Task(2, 1)),
			new TaskView(new Task(3, 1)),
			new TaskView(new Task(4, 1)),
		]);

		expect(tree).toEqual(Ok([
			new TaskView(new Task(1, 1)),
			new TaskView(new Task(2, 1)),
			new TaskView(new Task(3, 1)),
			new TaskView(new Task(4, 1)),
		]));
	});

	it('one layer tree', () => {
		const tree = getTaskViewTree([
			new TaskView(new Task(1, 1)),
			new TaskView(new Task(2, 1, 'title2', '', false, '1')),
			new TaskView(new Task(3, 1)),
			new TaskView(new Task(4, 1, 'title4', '', false, '3')),
		]);

		expect(tree).toEqual(Ok([
			new TaskView(new Task(1, 1), [new TaskView(new Task(2, 1, 'title2', '', false, '1'))]),
			new TaskView(new Task(3, 1), [new TaskView(new Task(4, 1, 'title4', '', false, '3'))]),
		]));
	});

	it('multi layer tree', () => {
		const tasks = [
			new Task(1, 1),
			new Task(2, 1, 'title2', '', false, '1'),
			new Task(3, 1, 'title3', '', false, '1/2'),
			new Task(4, 1, 'title3', '', false, '1/2/3'),
		];

		const tree = getTaskViewTree(tasks.map(task => new TaskView(task)));
		if (tree.ok) {
			console.log(tree.val[0].children);
		}

		expect(tree.ok).toBeTruthy();
		expect(tree.val).toEqual([
			new TaskView(tasks[0],
				[new TaskView(tasks[1],
					[new TaskView(tasks[2],
						[new TaskView(tasks[3])],
					)],
				)],
			),
		]);
	});
});
