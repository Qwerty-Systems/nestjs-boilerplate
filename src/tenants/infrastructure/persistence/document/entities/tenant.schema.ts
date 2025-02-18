import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type TenantSchemaDocument = HydratedDocument<TenantSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class TenantSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
  })
  type?: string | null;

  @Prop({
    type: String,
  })
  domain?: string | null;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const TenantSchema = SchemaFactory.createForClass(TenantSchemaClass);
