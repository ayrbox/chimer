class UnknownError extends Error {
  status: number;

  constructor() {
    super(
      'Unexpected error occured. Please report here github.com/ayrbox/chimer/issues'
    );
    this.status = 500;
  }
}

export default UnknownError;
