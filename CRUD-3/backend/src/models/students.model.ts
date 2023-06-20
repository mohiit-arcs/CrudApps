import {Entity, model, property} from '@loopback/repository';

@model()
export class Students extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  dob: string;

  @property({
    type: 'string',
    required: true,
  })
  bloodGroup: string;

  @property({
    type: 'string',
    required: true,
  })
  department: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  postalcode: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'date',
    default: Date.now(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: Date.now(),
  })
  updatedAt?: string;

  constructor(data?: Partial<Students>) {
    super(data);
  }
}

export interface StudentsRelations {
  // describe navigational properties here
}

export type StudentsWithRelations = Students & StudentsRelations;
