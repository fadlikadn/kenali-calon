import { QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import queryString from "query-string";

const DEFAULT_QUERY_CONFIG = {
  useErrorBoundary: false,
}

interface QueryApiConfig<TQueryFnData = unknown> {
  axiosConfig?: AxiosRequestConfig
  queryConfig?: UseQueryOptions<TQueryFnData>
  isAuthorized?: boolean
  queryKey?: QueryKey | null
}

interface MutationApiConfig<
  TData = unknown,
  TError = unknown,
  TVariables = void,
> {
  axiosConfig?: AxiosRequestConfig
  mutationConfig?: UseMutationOptions<TData, TError, TVariables>
  isAuthorized?: boolean
}

export const paramsSerializer = (params: any): string =>
  queryString.stringify(params ?? {}, { arrayFormat: 'none' })

export const api = async <T>(
  path: string,
  options: AxiosRequestConfig,
): Promise<T> => {
  const requestApi = (): AxiosPromise<T> => {
    const url = path
    
    return axios({
      ...options,
      paramsSerializer: options.paramsSerializer ?? paramsSerializer,
      url, // Replace 'uri' with 'url'
    })
  }

  try {
    const response = await requestApi()
    return response.data
  } catch (error) {
    const parsedError: AxiosError<unknown, any> = error as AxiosError<unknown, any>
    console.log(`api-error: ${path}`, parsedError)
    throw parsedError
  }
}