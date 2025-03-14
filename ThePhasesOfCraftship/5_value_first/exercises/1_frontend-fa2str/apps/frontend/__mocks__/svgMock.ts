const svgMock = 'svg-mock';

module.exports = {
  process() {
    return {
      code: `module.exports = ${JSON.stringify(svgMock)}`
    };
  }
};