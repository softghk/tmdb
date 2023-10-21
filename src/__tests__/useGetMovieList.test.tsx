import { render, act, screen } from '@testing-library/react';
import { axios } from '@libs';
import Home from '@pages/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MOVIE_LIST } from '@services';

const queryClient = new QueryClient();

describe('useGetMovieList', () => {
  it('fetches movie list with default parameters', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Mock the axios library with a mock implementation
    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockResolvedValueOnce({
      data: {
        /* mock response data here */
      },
    });

    await act(async () => {
      // Your component logic here.
    });

    // Add assertions to check the behavior, for example:
    // expect(screen.getByText('Some text from your component')).toBeInTheDocument();
    // expect(axiosMock).toHaveBeenCalledWith(
    //   `${MOVIE_LIST}?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc`
    // );
  });

});