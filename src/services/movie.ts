import {useInfiniteQuery} from '@tanstack/react-query'
import {axios} from 'src/lib'
import {MOVIE_LIST} from './urls'
import {AxiosResponse} from 'axios'
import {MovieItemType, ResponsePagination} from '@types'

export enum SORT_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}

// Get Movies list infinite scroll
export const useGetMovieList = ({sortBy = SORT_TYPE.DESC}) => {
  return useInfiniteQuery({
    queryKey: ['movieList'],
    queryFn: ({pageParam = 1}) =>
      axios<any, AxiosResponse<ResponsePagination<MovieItemType>>>(
        `${MOVIE_LIST}?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=popularity.${sortBy}`
      ),
    getNextPageParam: (lastPage) => lastPage.data.page + 1 ?? undefined,
    initialPageParam: 1,
  })
}
