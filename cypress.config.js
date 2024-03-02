const { defineConfig } = require('cypress')
const oracledb = require('oracledb')
require('dotenv').config()

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1980,
  env: {
    baseUrl: 'https://tech-global-training.com/students',
    'oracleDB': {
      'user': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'connectionString': process.env.DB_HOST
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        async runQuery(query) {
          let connection

          try {

            // Establish connection to Oracle Database
            connection = await oracledb.getConnection(config.env.oracleDB)
            
            // This is where we execute the query and return its result
            const result = await connection.execute(query)
            return result.rows
          } catch(err) {
            throw new Error(err)
          } finally {
            if(connection) {
              // After we want to ensure the connection is closed after execution
              await connection.close()
            }
          }
        }
      })
    },
    baseUrl: process.env.BASE_URL
  },
})
