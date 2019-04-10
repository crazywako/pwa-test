import ReduxClient from '@pawjs/redux/client';
import { initialState, reducers } from './reducers/reducers';

// Bulma CSS for light weight CSS. One can any css framework
import './resources/css/global.scss';
import './resources/css/util.scss';

export default class Client {

  constructor ({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });

    reduxClient.setReducers(reducers);
    // reduxClient.setReducers(AppReducers);
    // If you want to add some redux middleware
    // reduxClient.addMiddleware(AnyMiddleware);

    // If you want to add some redux enahncers
    // reduxClient.addEnhancer(SomeEnhancer);
    addPlugin(reduxClient);
  }

  apply (clientHandler) {
    clientHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {
        const is = { ...getInitialState(), ...reducers};
        // You can also wait for something async to happen
        // await fetch("/api/counter/details") and add it to the initial state if needed
        setInitialState(is);
      });
    /*clientHandler.hooks.locationChange.tapPromise('ReloadAds', async () => this.advertise());
    clientHandler.hooks.locationChange.tapPromise('ReloadGoogleTrack', async () => Client.googleTrack());
    clientHandler.hooks.renderComplete.tap('ReloadAds', async () => this.advertise());*/
  }
}
