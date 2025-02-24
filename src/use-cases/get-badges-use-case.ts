import { IBadgesRepository } from '@/repositories/i-bagdes-repository'

export class GetBadgesUseCase {
  constructor(private badgesRepository: IBadgesRepository) {
    this.badgesRepository = badgesRepository
  }

  async execute() {
    const badges = await this.badgesRepository.findAll()

    return badges
  }
}
