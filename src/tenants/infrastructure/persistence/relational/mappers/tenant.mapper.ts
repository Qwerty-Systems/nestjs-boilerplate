import { Tenant } from '../../../../domain/tenant';

import { TenantEntity } from '../entities/tenant.entity';

export class TenantMapper {
  static toDomain(raw: TenantEntity): Tenant {
    const domainEntity = new Tenant();
    domainEntity.type = raw.type;

    domainEntity.domain = raw.domain;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Tenant): TenantEntity {
    const persistenceEntity = new TenantEntity();
    persistenceEntity.type = domainEntity.type;

    persistenceEntity.domain = domainEntity.domain;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
