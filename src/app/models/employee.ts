import {Address} from './address';
import {PermisionLevel} from './permisionLevel';

export class Employee{
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  pesel?: string;
  sex?: string;
  birthDate?: Date;
  photoId?: number;
  address?: Address;
  department_id?: number;
  permisionLevel?: PermisionLevel;
}
