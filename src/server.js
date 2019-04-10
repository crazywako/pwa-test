import React from 'react';
import ReactPWAIcon from './resources/img/react-pwa.png';
import ReduxServer from '@pawjs/redux/server';
import { initialState, reducers } from './reducers/reducers';

export default class Server {
  constructor ({ addPlugin }) {
    const reduxServer = new ReduxServer({ addPlugin });

    reduxServer.setReducers(reducers);
    //console.log(Reducers)
    // reduxClient.setReducers(AppReducers);
    // If you want to add some redux middleware
    // reduxClient.addMiddleware(AnyMiddleware);

    // If you want to add some redux enahncers
    // reduxClient.addEnhancer(SomeEnhancer);
    addPlugin(reduxServer);
  }
  // eslint-disable-next-line
  apply (serverHandler) {
    serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
      const { htmlProps: { head } } = Application;
      //head.push(<link key="dns-precache-demo-cdn" rel="preconnect" href="https://demo-cdn.reactpwa.com" />);
      //
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddMeta', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={ReactPWAIcon} />);
      head.push(<meta key="meta-theme-color" name="theme-color" content="#00282e" />);
      head.push(<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />);
      head.push(<meta name="apple-mobile-web-app-capable" content="yes" />);
      return true;
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddFontAwesome', async (Application) => {
      Application.htmlProps.footer.push(<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />);
    });
    serverHandler.hooks.beforeHtmlRender.tapPromise('AddOpenSans', async (Application) => {
      Application.htmlProps.footer.push(<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />);
    });
    serverHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {

        const is = { ...getInitialState(), ...initialState };
        // You can also wait for something async to happen
        // await fetch("/api/counter/details") and add it to the initial state if needed
        setInitialState(is);
      });
  }
}
