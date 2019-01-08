import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Auto, { schema } from './model'

const router = new Router()
const { name, type, model } = schema.tree

/**
 * @api {post} /autos Create auto
 * @apiName CreateAuto
 * @apiGroup Auto
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Auto's name.
 * @apiParam type Auto's type.
 * @apiParam model Auto's model.
 * @apiSuccess {Object} auto Auto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auto not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, type, model }),
  create)

/**
 * @api {get} /autos Retrieve autos
 * @apiName RetrieveAutos
 * @apiGroup Auto
 * @apiUse listParams
 * @apiSuccess {Object[]} autos List of autos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /autos/:id Retrieve auto
 * @apiName RetrieveAuto
 * @apiGroup Auto
 * @apiSuccess {Object} auto Auto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auto not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /autos/:id Update auto
 * @apiName UpdateAuto
 * @apiGroup Auto
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Auto's name.
 * @apiParam type Auto's type.
 * @apiParam model Auto's model.
 * @apiSuccess {Object} auto Auto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Auto not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, type, model }),
  update)

/**
 * @api {delete} /autos/:id Delete auto
 * @apiName DeleteAuto
 * @apiGroup Auto
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Auto not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
