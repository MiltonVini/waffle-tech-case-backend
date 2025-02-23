import {
  IBadgeCreateInput,
  IBadgesRepository,
} from '@/repositories/i-bagdes-repository'
import { BadgeAlreadyCreateError } from './errors/badge-already-created-error'

export class CreateBadgeUseCase {
  constructor(private badgesRepository: IBadgesRepository) {
    this.badgesRepository = badgesRepository
  }

  async execute(data: IBadgeCreateInput) {
    const isBadgeAlreadyCreated = await this.badgesRepository.findBadgeByName(
      data.name,
    )

    if (isBadgeAlreadyCreated) {
      throw new BadgeAlreadyCreateError()
    }

    await this.badgesRepository.create(data)
  }
}
