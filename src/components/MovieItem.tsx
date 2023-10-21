import {MovieItemType} from '@types'
import Image from 'next/image'
import React from 'react'
import {getImage} from 'src/utils/getImage'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {Button} from '@mui/material'

interface MovieItemProps {
  item: MovieItemType
  isFavorite: boolean
  handleFavorite: (id: number) => void
}

export const MovieItem = ({item, isFavorite, handleFavorite}: MovieItemProps) => {
  if (item.poster_path) {
    return (
      <a
        href={`${process.env.NEXT_PUBLIC_BASE}movie/${item.id}`}
        target='_blank'
        className='border-zinc-800 border hover:scale-105 hover:shadow-lg transition-all rounded-lg overflow-hidden'
      >
        <Image
          loader={() => 'Loading ...'}
          src={getImage(item.poster_path)}
          alt={item.title}
          width={300}
          className='w-full'
          height={300}
        />
        <div className='p-1'>
          <div className='flex justify-between text-xs text-neutral-400'>
            <span>{item.vote_average > 0 && <>IMDB: {item.vote_average}</>}</span>
            <span>{item.release_date?.slice(0, 4)}</span>
          </div>
          <div className='flex justify-between items-center'>
            <h5>{item.title}</h5>
            {/* Favorite Button */}
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleFavorite(item.id)
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          </div>
        </div>
      </a>
    )
  }

  return null
}
