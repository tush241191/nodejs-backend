import merge from "lodash/merge";
import { IModel } from "../interfaces/models/IModel";
import Log from "../middlewares/Log";

class BaseModel implements IModel {
  public assignEntity(entity: any) {
    Object.assign(this, entity)
  }

  public static async getModelRecord({model, where, include = null}) {
    try {
      const entry = await model.service.findUniqueOrThrow({where, include})

      return new model(entry)
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }

  public static async listModelRecords({model, where = {}, include = null, orderBy = null}) {
    try {
      const findWhere = 'deletedAt' in model ? merge({deletedAt: null}, where) : where
      const list = await model.service.findMany({
        where: findWhere,
        ...include && {include},
        ...orderBy && {orderBy}
      })

      return list.map((row: any) => new model(row))
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }
}

export default BaseModel
