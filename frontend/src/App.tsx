import type {Component} from 'solid-js';
import {Routes, Route} from '@solidjs/router';
import HomePage from './pages/HomePage';
import TaskEdit from './pages/TaskEdit';

const App: Component = () => (<>
	<Routes>
		<Route path='/' element={<HomePage />} />
		<Route path='/task/:id' element={<TaskEdit />} /></Routes>
</>
);

export default App;
