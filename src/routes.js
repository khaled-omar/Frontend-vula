import Auth  from './pages/Auth.vue';
import lists  from './pages/lists.vue';
import Home  from './Home.vue';
export const routes = [
	{path:'/',component:Auth},
	{path:'/home/:User_ID',component:Home},
	{path:'/home/:User_ID/Boards/:Board_ID',component:lists}
];