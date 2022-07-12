module.exports = (presentFunc) => (req, res, next) => {
  Promise.resolve(presentFunc(req, res, next)).catch(next);
};
