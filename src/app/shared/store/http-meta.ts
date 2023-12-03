import { ServerError } from '../../services/main-api/server-errors/server-base.error';

export enum HttpActionState {
  Init = 'INIT',
  Busy = 'BUSY',
  Done = 'DONE',
}

export interface HttpActionError {
  status?: number;
  message: string;
  error?: string;
}

export interface HttpActionErrorProps {
  error: HttpActionError | ServerError;
}

export type HttpActionMetadata = HttpActionState | HttpActionErrorProps;
