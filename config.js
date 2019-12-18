module.exports.databaseOptions = {
    // host: '127.0.0.1',
    // host: '172.17.0.2',
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: 'password',
    database: 'patientschem',
    port:'3306'
  };