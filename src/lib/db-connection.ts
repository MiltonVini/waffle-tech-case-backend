import mysql from 'mysql2/promise'

let connection: mysql.Connection | null = null

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'dockerdocker',
      database: 'the-news',
    })
  }
  return connection
}
