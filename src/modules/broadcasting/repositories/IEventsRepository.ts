import { Event } from '../domain/event/event'

export interface IEventsRepository {
  create(event: Event): Promise<void>
  findManyByContactId(contactId: string): Promise<Event[]>
}
