import { Trucks } from '.'

let trucks

beforeEach(async () => {
  trucks = await Trucks.create({ name: 'test', locations: 'test', description: 'test', reviews: 'test', owner: 'test', hours: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trucks.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trucks.id)
    expect(view.name).toBe(trucks.name)
    expect(view.locations).toBe(trucks.locations)
    expect(view.description).toBe(trucks.description)
    expect(view.reviews).toBe(trucks.reviews)
    expect(view.owner).toBe(trucks.owner)
    expect(view.hours).toBe(trucks.hours)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = trucks.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trucks.id)
    expect(view.name).toBe(trucks.name)
    expect(view.locations).toBe(trucks.locations)
    expect(view.description).toBe(trucks.description)
    expect(view.reviews).toBe(trucks.reviews)
    expect(view.owner).toBe(trucks.owner)
    expect(view.hours).toBe(trucks.hours)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
