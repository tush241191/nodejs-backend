import merge from 'lodash/merge.js'
import Log from "../middlewares/Log"

class BaseService {
  static async list({service, query = {}}) {
    try {
      const baseListQuery = {
        where: {deletedAt: null}
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
        data: {deletedAt: new Date()}
      }

      const deleteQuery = merge(baseDeleteQuery, query)

      return await service.delete(deleteQuery)
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }
}

export default BaseService