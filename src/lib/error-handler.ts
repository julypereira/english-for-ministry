import { reportLovableError } from "./lovable-error-reporting";

export class AppError extends Error {
  public code: string;
  public context: Record<string, unknown>;

  constructor(message: string, code = 'UNKNOWN_ERROR', context: Record<string, unknown> = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

export function handleError(error: unknown, context: Record<string, unknown> = {}) {
  console.error('[Error Handler]:', error, context);

  const errorToReport = error instanceof Error ? error : new Error(String(error));
  
  // Report to Lovable internal logging
  reportLovableError(errorToReport, {
    ...context,
    timestamp: new Date().toISOString(),
  });

  // You could also add toast notifications here if UI is available
  return {
    message: errorToReport.message,
    code: error instanceof AppError ? error.code : 'UNKNOWN_ERROR',
  };
}

export function withErrorHandling<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  context: Record<string, unknown> = {}
): (...args: Args) => Promise<T | undefined> {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, { ...context, args });
      return undefined;
    }
  };
}
