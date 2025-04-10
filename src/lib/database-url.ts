'use server'
import { urlEncode } from '@/lib/url'
import { DatabaseURLType } from '@/types/database-url'

/**
 * Encode a database URL to be used in a connection string
 * @param {DatabaseURLType} data - the database URL data to be encoded
 * @returns {Promise<string>} - the encoded database URL
 */
export async function databaseURL(data: DatabaseURLType): Promise<string> {
  const userNameEncoded = urlEncode(data.username)
  const passwordEncoded = urlEncode(data.password)

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
