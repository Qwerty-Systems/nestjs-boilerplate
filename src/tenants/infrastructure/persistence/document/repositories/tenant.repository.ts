import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantSchemaClass } from '../entities/tenant.schema';
import { TenantRepository } from '../../tenant.repository';
import { Tenant } from '../../../../domain/tenant';
import { TenantMapper } from '../mappers/tenant.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TenantDocumentRepository implements TenantRepository {
  constructor(
    @InjectModel(TenantSchemaClass.name)
    private readonly tenantModel: Model<TenantSchemaClass>,
  ) {}

  async create(data: Tenant): Promise<Tenant> {
    const persistenceModel = TenantMapper.toPersistence(data);
    const createdEntity = new this.tenantModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return TenantMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Tenant[]> {
    const entityObjects = await this.tenantModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      TenantMapper.toDomain(entityObject),
    );
  }

  async findById(id: Tenant['id']): Promise<NullableType<Tenant>> {
    const entityObject = await this.tenantModel.findById(id);
    return entityObject ? TenantMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Tenant['id'][]): Promise<Tenant[]> {
    const entityObjects = await this.tenantModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      TenantMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Tenant['id'],
    payload: Partial<Tenant>,
  ): Promise<NullableType<Tenant>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.tenantModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.tenantModel.findOneAndUpdate(
      filter,
      TenantMapper.toPersistence({
        ...TenantMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? TenantMapper.toDomain(entityObject) : null;
  }

  async remove(id: Tenant['id']): Promise<void> {
    await this.tenantModel.deleteOne({ _id: id });
  }
}
