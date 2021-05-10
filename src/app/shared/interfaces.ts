export interface IUser {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  location?: string;
  // createdAt?: string;
  // secureToken?: boolean;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  myHabits?: IHabit[];
}

export interface IHabit {
  title: string;
  type: string;
  frequency: string;
  description: string;
  public: boolean;
  author: string;
}

export interface FireAuthToken {
  idToken: string;
  expiresIn?: string;
}
