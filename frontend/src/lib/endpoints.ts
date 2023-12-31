const debugEndpointDomain = 'localhost:8000';
const endpointBase = 'http://' + (process.env.VITE_ENDPOINT ?? debugEndpointDomain);

const endpointsService = {
  authStatus: endpointBase + '/auth-status',
  login: endpointBase + '/login',
  logout: endpointBase + '/logout',
  register: endpointBase + '/register',
  user: endpointBase + '/user',
  userExist: endpointBase + '/is-exist',
};

const taskEndpointBase = endpointBase + '/task';

const endpointsTasks = {
  base: taskEndpointBase,
  done: (id: number): string => `${taskEndpointBase}/${id}/done`,
  list: taskEndpointBase + '/list',
  one: (id: number): string => `${taskEndpointBase}/${id}`,
  parent: (id: number): string => `${taskEndpointBase}/${id}/parent`,
  undone: (id: number): string => `${taskEndpointBase}/${id}/undone`,
};

const endpoints = { ...endpointsService, task: { ...endpointsTasks } };

export default endpoints;
