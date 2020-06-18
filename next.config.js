const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      exportTrailingSlash: false,
      env: {
        API_KEY: 'TMPIAgk3w2dmusy4we1dVN4RXyUjK68YJrZEHsFy',
      },
    };
  }

  return {
    exportTrailingSlash: true,
    env: {
      API_KEY: 'TMPIAgk3w2dmusy4we1dVN4RXyUjK68YJrZEHsFy',
    },
  };
};
