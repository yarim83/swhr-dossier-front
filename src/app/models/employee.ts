import {Address} from './address';
import {Department} from './department';
import {PermisionLevel} from './permisionLevel';

export class Employee{
  id?: number;
  firstName?: string;
  lastname?: string;
  email?: string;
  pesel?: string;
  sex?: string;
  photo_link?: string;
  birth_date?: Date;
  address?: Address;
  department?: Department;
  permisionLevel?: PermisionLevel;
}
