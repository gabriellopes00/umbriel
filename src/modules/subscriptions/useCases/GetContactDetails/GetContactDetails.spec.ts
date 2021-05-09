import { Email } from '@modules/subscriptions/domain/contact/email'
import { Name } from '@modules/subscriptions/domain/contact/name'

import { Contact } from '../../domain/contact/contact'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { InMemoryContactsRepository } from '../../repositories/in-memory/InMemoryContactsRepository'
import { GetContactDetails } from './GetContactDetails'

let contactsRepository: IContactsRepository
let getContactDetails: GetContactDetails

describe('Get Contact Details', () => {
  beforeEach(async () => {
    contactsRepository = new InMemoryContactsRepository()
    getContactDetails = new GetContactDetails(contactsRepository)
  })

  it('should be able to get contact details', async () => {
    const contact = Contact.create({
      name: Name.create(`John Doe`).value as Name,
      email: Email.create('john@doe.com').value as Email,
    }).value as Contact

    await contactsRepository.create(contact)

    const response = await getContactDetails.execute(contact.id)

    expect((response.value as Contact).email.value).toEqual('john@doe.com')
  })

  it('should not be able to get contact details from non existing contact', async () => {
    const response = await getContactDetails.execute('non-existing-contact')

    expect(response.isLeft()).toBe(true)
  })
})
