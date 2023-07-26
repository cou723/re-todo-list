const debugEndpointDomain = 'localhost:8080';
// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const endpointBase = 'https://' + (import.meta.env.VITE_ENDPOINT ?? debugEndpointDomain);

const endpointsService = {
	login: endpointBase + '/login',
	logout: endpointBase + '/logout',
	register: endpointBase + '/register',
	user: endpointBase + '/user',
	task: endpointBase + '/task',
};

const endpointsTasks = {
	list: endpointsService.task + '/list',
	one: (id: number) => `${endpointsService.task}/${id}`,
	done: (id: number) => `${endpointsService.task}/${id}/done`,
	undone: (id: number) => `${endpointsService.task}/${id}/undone`,
	parent: (id: number) => `${endpointsService.task}/${id}/parent`,
};

const endpoints = {...endpointsService, ...endpointsTasks};

export default endpoints;
