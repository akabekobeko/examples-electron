import React, { useRef } from 'react'
import Styles from './PlayerSpectrumAnalyzer.scss'

/**This is the maximum value of the spectrum. */
const MaxSpectrum = 255

/**
 * Adjust the size of the Canvas on the screen.
 * @param canvas Target canvas.
 */
const adjustCanvasSize = (canvas: HTMLCanvasElement) => {
  const width = canvas.offsetWidth * window.devicePixelRatio
  const height = canvas.offsetHeight * window.devicePixelRatio

  if (canvas.width !== width) {
    canvas.width = width
  }

  if (canvas.height !== height) {
    canvas.height = height
  }
}

/**
 * Draw the spectrum backgrounds.
 * @param canvas Target canvas.
 * @param canvasContext Context of target canvas.
 * @param spectrums Spectrum values, range: `0` to `255`.
 * @param baseX The x-coordinate of the upper-left corner of the rectangle (px).
 * @param width The width of the rectangle (px).
 */
const drawBackground = (
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  spectrums: Uint8Array,
  baseX: number,
  width: number
) => {
  canvasContext.fillStyle = '#ecf0f1'
  canvasContext.fillRect(0, 0, width, canvas.height)

  for (let i = 1, max = spectrums.length; i < max; ++i) {
    canvasContext.fillRect(i * baseX, 0, width, canvas.height)
  }
}

/**
 * Draw the spectrum graphs.
 * @param canvas Target canvas.
 * @param canvasContext: CanvasRenderingContext2D,
 * @param spectrums Spectrum values, range: `0` to `255`.
 * @param baseX The x-coordinate of the upper-left corner of the rectangle (px).
 * @param width The width of the rectangle (px).
 */
const drawGraph = (
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  spectrums: Uint8Array,
  baseX: number,
  width: number
) => {
  let percent = spectrums[0] / MaxSpectrum
  let height = canvas.height * percent
  let y = canvas.height - height

  canvasContext.fillStyle = '#bdc3c7'
  canvasContext.fillRect(0, y, width, height)

  for (let i = 1, max = spectrums.length; i < max; ++i) {
    percent = spectrums[i] / MaxSpectrum
    height = canvas.height * percent
    y = canvas.height - height
    canvasContext.fillRect(i * baseX, y, width, height)
  }
}

/**
 * Draw the spectrum analyzer.
 * @param canvas Target canvas.
 * @param spectrums Spectrum values, range: `0` to `255`.
 */
const draw = (
  canvas: HTMLCanvasElement | null,
  spectrums: Uint8Array | null
) => {
  if (!canvas) {
    return
  }

  const canvasContext = canvas.getContext('2d')
  if (!canvasContext) {
    return
  }

  canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio)
  adjustCanvasSize(canvas)
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)

  if (!spectrums || spectrums.length === 0) {
    return
  }

  const max = spectrums.length
  const width = canvas.width / max / 2
  const baseX = width * 2

  drawBackground(canvas, canvasContext, spectrums, baseX, width)
  drawGraph(canvas, canvasContext, spectrums, baseX, width)
}

type Props = {
  /** `true` if analyzer display is enabled. */
  enabled: boolean
  /** Spectrums from current audio data. */
  spectrums: Uint8Array | null
  /** Occurs when a component is clicked. */
  onClick: () => void
}

/**
 * Component of Spectrum analyzer to the current playing music.
 */
export const PlayerSpectrumAnalyzer: React.FC<Props> = ({
  enabled,
  spectrums,
  onClick
}) => {
  const canvas = useRef<HTMLCanvasElement>(null)
  draw(canvas.current, spectrums)

  return (
    <div
      className={Styles.analyzer}
      style={{ display: enabled ? 'block' : 'none' }}
      onClick={onClick}
    >
      <canvas ref={canvas} />
    </div>
  )
}
