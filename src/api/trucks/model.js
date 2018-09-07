import mongoose, { Schema } from 'mongoose'

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const trucksSchema = new Schema({
  name: {
    type: String
  },
  locations: [{
    type: pointSchema,
    required: true
  }],
  description: {
    type: String
  },
  reviews: [{
    type: Schema.Types.Mixed
  }],
  owner: {
    type: String
  },
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    Saturday: String,
    Sunday: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

trucksSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      locations: this.locations,
      description: this.description,
      reviews: this.reviews,
      owner: this.owner,
      hours: this.hours,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Trucks', trucksSchema)

export const schema = model.schema
export default model
