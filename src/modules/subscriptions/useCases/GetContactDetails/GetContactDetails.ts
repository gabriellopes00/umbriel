import { Either, left, right } from '@core/logic/Either'
import { RecipientDetails } from '@modules/broadcasting/mappers/RecipientDetailsMapper'
import { IRecipientsRepository } from '@modules/broadcasting/repositories/IRecipientsRepository'

import { Contact } from '../../domain/contact/contact'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { ContactNotFoundError } from './errors/ContactNotFoundError'

type GetContactDetailsResponse = Either<
  ContactNotFoundError,
  {
    contact: Contact
    recipientsDetails: RecipientDetails[]
  }
>

export class GetContactDetails {
  constructor(
    private contactsRepository: IContactsRepository,
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(contactId: string): Promise<GetContactDetailsResponse> {
    const contact = await this.contactsRepository.findById(contactId)
    const recipientsDetails = await this.recipientsRepository.getRecipientsDetailsByContactId(
      contactId
    )

    if (!contact) {
      return left(new ContactNotFoundError())
    }

    return right({
      contact,
      recipientsDetails,
    })
  }
}
