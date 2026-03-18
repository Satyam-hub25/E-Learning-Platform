import { Document, Model } from 'mongoose';

export interface IBaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseModel<T extends Document> extends Model<T> {
  findByIdOrThrow(id: string): Promise<T>;
}

export const baseModelOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (_: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
};