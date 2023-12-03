import { ServerError } from './server-base.error';

export class ForbiddenNotExistError extends ServerError {
  public reason = 'DOES_NOT_EXIST';
  public status = 403;
}
