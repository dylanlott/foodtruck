import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Trucks, { schema } from './model'

const router = new Router()
const { name, locations, description, reviews, owner, hours } = schema.tree

/**
 * @api {post} /trucks Create trucks
 * @apiName CreateTrucks
 * @apiGroup Trucks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Trucks's name.
 * @apiParam locations Trucks's locations.
 * @apiParam description Trucks's description.
 * @apiParam reviews Trucks's reviews.
 * @apiParam owner Trucks's owner.
 * @apiParam hours Trucks's hours.
 * @apiSuccess {Object} trucks Trucks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trucks not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, locations, description, reviews, owner, hours }),
  create)

/**
 * @api {get} /trucks Retrieve trucks
 * @apiName RetrieveTrucks
 * @apiGroup Trucks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of trucks.
 * @apiSuccess {Object[]} rows List of trucks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /trucks/:id Retrieve trucks
 * @apiName RetrieveTrucks
 * @apiGroup Trucks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} trucks Trucks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trucks not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /trucks/:id Update trucks
 * @apiName UpdateTrucks
 * @apiGroup Trucks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Trucks's name.
 * @apiParam locations Trucks's locations.
 * @apiParam description Trucks's description.
 * @apiParam reviews Trucks's reviews.
 * @apiParam owner Trucks's owner.
 * @apiParam hours Trucks's hours.
 * @apiSuccess {Object} trucks Trucks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trucks not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, locations, description, reviews, owner, hours }),
  update)

/**
 * @api {delete} /trucks/:id Delete trucks
 * @apiName DeleteTrucks
 * @apiGroup Trucks
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Trucks not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
