import {fireEvent, render, screen} from '@testing-library/react'
import {MovieItemType} from '@types'
import MovieItem, {MovieItemProps} from '../components/MovieItem'

describe('MovieItem', () => {
  const item: MovieItemType = {
    adult: false,
    backdrop_path: '/backdrop.jpg',
    genre_ids: [12, 14],
    id: 123,
    original_language: 'en',
    original_title: 'Mock Movie',
    overview: 'This is a mock movie.',
    popularity: 7.5,
    poster_path: '/poster.jpg',
    release_date: '2021-10-01',
    title: 'Mock Movie',
    video: false,
    vote_average: 8.2,
    vote_count: 100,
  }

  const props: MovieItemProps = {
    handleFavorite: () => null,
    isFavorite: true,
    item,
  }

  it('renders Movie Item unchanged', () => {
    const {container} = render(<MovieItem {...props} />)
    expect(container).toMatchSnapshot()
  })
  it('renders correctly', async () => {
    const {getByText} = render(<MovieItem {...props} />)
  })
  it('calls handleFavorite function on button click', () => {
    const mockHandleFavorite = jest.fn()
    render(<MovieItem {...props} handleFavorite={mockHandleFavorite} />)
    const favoriteButton = screen.getByRole('button')
    fireEvent.click(favoriteButton)
    expect(mockHandleFavorite).toHaveBeenCalledWith(123)
  })
  it('renders Image component with correct props', () => {
    const {getByAltText} = render(<MovieItem {...props} />)
    const image = getByAltText(item.title) as HTMLImageElement
    expect(image.alt.includes(item.title)).toBeTruthy()
  })
})
