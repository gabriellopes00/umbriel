import { Recipient } from '../domain/recipient/recipient'
import { RecipientDetails } from '../mappers/RecipientDetailsMapper'

export type FindByMessageAndContactIdParams = {
  messageId: string
  contactId: string
}

export interface IRecipientsRepository {
  findByMessageAndContactId(
    params: FindByMessageAndContactIdParams
  ): Promise<Recipient>
  saveWithEvents(recipient: Recipient): Promise<void>
  getRecipientsDetailsByContactId(
    contactId: string
  ): Promise<RecipientDetails[]>
}
