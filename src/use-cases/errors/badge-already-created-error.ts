export class BadgeAlreadyCreateError extends Error {
  constructor() {
    super('Badge Already Created')
  }
}
