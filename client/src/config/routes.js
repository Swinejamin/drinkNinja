import Dashboard from '../views/Dashboard/Dashboard';
import About from '../views/About/About';


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        exact: true,
        main: Dashboard,
        private: true
    },
    {
        path: '/about',
        name: 'About',
        main: About,
        private: false
    }
]

export default routes;