import { ServerErrorConstructor } from '../../../services/main-api/server-errors/server-base.error';
import { NotFoundError } from '../../../services/main-api/server-errors/not-found.error';
import { ForbiddenNotExistError } from '../../../services/main-api/server-errors/forbidden-not-exist';
import { ValidationError } from '../../../services/main-api/server-errors/validation.error';

export enum FormErrors {
  WRONG_EMAILS_OR_PASSWORD = 'wrongEmailOrPassword',
  EMAIL = 'email',
  DEFAULT = 'default',
}

export const serverErrorsBindings: [ServerErrorConstructor, FormErrors][] = [
  [NotFoundError, FormErrors.WRONG_EMAILS_OR_PASSWORD],
  [ForbiddenNotExistError, FormErrors.WRONG_EMAILS_OR_PASSWORD],
  [ValidationError, FormErrors.EMAIL],
];
