//import SplashImage from '../resources/img/seo/home-splash-screen.png';

export default [
  {
    path: '/login',
    exact: true,
    component: () => import('../components/login.tsx'),
  },
];
