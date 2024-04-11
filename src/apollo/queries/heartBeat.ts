import { gql } from '@apollo/client'

import { client } from '../client'


const HEARTBEAT_QUERY = gql`
  query HeartBeat {
    heartBeat
  }
`

interface HeartBeatData {
  heartBeat: boolean
}

export const heartBeat = async (): Promise<boolean> => {
  try {
    const res = await client.query<HeartBeatData, {}>({ query: HEARTBEAT_QUERY })
    return res.data.heartBeat
  } catch (_) {
    return false
  }
}
