import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material'
import { format, getISOWeek } from 'date-fns'

const DialogCreateHours = ({ open, onClose, onSubmit, authUser, otOptions, rows }) => {
  const [hoursType, setHoursType] = useState('')
  const [plant, setPlant] = useState('')
  const [otType, setOtType] = useState('')
  const [otNumber, setOtNumber] = useState('')
  const [selectedOT, setSelectedOT] = useState({})

  const generateRowId = (uid, weekNumber, index) => {
    return `${uid}_${weekNumber}_${index}`
  }

  const handleFormSubmit = () => {
    const weekNumber = getISOWeek(new Date()) // Usa date-fns para obtener el número de la semana ISO
    const existingRowsCount = rows.length // 'rows' disponibles en el contexto con las filas actuales

    if (hoursType && (hoursType === 'OT' ? otType && otNumber && selectedOT.plant : plant)) {
      const newRowId = generateRowId(authUser.uid, weekNumber, existingRowsCount + 1)

      onSubmit({
        rowId: newRowId,
        hoursType,
        plant: hoursType === 'OT' ? selectedOT.plant : plant,
        otType,
        otNumber,
        costCenter: selectedOT.costCenter || '',
        otID: selectedOT.id || '',
        supervisorShift: selectedOT.supervisorShift || '',
        date: format(new Date(), 'yyyy-MM-dd'),
        createdBy: authUser.uid
      })
      onClose()
    } else {
      alert('Por favor, complete todos los campos requeridos.')
    }
  }

  const handleOTNumberChange = event => {
    const otNumber = event.target.value
    const otDetails = otOptions.find(option => option.ot === otNumber)
    setSelectedOT(otDetails || {})
    setOtNumber(otNumber)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nueva Hora</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='hoursType-label'>Tipo de Horas</InputLabel>
          <Select
            labelId='hoursType-label'
            id='hoursType-select'
            value={hoursType}
            onChange={e => setHoursType(e.target.value)}
          >
            <MenuItem value='isc'>ISC</MenuItem>
            <MenuItem value='vacaciones'>Vacaciones</MenuItem>
            <MenuItem value='OT'>OT</MenuItem>
          </Select>
        </FormControl>
        {hoursType !== 'OT' && (
          <FormControl fullWidth margin='normal'>
            <InputLabel id='plant-label'>Planta</InputLabel>
            <Select labelId='plant-label' id='plant-select' value={plant} onChange={e => setPlant(e.target.value)}>
              {authUser.plant.map(p => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {hoursType === 'OT' && (
          <>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='otType-label'>Tipo OT</InputLabel>
              <Select
                labelId='otType-label'
                id='otType-select'
                value={otType}
                onChange={e => setOtType(e.target.value)}
              >
                <MenuItem value='Gabinete'>Gabinete</MenuItem>
                <MenuItem value='Levantamiento'>Levantamiento</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='otNumber-label'>Número OT</InputLabel>
              <Select labelId='otNumber-label' id='otNumber-select' value={otNumber} onChange={handleOTNumberChange}>
                {otOptions.map(option => (
                  <MenuItem key={option.ot} value={option.ot}>
                    {option.ot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleFormSubmit}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogCreateHours
