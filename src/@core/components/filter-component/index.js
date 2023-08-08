import React, { useState, useEffect } from 'react'
import { useFirebase } from 'src/context/useFirebaseAuth'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

const FilterComponent = ({ filterConfig, activeFilters, handleFilterChange, handleClearFilters, authUser }) => {
  const [options, setOptions] = useState([])
  const [initialValues, setInitialValues] = useState({})
  const filterTypes = Object.keys(filterConfig)

  const getFilterOptionsByType = type => {
    const optionsByType = Object.entries(filterConfig)
      .filter(([key, value]) => value.type === type && value.canSee.includes(authUser.role))
      .map(([key, value]) => ({
        key,
        label: value.label
      }))

    const result = {}
    result[type] = optionsByType

    return result
  }

  useEffect(() => {
    const initializeValues = () => {
      let newValues = {}
      filterTypes.forEach(key => {
        newValues[key] = ''
      })
      setInitialValues(newValues)
    }
    initializeValues()
  }, [])

  useEffect(() => {
    const types = [...new Set(Object.values(filterConfig).map(item => item.type))]
    const options = types.map(type => getFilterOptionsByType(type))
    console.log(options)
    setOptions(options)
  }, [filterConfig])

  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
     {options.map(optionGroup => {
      const optionGroupName = Object.keys(optionGroup)[0]
      const optionGroupData = optionGroup[optionGroupName]

      // Avoid rendering "General" selector if it's the only visible option
      if (optionGroupName === 'General' && optionGroupData.length === 1 && optionGroupData[0].key === 'all') {
        return null;
      }

        return (
          <Grid item xs={6} sm={4} md={3} key={optionGroupName}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id={`select-label-${optionGroupName}`}>{optionGroupName}</InputLabel>
              <Select
                labelId={`select-label-${optionGroupName}`}
                label={optionGroupName}
                value={activeFilters[optionGroupName]}
                onChange={e => handleFilterChange(optionGroupName, e.target.value)}
              >
                <MenuItem key={'all'} value={'all'}>
                {optionGroupName}
                </MenuItem>
                {optionGroupData.map(option => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )
      })}

      <Grid item xs={12} sm={2}>
        <Button variant='outlined' onClick={() => handleClearFilters(initialValues)} sx={{ width: '100%' }}>
          Limpiar filtros
        </Button>
      </Grid>
    </Grid>
  )
}

export default FilterComponent
