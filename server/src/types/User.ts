export interface RegisterData { // This interface is used for user registration
  name: string;
  email: string;
  password: string;
}

export interface LoginData { // This interface is used for user login
  email: string;
  password: string;
  roles: string[];
}
