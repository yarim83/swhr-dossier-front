import {Address} from './address';
import {Department} from './department';
import {PermisionLevel} from './permisionLevel';
import {Photo} from './photo';

export class Employee{
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  pesel?: string;
  sex?: string;
  birth_date?: Date;
  photo?: Photo;
  address?: Address;
  department?: Department;
  permisionLevel?: PermisionLevel;
}
