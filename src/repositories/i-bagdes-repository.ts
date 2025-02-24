export interface IBadgeCreateInput {
  name: string
  description: string
  streak_required: number
}

export interface IUserBadgesOutput {
  id: string
  email: string
  badge_id: string
  name: string
}

export interface IBadgeInsertInput {
  badge_id: string
  email: string
}

export interface IBadgeOutput {
  id: string
  name: string
  description: string
  streak_required: number
}

export interface IBadgesRepository {
  create(data: IBadgeCreateInput): Promise<void>
  getUserBagdes(email: string): Promise<IUserBadgesOutput[]>
  insertUserBadge(data: IBadgeInsertInput): Promise<void>
  findBadgeByName(name: string): Promise<IBadgeOutput | null>
  findAll(): Promise<IBadgeOutput[]>
}
