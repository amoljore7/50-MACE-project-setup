function ErrorString(message: string): string | undefined {
  if (message === 'Request failed with status code 401') {
    return 'You have entered an invalid username or password';
  }
  if (message === 'Request failed with status code 500') {
    return 'You have entered an invalid email';
  }
}

export default ErrorString;
