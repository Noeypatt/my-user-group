import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.set('versionKey', false);
GroupSchema.set('timestamps', true);
GroupSchema.set('toJSON', { getters: true });
GroupSchema.set('toObject', { getters: true });
