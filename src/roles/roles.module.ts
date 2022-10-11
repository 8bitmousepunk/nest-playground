import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { roleSchema, Role } from './role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: roleSchema }])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
