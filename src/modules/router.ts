import { createRouter, createWebHistory } from 'vue-router';
import universe from './universe';
import reports from './reports';

const routes = [
	{
		path: '/universe',
		component: universe
	},
	{
		path: '/reports',
		component: reports
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
