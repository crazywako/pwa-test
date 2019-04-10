import SassPlugin from '@pawjs/sass/webpack';
import SrcsetPlugin from '@pawjs/srcset/webpack';
import ImageOptimizer from '@pawjs/image-optimizer/webpack';

export default class ProjectWebpack {
  constructor ({ addPlugin }) {
    // Add sass compiler to the project
    addPlugin(new SassPlugin());
    const optimizerOptions = {
      configLabel: 'MEDIUM_QUALITY',
      supportedEnv: [
        'production',
      ],
    };
    addPlugin(new ImageOptimizer(optimizerOptions));
    addPlugin(new SrcsetPlugin());
  }
  apply(webpackHandler) {

    webpackHandler.hooks.beforeConfig.tap('AddDevProxy', (env, type, configs) => {

        configs.forEach(config => {
          config.devServer = config.devServer || {}
          config.devServer = {
            ...config.devServer,
            proxy: {
              '/api/': 'http://127.0.0.1:9699',
            },
            historyApiFallback: true,
          };
        });
    });
  }
}
