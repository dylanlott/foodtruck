import { success, notFound } from '../../services/response/'
import { Trucks } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Trucks.create(body)
    .then((trucks) => trucks.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Trucks.count(query)
    .then(count => Trucks.find(query, select, cursor)
      .then((trucks) => ({
        count,
        rows: trucks.map((trucks) => trucks.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Trucks.findById(params.id)
    .then(notFound(res))
    .then((trucks) => trucks ? trucks.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Trucks.findById(params.id)
    .then(notFound(res))
    .then((trucks) => trucks ? Object.assign(trucks, body).save() : null)
    .then((trucks) => trucks ? trucks.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Trucks.findById(params.id)
    .then(notFound(res))
    .then((trucks) => trucks ? trucks.remove() : null)
    .then(success(res, 204))
    .catch(next)
