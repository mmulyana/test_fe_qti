import http from '@/utils/http'

export interface ResultAsset {
  id: string
  name: string
}

export interface AssetResponse {
  counts: number
  page_count: number
  page_size: number
  page: number
  results: ResultAsset[]
}

export interface AssetRequest {
  name: string
  status_id: string
  location_id: string
}

export interface SingleAssetResponse {
  id: string
  name: string
  status: {
    id: string
    name: string
  }
  location: {
    id: string
    name: string
  }
}

export async function getAllAsset(page: number): Promise<AssetResponse | undefined> {
  try {
    const res = await http(`/asset?page=${page}`)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function getAsset(
  id: string
): Promise<SingleAssetResponse | undefined> {
  try {
    const res = await http(`/asset/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function createAsset(
  payload: AssetRequest
): Promise<string | undefined> {
  try {
    const res = await http.post('/asset', payload)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function updateAsset(
  payload: AssetRequest,
  id: string
): Promise<string | undefined> {
  try {
    const res = await http.put(`/asset/${id}`, payload)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function deleteAsset(id: string): Promise<string | undefined> {
  try {
    const res = await http.delete(`/asset/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export default async function searchAsset(
  name: string
): Promise<AssetResponse | undefined> {
  try {
    const res = await http(`/asset?search=${name}`)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}
