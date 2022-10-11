import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        private rolesService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const role = await this.rolesService.getRoleByValue('user');
        const newUser = await new this.UserModel({...dto, roles: [role._id]}).save();
        return newUser;
    }

    async getAllUsers() {
        const usersQuery = this.UserModel.find({}, '-__v').populate('roles', 'value description');
        const users = await usersQuery.exec();
        return users;
    }

    async getUserByEmail(email: string) {
        return this.UserModel.findOne({ email }).populate('roles').exec();
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.UserModel.findById(dto.userId).exec();
        const role = await this.rolesService.getRoleByValue(dto.value);

        if (role && user) {
            user.roles.push(role);
            return await user.save();
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.UserModel.findById(dto.userId);
        if (!user) {
            throw new HttpException(`User didn't found`, HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
