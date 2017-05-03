module.exports = {
  server: {
    middleware: {
      // overrides the second middleware default with new settings
      1: function (req, res, next) {
        next();
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    }
  }
};
