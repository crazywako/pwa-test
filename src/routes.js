import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';

export default class Routes {
  // eslint-disable-next-line
  apply (routeHandler) {
    routeHandler.setPwaSchema({
      name: 'Huolto',
      short_name: 'Huolto',
      theme_color: '#00282e',
      display: 'standalone',
      background_color: '#00282e',
    });
    routeHandler.setDefaultSeoSchema({
      title: 'Huolto',
    });

    const routes = [
      ...GuestRoutes,
      ...AuthRoutes,
      ...SplashScreen,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
