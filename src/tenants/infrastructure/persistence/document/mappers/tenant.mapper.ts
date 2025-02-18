import { Tenant } from '../../../../domain/tenant';

import { TenantSchemaClass } from '../entities/tenant.schema';

export class TenantMapper {
  public static toDomain(raw: TenantSchemaClass): Tenant {
    const domainEntity = new Tenant();
    domainEntity.type = raw.type;

    domainEntity.domain = raw.domain;

    domainEntity.name = raw.name;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Tenant): TenantSchemaClass {
    const persistenceSchema = new TenantSchemaClass();
    persistenceSchema.type = domainEntity.type;

    persistenceSchema.domain = domainEntity.domain;

    persistenceSchema.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
