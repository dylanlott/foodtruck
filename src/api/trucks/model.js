import mongoose, { Schema } from 'mongoose'

const trucksSchema = new Schema({
  name: {
    type: String
  },
  locations: {
    type: String
  },
  description: {
    type: String
  },
  reviews: {
    type: String
  },
  owner: {
    type: String
  },
  hours: {
    type: Schema.Types.Mixed
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
