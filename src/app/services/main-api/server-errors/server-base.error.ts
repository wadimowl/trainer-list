interface ErrorWithStatus {
  reason: string;
  status: number;
}

function isErrorWithStatus(error: unknown): error is ErrorWithStatus {
  return !!error && typeof error === 'object' && 'reason' in error && 'status' in error;
}

export type ServerErrorConstructor = new () => ServerError;

export abstract class ServerError extends Error implements ErrorWithStatus {
  public abstract reason: string;
  public abstract status: number;

  static tryCastToServerErrorAndCompare(sourceError: Error | ServerErrorConstructor, compared: any): boolean {
    const source = sourceError instanceof Error ? sourceError : new sourceError();
    return source instanceof ServerError
      && isErrorWithStatus(compared)
      && source.status === compared.status
      && source.reason === compared.reason;
  }
}
