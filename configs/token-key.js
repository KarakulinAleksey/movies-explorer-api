module.exports = {
  JWT_TOKEN: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key',
};
