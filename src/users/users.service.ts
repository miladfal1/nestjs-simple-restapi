import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users =[
    {
        "id" :1,
        "name":"david beckham",
        "email":"david@gmail.com",
        "role":"INTERN"
    },
    {
        "id" :2,
        "name":"garry nevile",
        "email":"garry@gmail.com",
        "role":"INTERN"
    },
    {
        "id" :3,
        "name":"paul schols",
        "email":"paul@gmail.com",
        "role":"ENGINEER"
    },
    {
        "id" :4,
        "name":"alex fergosen",
        "email":"alex@gmail.com",
        "role":"ADMIN"
    },
    ]

    findAll(role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
        if (role){
            const rolesArray = this.users.filter(user=> user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users
    }

    findOne(id : number){
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(user: CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b)=>b.id - a.id)
        const newUser = {
            id : userByHighestId[0].id + 1,
            ...user
        }

        this.users.push(newUser)
        return(newUser)
    }

    update(id:number, updatedUser : UpdateUserDto){
        this.users = this.users.map(user=> {
            if (user.id === id ){
                return {...user , ...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id :number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
