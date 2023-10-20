import {MovieItem} from '@components'
import {SORT_TYPE, useGetMovieList} from '@services'
import {useInView} from 'react-intersection-observer'
import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import {MenuItem, Select} from '@mui/material'

const FavoriteName = 'favorites'

const Home: NextPage = () => {
  const [sortBy, setSortType] = useState(SORT_TYPE.DESC)
  const {ref, inView} = useInView()
  const {data, status, error, fetchNextPage, isFetchingNextPage, refetch} = useGetMovieList({
    sortBy,
  })
  const [favoriteList, setFavoriteList] = useState<number[]>([])

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const cashFavorites = localStorage.getItem(FavoriteName)
      if (cashFavorites) {
        setFavoriteList(JSON.parse(cashFavorites))
      }
    }
  }, [])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    refetch()
  }, [sortBy])

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
        <Select
          value={sortBy}
          onChange={(e) => setSortType(e.target.value as SORT_TYPE)}
          variant='outlined'
        >
          <MenuItem value={SORT_TYPE.ASC}>ASC</MenuItem>
          <MenuItem value={SORT_TYPE.DESC}>DESC</MenuItem>
        </Select>
      </div>
      {status === 'pending' ? (
        <div className='text-center my-10'>Loading ...</div>
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
          {isFetchingNextPage && <div className='text-center my-10'>Loading ...</div>}
        </div>
      )}
    </div>
  )
}

export default Home
