import { getConnection } from '@/lib/db-connection'
import { IUserOutput, IUsersRepository } from '../i-user-repository'
import { v4 as uuidv4 } from 'uuid'

export class Mysql2UsersRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, email, created_at from users WHERE email = ?',
      [email],
    )

    const users = results as IUserOutput[]

    return users.length > 0 ? users[0] : null
  }

  async create(email: string) {
    const connection = await getConnection()

    const id = uuidv4()

    const [results] = await connection.execute(
      'INSERT INTO users (id, email) VALUES (?, ?)',
      [id, email],
    )

    const users = results as IUserOutput[]

    return users.length > 0 ? users[0] : null
  }
}
