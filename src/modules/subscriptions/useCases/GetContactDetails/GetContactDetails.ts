import { Either, left, right } from '@core/logic/Either'

import { Contact } from '../../domain/contact/contact'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { ContactNotFoundError } from './errors/ContactNotFoundError'

type GetContactDetailsResponse = Either<ContactNotFoundError, Contact>

export class GetContactDetails {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute(contactId: string): Promise<GetContactDetailsResponse> {
    const contact = await this.contactsRepository.findById(contactId)

    if (!contact) {
      return left(new ContactNotFoundError())
    }

    return right(contact)
  }
}
