import { createRouter, createWebHistory } from 'vue-router';
import universe from './universe';

const routes = [
	{
		path: '/universe',
		component: universe
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
