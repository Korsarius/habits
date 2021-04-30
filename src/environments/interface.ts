export interface Environment {
  production: boolean;
  firebase: Firebase;
}

export interface Firebase {
  apiKey: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}
