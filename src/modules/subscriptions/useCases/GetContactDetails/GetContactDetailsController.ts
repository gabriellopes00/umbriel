import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { GetContactDetails } from './GetContactDetails'

type GetContactDetailsControllerRequest = {
  contact_id: string
}

export class GetContactDetailsController implements Controller {
  constructor(private getContactDetails: GetContactDetails) {}

  async handle({
    contact_id,
  }: GetContactDetailsControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getContactDetails.execute(contact_id)

      if (result.isLeft()) {
        return clientError(result.value)
      }

      return ok(result)
    } catch (err) {
      return fail(err)
    }
  }
}
