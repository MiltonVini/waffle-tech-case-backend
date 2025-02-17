export interface IUserOutput {
  id: string
  email: string
  created_at: string
}

export interface IUsersRepository {
  findByEmail(email: string): Promise<IUserOutput | null>
  create(email: string): Promise<IUserOutput | null>
}
