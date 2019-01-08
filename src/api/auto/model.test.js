import { Auto } from '.'
import { User } from '../user'

let user, auto

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  auto = await Auto.create({ user, name: 'test', type: 'test', model: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = auto.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(auto.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(auto.name)
    expect(view.type).toBe(auto.type)
    expect(view.model).toBe(auto.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = auto.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(auto.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(auto.name)
    expect(view.type).toBe(auto.type)
    expect(view.model).toBe(auto.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
