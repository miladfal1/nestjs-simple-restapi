import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseServise: DatabaseService){
  }
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseServise.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role )return this.databaseServise.employee.findMany({
      where : {
        role
      }
    })
    return this.databaseServise.employee.findMany()
  }

  async findOne(id: number) {
    return this.databaseServise.employee.findUnique({
      where : {
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseServise.employee.update({
      where : {
        id,
      },
      data :updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databaseServise.employee.delete({
      where : {
        id,
      }
    })
}
}
