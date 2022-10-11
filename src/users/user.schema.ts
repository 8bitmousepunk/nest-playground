import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../roles/role.schema';

export type UserDocument = User & Document;

interface UserCreationAttrs {
    email: string,
    password: string
}

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Boolean, default: false })
    banned: boolean;

    @Prop({ type: String })
    banReason: string

    @Prop({type: [{type: Types.ObjectId, ref: 'Role'}]})
    roles: Role[]
}

export const userSchema = SchemaFactory.createForClass(User);
