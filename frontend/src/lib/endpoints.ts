const debugEndpointDomain = 'localhost:8000';
// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const endpointBase = 'https://' + (import.meta.env.VITE_ENDPOINT ?? debugEndpointDomain);

const endpointsService = {
	login: endpointBase + '/login',
	logout: endpointBase + '/logout',
	register: endpointBase + '/register',
	user: endpointBase + '/user',
};

const taskEndpointBase = '/task';

const endpointsTasks = {
	base: taskEndpointBase,
	list: taskEndpointBase + '/list',
	get: (id: number) => `${taskEndpointBase}/${id}`,
	done: (id: number) => `${taskEndpointBase}/${id}/done`,
	undone: (id: number) => `${taskEndpointBase}/${id}/undone`,
	parent: (id: number) => `${taskEndpointBase}/${id}/parent`,
};

const endpoints = {...endpointsService, task: {...endpointsTasks}};

export default endpoints;
