import { getConnection } from '@/lib/db-connection'
import {
  IBadgeCreateInput,
  IBadgeInsertInput,
  IBadgeOutput,
  IBadgesRepository,
  IUserBadgesOutput,
} from '../i-bagdes-repository'
import { v4 as uuidv4 } from 'uuid'

export class Mysql2BadgesRepository implements IBadgesRepository {
  async create(data: IBadgeCreateInput) {
    const connection = await getConnection()

    const id = uuidv4()

    await connection.execute(
      'INSERT INTO badges (id, name, description, streak_required) VALUES (?, ?, ?, ?)',
      [id, data.name, data.description, data.streak_required],
    )
  }

  async getUserBagdes(email: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, email, badge_id FROM user_badges WHERE email = ? ',
      [email],
    )

    return results as IUserBadgesOutput[]
  }

  async insertUserBadge(data: IBadgeInsertInput) {
    const connection = await getConnection()

    const id = uuidv4()

    await connection.execute(
      'INSERT INTO user_badges (id, email, badge_id) VALUES (?, ?, ?)',
      [id, data.email, data.badge_id],
    )
  }

  async findBadgeByName(name: string) {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, name, description, streak_required FROM badges WHERE name = ? LIMIT 1',
      [name],
    )

    const badge = results as IBadgeOutput[]

    return badge.length > 0 ? badge[0] : null
  }

  async findAll() {
    const connection = await getConnection()

    const [results] = await connection.execute(
      'SELECT id, name, description, streak_required FROM badges',
    )

    return results as IBadgeOutput[]
  }
}
