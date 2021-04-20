export const setCurrentUser = (value: string): void => {
  localStorage.setItem('currentUser', JSON.stringify(value));
};

export const getCurrentUser = (): string => {
  return JSON.parse(localStorage.getItem('currentUser') as string);
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const setAccessToken = (value: string): void => {
  localStorage.setItem('accessToken', JSON.stringify(value));
};

export const getAccessToken = (): string => {
  return localStorage.getItem('accessToken') as string;
};
