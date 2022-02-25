const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE : 'mongodb://localhost:27017/moviesdb';
const databaseSettings = {
  useNewUrlParser: true,
};
module.exports = { databaseUrl, databaseSettings };
