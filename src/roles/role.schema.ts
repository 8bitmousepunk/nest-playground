import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type RoleDocument = Role & Document;

interface RoleCreationAttrs {
    value: string,
    description: string
}

@Schema()
export class Role {
    @Prop({ type: String, required: true, unique: true })
    value: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: [{type: Types.ObjectId, ref: 'User'}]})
    users: User[];
}

export const roleSchema = SchemaFactory.createForClass(Role);
