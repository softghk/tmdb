import {MenuItem, Select} from '@mui/material'
import {SORT_TYPE} from '@services'
import React from 'react'

interface SortSelectBoxProps {
  value: SORT_TYPE
  onChange: (e: SORT_TYPE) => void
}

export const SortSelectBox = ({value, onChange}: SortSelectBoxProps) => {
  return (
    <Select
      value={value}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value as SORT_TYPE)}
      variant='outlined'
      data-testid='sort-select' // Add this data-testid
    >
      <MenuItem value={SORT_TYPE.ASC}>ASC</MenuItem>
      <MenuItem value={SORT_TYPE.DESC}>DESC</MenuItem>
    </Select>
  )
}
