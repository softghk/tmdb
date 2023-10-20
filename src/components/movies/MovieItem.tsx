import {MovieItemType} from '@types'
import Image from 'next/image'
import React, { useState } from 'react'
import {getImage} from 'src/utils/getImage'

interface MovieItemProps {
  item: MovieItemType
}

export const MovieItem = ({item}: MovieItemProps) => {
  const [isStared, setIsStared] = useState(false)
  if (item.poster_path) {
    return (
      <a
        href={`${process.env.NEXT_PUBLIC_BASE}movie/${item.id}`}
        target='_blank'
        className='border-zinc-800 border active:scale-95 hover:scale-105 hover:shadow-lg transition-all rounded-lg overflow-hidden'
      >
        <Image
          loader={() => 'Loading ...'}
          src={getImage(item.poster_path)}
          alt={item.title}
          width={300}
          className='w-full'
          height={300}
        />
        <button></button>
        <div className='p-1'>
          <div className='flex justify-between text-xs text-neutral-400'>
            <span>{item.vote_average > 0 && <>IMDB: {item.vote_average}</>}</span>
            <span>{item.release_date?.slice(0, 4)}</span>
          </div>
          <h5>{item.title}</h5>
        </div>
      </a>
    )
  }

  return null
}
