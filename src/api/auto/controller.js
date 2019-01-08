import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Auto } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Auto.create({ ...body, user })
    .then((auto) => auto.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Auto.find(query, select, cursor)
    .populate('user')
    .then((autos) => autos.map((auto) => auto.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Auto.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((auto) => auto ? auto.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Auto.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((auto) => auto ? Object.assign(auto, body).save() : null)
    .then((auto) => auto ? auto.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Auto.findById(params.id)
    .then(notFound(res))
    .then((auto) => auto ? auto.remove() : null)
    .then(success(res, 204))
    .catch(next)
