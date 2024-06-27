// config.js

const getEnvFromHref = (href) => {
  if (href.startsWith('http://localhost:3000')) return 'LOCALDEV';

  console.error('config.js: ERROR - Unable to derive Environment!');
  return undefined;
};

const g_env = getEnvFromHref(window.location.href);

const g_envConfig = {
  'LOCALDEV': {
    SEARCH_SERVICE: 'http://localhost:3014',
    API_KEY: 'b6493bfb-1957-435f-93ee-7921a25858e8'
  }
};

export const ctxValue = (key) => {
  switch (key.toUpperCase()) {
    case 'ENV':
      return g_env;

    default:
      if (!(g_env in g_envConfig)) {
        console.error('Error: env <' + g_env + '> not defined in g_envConfig');
        return;
      }
      if (!(key in g_envConfig[g_env])) {
        console.error('Error: key <' + key + '> not defined in g_envConfig[' + g_env + ']');
        return;
      }
      return g_envConfig[g_env][key];
  }
};
