import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { Button } from './Button'

export type StateByProps = {
  /**
   * URL.
   */
  url: string
  /**
   * Date time.
   */
  dateTime: string
}

export type DispatchByProps = {
  /**
   * Updates the time display to the current time.ß
   */
  updateTime?: () => void
  /**
   * The URL is displayed in the system's standard Web browser.
   */
  showURL?: (url: string) => void
}

type Props = StateByProps & DispatchByProps

/**
 * Component of the basic functions.
 */
export const BasicFunction: React.FC<Props> = ({
  url,
  dateTime,
  updateTime = () => {},
  showURL = () => {}
}) => (
  <Box
    sx={{
      paddingBottom: '1rem',
      textAlign: 'center'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        paddingBottom: '1rem'
      }}
    >
      <Button variant="contained" onClick={updateTime}>
        Click
      </Button>
      <Typography component="span">{dateTime}</Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '.5rem'
      }}
    >
      <GitHub />
      <Link onClick={() => showURL(url)}>{url}</Link>
    </Box>
  </Box>
)
