import merge from 'lodash/merge.js'
import Log from "../middlewares/Log"

class BaseService {
  static async list({service, query = {}, include = {}}) {
    try {
      const baseListQuery = {
        where: {deletedAt: null},
        include: include
      }

      const listQuery = merge(baseListQuery, query)

      return await service.findMany(listQuery)
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }

  static async delete({service, id, query = {}}) {
    try {
      const baseDeleteQuery = {
        where: {id},
        data: {
          isActive: false,
          deletedAt: new Date()
        }
      }

      const deleteQuery = merge(baseDeleteQuery, query)

      return await service.update(deleteQuery)
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }
}

export default BaseService
