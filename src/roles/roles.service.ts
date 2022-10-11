import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) private RoleModel: Model<RoleDocument>
    ) {}

    async createRole(dto: CreateRoleDto): Promise<RoleDocument> {
        const newRole = new this.RoleModel(dto);
        return newRole.save();
    }

    async getRoleByValue(value: string): Promise<RoleDocument> {
        return this.RoleModel.findOne({ value }).exec();
    }
}
