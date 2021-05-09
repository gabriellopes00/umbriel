import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class ContactNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Contact not found.`)
    this.name = 'ContactNotFoundError'
  }
}
