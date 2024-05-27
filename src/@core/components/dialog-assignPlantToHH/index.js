import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material'
import { useFirebase } from 'src/context/useFirebase'

const AssignPlantDialog = ({ open, onClose, userId, dayDocIds, onAssign }) => {
  const [plant, setPlant] = useState('')
  const [costCenter, setCostCenter] = useState('')
  const [plants, setPlants] = useState([])
  const { getDomainData } = useFirebase()

  useEffect(() => {
    const fetchPlants = async () => {
      const data = await getDomainData('plants')
      const plantOptions = []

      // Agregar solo los elementos de nivel superior
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
          plantOptions.push({ id: key, name: key })
        }
      })
      setPlants(plantOptions)
    }

    if (open) {
      fetchPlants()
    }
  }, [open, getDomainData])

  const handleAssign = () => {
    if (plant && costCenter.length >= 6) {
      onAssign(plant, costCenter)
      onClose()
    } else {
      alert('Por favor, complete ambos campos con información válida.')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asignar Planta y Centro de Costos</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='plant-select-label'>Planta</InputLabel>
          <Select labelId='plant-select-label' value={plant} onChange={e => setPlant(e.target.value)}>
            {plants.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin='normal'
          label='Centro de Costos'
          value={costCenter}
          onChange={e => setCostCenter(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleAssign} disabled={!plant || costCenter.length < 6}>
          Asignar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AssignPlantDialog
