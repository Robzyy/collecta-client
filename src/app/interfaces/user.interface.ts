export interface User {
  id: string;
  email: string;
  username: string;
  password: string; // This will be hashed on the backend
  createdAt: Date;
  updatedAt: Date;
} 