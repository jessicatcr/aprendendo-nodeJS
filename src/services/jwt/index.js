import jwt from 'jsonwebtoken' // Gera tokens que garantem a segurança de acesso entre duas partes em uma aplicação web
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

// Assinatura do usuário
export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options)

// Assinatura do usuário de modo síncrono
export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
