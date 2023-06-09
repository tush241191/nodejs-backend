import {randomBytes} from 'crypto'
import flatten from 'lodash/flatten'

import {UserRoles} from '../../../../src/interfaces/models/IUser'
import User from '../../../../src/models/UserModel'
import {generatePasswordHash} from '../../../../src/utils/password'

const generateRandomToken = () => {
  return randomBytes(48).toString('base64').replace(/[+/]/g, '.')
}

const password = 'Passowrd@123'

const usersData = [
  {firstName: 'Renar', lastName: 'Tupits'},
  {firstName: 'Tushar', lastName: 'Kharat'}
]

export const seedUsers = async ({prisma, terminal}) => {
  const userRoles = Object.values(UserRoles)
  const usersWithRoles = flatten(userRoles.map(role => usersData.map(user => ({...user, ...{role}}))))

  return await Promise.all(usersWithRoles.map(async userData => {
    const {firstName, lastName, role} = userData

    const buildEmail = ({firstName, lastName}) => `${firstName}.${lastName}+${role}@example.com`
    const userPassword = await generatePasswordHash(password)

    const data = {
      email: buildEmail({firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase()}),
      password: userPassword,
      refreshId: generateRandomToken(),
      firstName: firstName,
      lastName: lastName,
      role: role,
      isActive: true
    }

    const user = await prisma.user.create({data: data})

    terminal.green(`Created user || Email - ${user.email} || Role - ${user.role} \n`)

    return new User(user)
  }))
}
