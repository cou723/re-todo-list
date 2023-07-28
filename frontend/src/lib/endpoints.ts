const debugEndpointDomain = 'localhost:8000';
const endpointBase =
  'http://' + (process.env.VITE_ENDPOINT ?? debugEndpointDomain);

const endpointsService = {
  login: endpointBase + '/login',
  logout: endpointBase + '/logout',
  register: endpointBase + '/register',
  user: endpointBase + '/user',
};

const taskEndpointBase = endpointBase + '/task';

const endpointsTasks = {
  base: taskEndpointBase,
  list: taskEndpointBase + '/list',
  one: (id: number): string => `${taskEndpointBase}/${id}`,
  done: (id: number): string => `${taskEndpointBase}/${id}/done`,
  undone: (id: number): string => `${taskEndpointBase}/${id}/undone`,
  parent: (id: number): string => `${taskEndpointBase}/${id}/parent`,
};

const endpoints = { ...endpointsService, task: { ...endpointsTasks } };

export default endpoints;
