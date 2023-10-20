import {MovieItem} from '@components'
import {SORT_TYPE, useGetMovieList} from '@services'
import {useInView} from 'react-intersection-observer'
import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import {MenuItem, Select} from '@mui/material'

const Home: NextPage = () => {
  const [sortBy, setSortType] = useState(SORT_TYPE.DESC)
  const {ref, inView} = useInView()
  const {data, status, error, fetchNextPage, isFetchingNextPage, refetch} = useGetMovieList({
    sortBy,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    refetch()
  }, [sortBy])

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
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-3'>
            {data?.pages?.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.results.map((item) => (
                  <MovieItem key={item.id} item={item} />
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
