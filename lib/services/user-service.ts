import { UserRole } from "escolas-shared";

export type User = {
  nome: string;
  email: string;
  role: UserRole;
};

export interface UserService {
  loadUser(): User | null;
  saveUser(user: User | null): void;
}

const _defaultDebugUser: User = {
  nome: 'Fulano',
  email: 'fulano@tce.ap.gov.br',
  role: 'GESTOR',
};

function validateUserObject(user: any): user is User {
  return typeof user['nome'] === 'string'
    && typeof user['email'] === 'string'
    && typeof user['role'] === 'string';
}

export const debugUserService: UserService = {
  loadUser: () => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);

      if (validateUserObject(user)) {
        return user;
      }

      localStorage.removeItem('user');
    }

    return _defaultDebugUser;
  },

  saveUser: (user: User) => {
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
    window.location.replace('/');
  },
};
