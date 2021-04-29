export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  location?: string;
  secureToken?: boolean;
}

export interface IHabit {
  title: string;
  frequency: string;
  description: string;
}

export interface FireAuthToken {
  idToken: string;
  expiresIn?: string;
}
