import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudDataSource} from '../datasources';
import {Students, StudentsRelations} from '../models';

export class StudentsRepository extends DefaultCrudRepository<
  Students,
  typeof Students.prototype.id,
  StudentsRelations
> {
  constructor(
    @inject('datasources.stud') dataSource: StudDataSource,
  ) {
    super(Students, dataSource);
  }
}
