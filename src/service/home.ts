import http from '@/utils/http'

interface response {
  count: number
}

export interface StatusResponse extends response {
  status: {
    id: string
    name: string
  }
}

export interface LocationResponse extends response {
  location: {
    id: string
    name: string
  }
}

export async function getAssetByStatus(): Promise<StatusResponse[] | undefined> {
  try {
    const { data } = await http('/home/agg-asset-by-status')
    return data.results
  } catch (error) {
    console.log(error)
    return
  }
}

export async function getAssetByLocation(): Promise<LocationResponse[] | undefined> {
  try {
    const { data } = await http('/home/agg-asset-by-location')
    return data.results
  } catch (error) {
    console.log(error)
    return
  }
}
