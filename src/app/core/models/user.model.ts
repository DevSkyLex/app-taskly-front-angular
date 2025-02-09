
/**
 * User model
 * @interface User
 * 
 */
export interface User {
    id: number;
    name: string;
    role: 'admin' | 'manager' | 'collaborator';
  }