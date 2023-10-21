import {Loader, MovieItem, SortSelectBox} from '@components'
import {SORT_TYPE, useGetMovieList} from '@services'
import {useInView} from 'react-intersection-observer'
import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'

// Favorite key LocalStorage
const FavoriteName = 'favorites'

const Home: NextPage = () => {
  // Hooks
  const [sortBy, setSortType] = useState(SORT_TYPE.DESC)
  const [favoriteList, setFavoriteList] = useState<number[]>([])

  const {ref, inView} = useInView()
  const {data, status, error, fetchNextPage, isFetchingNextPage, refetch} = useGetMovieList({
    sortBy,
  })

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const cashFavorites = localStorage.getItem(FavoriteName)
      if (cashFavorites) {
        setFavoriteList(JSON.parse(cashFavorites))
      }
    }
  }, [])

  // Infinite Scroll
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  // Refetch data after change the sort
  useEffect(() => {
    refetch()
  }, [sortBy])

  // Handle Favorite
  const handleFavorite = (id: number) => {
    let list: number[] = [...favoriteList]
    if (favoriteList.find((item) => item === id)) {
      list = list.filter((item) => id !== item)
    } else {
      list.push(id)
    }
    setFavoriteList(list)
    localStorage.setItem(FavoriteName, JSON.stringify(list))
  }

  return (
    <div className='max-w-[1170px] mx-auto p-10'>
      <Head>
        <title>TMDB</title>
        <meta name='description' content='TMDB description' />
        <meta httpEquiv='X-UA-Compatible' content='IE-edge, chrome=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-center text-4xl mt-6 mb-16'>TMDB MOVIES</h1>
      <div className='text-white mb-10'>
        <SortSelectBox onChange={setSortType} value={sortBy} />
      </div>
      {status === 'pending' ? (
        <Loader />
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-4'>
            {data?.pages?.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.results.map((item) => (
                  <MovieItem
                    isFavorite={!!favoriteList.find((favorite) => favorite === item.id)}
                    handleFavorite={handleFavorite}
                    key={item.id}
                    item={item}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div ref={ref}></div>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}

export default Home
