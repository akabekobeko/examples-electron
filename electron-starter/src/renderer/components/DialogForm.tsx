import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from './Button'

export type StateByProps = {}

export type DispatchByProps = {
  /**
   * Execute the Electron API `dialog.showOpenDialog`.
   */
  showOpenDialog?: () => void
  /**
   * Execute the Electron API `dialog.showSaveDialog`.
   */
  showSaveDialog?: () => void
  /**
   * Execute the Electron API `dialog.showMessageBox`.
   */
  showMessageBox?: () => void
}

type Props = StateByProps & DispatchByProps

/**
 * Component of a dialog api tester.
 */
export const DialogForm: FC<Props> = ({
  showOpenDialog = () => {},
  showSaveDialog = () => {},
  showMessageBox = () => {}
}) => (
  <Box component="form">
    <Box
      component="fieldset"
      sx={{
        textAlign: 'center',
        border: 'solid 1px #bdc3c7',
        borderRadius: '.2rem'
      }}
    >
      <Typography component="legend" sx={{ padding: '0 .5rem' }}>
        Dialog &amp; MessageBox
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        <Button variant="contained" onClick={showOpenDialog}>
          OpenDialog
        </Button>
        <Button variant="contained" onClick={showSaveDialog}>
          SaveDialog
        </Button>
        <Button variant="contained" onClick={showMessageBox}>
          MessageBox
        </Button>
      </Box>
    </Box>
  </Box>
)
