import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {SortSelectBox} from '../components/SortSelectBox'
import {SORT_TYPE} from '@services'

describe('SortSelectBox component renders and handles change', () => {
  const handleChange = jest.fn()

  const ScreenSelect = <SortSelectBox value={SORT_TYPE.DESC} onChange={handleChange} />
  it('renders SortSelect unchanged', () => {
    const {container} = render(ScreenSelect)
    expect(container).toMatchSnapshot()
  })

  it('displays the initial value correctly', () => {
    const {getByTestId} = render(ScreenSelect)
    const selectElement = getByTestId('sort-select').querySelector(
      'input.MuiSelect-nativeInput'
    ) as HTMLInputElement
    expect(selectElement.value).toEqual(SORT_TYPE.DESC)
  })

  it('calls the onChange handler when a different option is selected', () => {
    const {getByTestId} = render(ScreenSelect)
    const selectElement = getByTestId('sort-select').querySelector(
      'input.MuiSelect-nativeInput'
    ) as HTMLInputElement

    fireEvent.change(selectElement, {
      target: {value: SORT_TYPE.ASC},
    })

    expect(handleChange).toHaveBeenCalledWith(SORT_TYPE.ASC)
  })
  it('displays the updated value correctly after a change', () => {
    const {getByTestId} = render(ScreenSelect)
    const selectElement = getByTestId('sort-select').querySelector(
      'input.MuiSelect-nativeInput'
    ) as HTMLInputElement

    fireEvent.change(selectElement, {
      target: {value: SORT_TYPE.DESC},
    })

    expect(selectElement.value).toEqual(SORT_TYPE.DESC)
  })
})
