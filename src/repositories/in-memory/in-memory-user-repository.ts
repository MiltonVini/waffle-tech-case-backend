import { IUserOutput, IUsersRepository } from '../i-user-repository'
import { v4 as uuidv4 } from 'uuid'

// Repositório inMemory para testes unitários
export class InMemoryUsersRepository implements IUsersRepository {
  private users: IUserOutput[] = [
    {
      id: '234342',
      email: 'test9@example.com',
      created_at: new Date().toISOString(),
    },
  ]

  async findByEmail(email: string): Promise<IUserOutput | null> {
    // Simula consulta ao banco de dados
    const user = this.users.find((user) => user.email === email)
    return user || null
  }

  async create(email: string): Promise<IUserOutput> {
    // Simula criação de um novo usuário
    const id = uuidv4()
    const newUser: IUserOutput = {
      id,
      email,
      created_at: String(new Date()),
    }

    this.users.push(newUser)
    return newUser
  }
}
