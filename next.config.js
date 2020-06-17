const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      exportTrailingSlash: false,
      env: {
        API_KEY: 'TMPIAgk3w2dmusy4we1dVN4RXyUjK68YJrZEHsFy',
        PIXABAY_API_KEY: '17085228-31945392bfa96a62f3ad936e4',
      },
    };
  }

  return {
    exportTrailingSlash: true,
    env: {
      API_KEY: 'TMPIAgk3w2dmusy4we1dVN4RXyUjK68YJrZEHsFy',
      PIXABAY_API_KEY: '17085228-31945392bfa96a62f3ad936e4',
    },
  };
};
