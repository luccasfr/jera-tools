'use server'
import { DatabaseURLType } from '@/types/database-url'
import urlEncode from './url-encode'

export async function databaseURL(data: DatabaseURLType) {
  const userNameEncoded = await urlEncode(data.username)
  const passwordEncoded = await urlEncode(data.password)

  switch (data.dialect) {
    case 'mysql': {
      return `mysql://${userNameEncoded}:${passwordEncoded}@${data.host}:${data.port}/${data.database}`
    }
    case 'postgres': {
      return `postgres://${userNameEncoded}:${passwordEncoded}@${data.host}:${data.port}/${data.database}`
    }
    case 'sql-server': {
      return `sqlserver://${data.host}:${data.port};database=${data.database};user=${userNameEncoded};password=${passwordEncoded};encrypt=true`
    }
  }
}
