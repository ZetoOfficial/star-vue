import { createRouter, createWebHistory } from 'vue-router';
import universe from './universe';
import galaxy from './galaxy';
import stars from './star';
import planets from './planet';
import constellations from './constellations';
import reports from './reports';
import audit from './audit';

const routes = [
	{
		path: '/universe',
		component: universe
	},
	{
		path: '/galaxy',
		component: galaxy
	},
	{
		path: '/stars',
		component: stars
	},
	{
		path: '/planets',
		component: planets
	},
	{
		path: '/constellations',
		component: constellations
	},
	{
		path: '/reports',
		component: reports
	},
	{
		path: '/audit',
		component: audit
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
