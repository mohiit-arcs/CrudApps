// import {
//     Count,
//     CountSchema,
//     Filter,
//     FilterExcludingWhere,
//     repository,
//     Where,
//   } from '@loopback/repository';
//   import {
//     post,
//     param,
//     get,
//     getModelSchemaRef,
//     patch,
//     put,
//     del,
//     requestBody,
//     response,
//   } from '@loopback/rest';
//   import {Students} from '../models';
//   import {StudentsRepository} from '../repositories';

//   export class StudentController {
//     constructor(
//       @repository(StudentsRepository)
//       public studentsRepository : StudentsRepository,
//     ) {}

//     @post('/students')
//     @response(200, {
//       description: 'Students model instance',
//       content: {'application/json': {schema: getModelSchemaRef(Students)}},
//     })
//     async create(
//       @requestBody({
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(Students, {
//               title: 'NewStudents',
//               exclude: ['id'],
//             }),
//           },
//         },
//       })
//       students: Omit<Students, 'id'>,
//     ): Promise<Students> {
//       return this.studentsRepository.create(students);
//     }

//     @get('/students/count')
//     @response(200, {
//       description: 'Students model count',
//       content: {'application/json': {schema: CountSchema}},
//     })
//     async count(
//       @param.where(Students) where?: Where<Students>,
//     ): Promise<Count> {
//       return this.studentsRepository.count(where);
//     }

//     @get('/students')
//     @response(200, {
//       description: 'Array of Students model instances',
//       content: {
//         'application/json': {
//           schema: {
//             type: 'array',
//             items: getModelSchemaRef(Students, {includeRelations: true}),
//           },
//         },
//       },
//     })
//     async find(
//       @param.filter(Students) filter?: Filter<Students>,
//     ): Promise<Students[]> {
//       return this.studentsRepository.find(filter);
//     }

//     @patch('/students')
//     @response(200, {
//       description: 'Students PATCH success count',
//       content: {'application/json': {schema: CountSchema}},
//     })
//     async updateAll(
//       @requestBody({
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(Students, {partial: true}),
//           },
//         },
//       })
//       students: Students,
//       @param.where(Students) where?: Where<Students>,
//     ): Promise<Count> {
//       return this.studentsRepository.updateAll(students, where);
//     }

//     @get('/students/{id}')
//     @response(200, {
//       description: 'Students model instance',
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Students, {includeRelations: true}),
//         },
//       },
//     })
//     async findById(
//       @param.path.number('id') id: number,
//       @param.filter(Students, {exclude: 'where'}) filter?: FilterExcludingWhere<Students>
//     ): Promise<Students> {
//       return this.studentsRepository.findById(id, filter);
//     }

//     @patch('/students/{id}')
//     @response(204, {
//       description: 'Students PATCH success',
//     })
//     async updateById(
//       @param.path.number('id') id: number,
//       @requestBody({
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(Students, {partial: true}),
//           },
//         },
//       })
//       students: Students,
//     ): Promise<void> {
//       await this.studentsRepository.updateById(id, students);
//     }

//     @put('/students/{id}')
//     @response(204, {
//       description: 'Students PUT success',
//     })
//     async replaceById(
//       @param.path.number('id') id: number,
//       @requestBody() students: Students,
//     ): Promise<void> {
//       await this.studentsRepository.replaceById(id, students);
//     }

//     @del('/students/{id}')
//     @response(204, {
//       description: 'Students DELETE success',
//     })
//     async deleteById(@param.path.number('id') id: number): Promise<void> {
//       await this.studentsRepository.deleteById(id);
//     }
//   }


import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Students } from '../models';
import { StudentsRepository } from '../repositories';

export class StudentController {
  constructor(
    @repository(StudentsRepository)
    public studentsRepository: StudentsRepository,
  ) {}

  @post('/students')
  @response(200, {
    description: 'Students model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Students) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudents',
            exclude: ['id'],
          }),
        },
      },
    })
    students: Omit<Students, 'id'>,
  ): Promise<Students> {
    return this.studentsRepository.create(students);
  }

  @get('/students/count')
  @response(200, {
    description: 'Students model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Students) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentsRepository.count(where);
  }

  @get('/students')
  @response(200, {
    description: 'Array of Students model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Students, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Students) filter?: Filter<Students>,
  ): Promise<Students[]> {
    const sort = filter?.order?.map(order => order.split(' ')) || [];
    if (sort.length > 0) {
      const [sortField, sortOrder] = sort[0];

      const order: string[] = [];
      if (sortField && sortOrder) {
        order.push(`${sortField} ${sortOrder}`);
      }

      const sortedStudents = await this.studentsRepository.find({
        order,
        where: filter?.where,
      });

      return sortedStudents;
    }

    return this.studentsRepository.find(filter);
  }

  @patch('/students')
  @response(200, {
    description: 'Students PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, { partial: true }),
        },
      },
    })
    students: Students,
    @param.where(Students) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentsRepository.updateAll(students, where);
  }

  @get('/students/{id}')
  @response(200, {
    description: 'Students model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Students, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Students, { exclude: 'where' }) filter?: FilterExcludingWhere<Students>,
  ): Promise<Students> {
    return this.studentsRepository.findById(id, filter);
  }

  @patch('/students/{id}')
  @response(204, {
    description: 'Students PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, { partial: true }),
        },
      },
    })
    students: Students,
  ): Promise<void> {
    await this.studentsRepository.updateById(id, students);
  }

  @put('/students/{id}')
  @response(204, {
    description: 'Students PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() students: Students,
  ): Promise<void> {
    await this.studentsRepository.replaceById(id, students);
  }

  @del('/students/{id}')
  @response(204, {
    description: 'Students DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.studentsRepository.deleteById(id);
  }
}
