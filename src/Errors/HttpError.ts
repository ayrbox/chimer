class HttpError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string, original: Error) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack =
      this.stack?.split('\n').slice(0, 2).join('\n') + '\n' + original.stack;
  }
}

export default HttpError;
