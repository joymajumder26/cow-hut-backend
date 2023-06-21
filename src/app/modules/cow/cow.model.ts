import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { breed, category, label, location } from './cow.constant';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
      
    },
    age:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    location:{
      type:String,
      enum: location
    },
    breed:{
      type:String,
      enum: breed
    },
    weight:{
      type:String,
      required:true
    },
    label:{
      type:String,
      enum:label
    },
    category:{
      type:String,
      enum:category
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // id ta normally dekhanor jonno
      virtuals: true,
    },
  }
);

export const Cow = model<ICow>(
  'Cow',
  cowSchema
);

//handling same year and same semester issue

//data -> check -? same year && same semester
