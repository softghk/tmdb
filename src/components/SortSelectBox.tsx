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
      onChange={(e) => onChange(e.target.value as SORT_TYPE)}
      variant='outlined'
    >
      <MenuItem value={SORT_TYPE.ASC}>ASC</MenuItem>
      <MenuItem value={SORT_TYPE.DESC}>DESC</MenuItem>
    </Select>
  )
}
