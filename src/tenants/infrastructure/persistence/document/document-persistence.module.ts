import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema, TenantSchemaClass } from './entities/tenant.schema';
import { TenantRepository } from '../tenant.repository';
import { TenantDocumentRepository } from './repositories/tenant.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TenantSchemaClass.name, schema: TenantSchema },
    ]),
  ],
  providers: [
    {
      provide: TenantRepository,
      useClass: TenantDocumentRepository,
    },
  ],
  exports: [TenantRepository],
})
export class DocumentTenantPersistenceModule {}
