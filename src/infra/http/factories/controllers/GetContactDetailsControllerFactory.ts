import { Controller } from '@core/infra/Controller'
import { PrismaRecipientsRepository } from '@modules/broadcasting/repositories/prisma/PrismaRecipientsRepository'
import { PrismaContactsRepository } from '@modules/subscriptions/repositories/prisma/PrismaContactsRepository'
import { GetContactDetails } from '@modules/subscriptions/useCases/GetContactDetails/GetContactDetails'
import { GetContactDetailsController } from '@modules/subscriptions/useCases/GetContactDetails/GetContactDetailsController'

export function makeGetContactDetailsController(): Controller {
  const prismaContactsRepository = new PrismaContactsRepository()
  const prismaRecipientsRepository = new PrismaRecipientsRepository()
  const getContactDetails = new GetContactDetails(
    prismaContactsRepository,
    prismaRecipientsRepository
  )
  const getContactDetailsController = new GetContactDetailsController(
    getContactDetails
  )

  return getContactDetailsController
}
