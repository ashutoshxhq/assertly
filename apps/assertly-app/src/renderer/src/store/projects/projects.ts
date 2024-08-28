import axios from 'axios'
import { atom } from 'jotai'
import { atomWithQuery, atomWithMutation } from 'jotai-tanstack-query'
import { ENGINE_SERVICE_URL } from '@renderer/config/constants'
import { teamIdAtom } from '../auth/auth'

export type Query = {
  where?: any
  joins?: string[]
  select?: {
    only?: string[]
    except?: string[]
  }
  orderBy?: any[]
  take?: number
  skip?: number
}

export type Pagination = {
  take?: number
  skip?: number
}
export const projectsQueryAtom = atom<Query>({})

export const projectsPaginationAtom = atom<Pagination>({
  take: 100,
  skip: 0
})
export const projectsAtom = atomWithQuery((get) => {
  const teamId = get(teamIdAtom)
  return {
    queryKey: [teamId, 'projects', get(projectsPaginationAtom)],
    queryFn: async ({ queryKey: [, , pagination] }: any) => {
      let query = get(projectsQueryAtom)
      query = {
        ...query,
        where: {
          ...query.where,
          teamId
        },
        take: pagination.take,
        skip: pagination.skip
      }
      const res = await axios.get(`${ENGINE_SERVICE_URL}/teams/${teamId}/projects?query=${JSON.stringify(query)}`)
      return res.data
    }
  }
})

export const selectedProjectIdAtom = atom<string>('')
export const selectedprojectAtom = atomWithQuery((get) => {
  const teamId = get(teamIdAtom)
  const selectedProjectId = get(selectedProjectIdAtom)
  return {
    queryKey: [teamId, 'projects', selectedProjectId],
    queryFn: async () => {
      if (!selectedProjectId) {
        return null
      }
      const res = await axios.get(`${ENGINE_SERVICE_URL}/teams/${teamId}/projects/${selectedProjectId}`)
      return res.data
    }
  }
})

export const createProjectAtom = atomWithMutation((get) => {
  const teamId = get(teamIdAtom)

  return {
    mutationKey: [teamId, 'projects'],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${ENGINE_SERVICE_URL}/teams/${teamId}/projects`, data)
      return res.data
    },
    onSuccess: () => {
      get(projectsAtom).refetch()
    }
  }
})

export const deleteprojectAtom = atomWithMutation((get) => {
  const teamId = get(teamIdAtom)

  return {
    mutationKey: [teamId, 'projects'],
    mutationFn: async ({ id, where }: any) => {
      const res = await axios.delete(`${ENGINE_SERVICE_URL}/teams/${teamId}/projects/${id}`, { data: { where } })
      return res.data
    },
    onSuccess: () => {
      get(projectsAtom).refetch()
    }
  }
})
