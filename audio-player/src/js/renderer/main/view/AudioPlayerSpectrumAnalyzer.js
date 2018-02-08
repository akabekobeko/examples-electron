import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AudioPlayerSpectrumAnalyzer.scss'
import { PlaybackState } from '../../../Constants.js'

const MAX_SPECTRUM = 255

/**
 * Component for audio spectrum analyzer.
 */
class AudioPlayerSpectrumAnalyzer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    /**
     * Canvas for spectrum snalyzer.
     * @type {HTMLCanvasElement}
     */
    this._canvas = null

    /**
     * Canvas context.
     * @type {CanvasRenderingContext2D}
     */
    this._canvasContext = null

    /**
     * Identifier obtained from requestAnimationFrame.
     * @type {number}
     */
    this._animationId = null

    /**
     * Before playback state.
     * @type {PlaybackState}
     */
    this._playbackStateBefore = props.audioPlayerStore.playbackState
  }

  /**
   * occur when the component did mount.
   */
  componentDidMount () {
    this._canvas        = this.refs.canvas
    this._canvasContext = this._canvas.getContext('2d')

    this._canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount () {
    this._stopSpectrumAnayzer()
  }

  /**
   * Render for audio spectrum analyzer.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    // Update spectrum analyzer
    const playbackStateNow = this.props.audioPlayerStore.playbackState
    if (this._playbackStateBefore !== playbackStateNow) {
      if (playbackStateNow === PlaybackState.Stopped) {
        this._stopSpectrumAnalyzer()
      } else {
        this._startSpectrumAnalyzer()
      }

      this._playbackStateBefore = playbackStateNow
    }

    const style = { display: this.props.useSpectrumAnalyzer ? 'block' : 'none' }
    return (
      <div
        className={Styles.analyzer}
        style={style}
        onClick={this.props.onClickInfoDisplay}>
        <canvas ref="canvas" />
      </div>
    )
  }

  /**
   * Draw the spectrum backgrounds.
   *
   * @param {number[]} spectrums Spectrum values ( range: 0 - 255 ).
   * @param {number} baseX The x-coordinate of the upper-left corner of the rectangle ( px ).
   * @param {number} width The width of the rectangle ( px ).
   */
  _drawBackground (spectrums, baseX, width) {
    this._canvasContext.fillStyle = '#ecf0f1'
    this._canvasContext.fillRect(0, 0, width, this._canvas.height)

    for (let i = 1, max = spectrums.length; i < max; ++i) {
      this._canvasContext.fillRect(i * baseX, 0, width, this._canvas.height)
    }
  }

  /**
   * Draw the spectrum graphs.
   *
   * @param {number[]} spectrums Spectrum values ( range: 0 - 255 ).
   * @param {number} baseX The x-coordinate of the upper-left corner of the rectangle ( px ).
   * @param {number} width The width of the rectangle ( px ).
   */
  _drawGraph (spectrums, baseX, width) {
    let percent = spectrums[0] / MAX_SPECTRUM
    let height  = this._canvas.height * percent
    let y       = this._canvas.height - height

    this._canvasContext.fillStyle = '#bdc3c7'
    this._canvasContext.fillRect(0, y, width, height)

    for (let i = 1, max = spectrums.length; i < max; ++i) {
      percent = spectrums[i] / MAX_SPECTRUM
      height  = this._canvas.height * percent
      y       = this._canvas.height - height

      this._canvasContext.fillRect(i * baseX, y, width, height)
    }
  }

  /**
   * Start the spectrum analyzer.
   */
  _startSpectrumAnalyzer () {
    const spectrums = this.props.audioPlayerStore.spectrums
    if (!(spectrums)) {
      return
    }

    this._adjustCanvasSize()
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height)

    const max   = spectrums.length
    const width = (this._canvas.width / max) / 2
    const baseX = width * 2

    this._drawBackground(spectrums, baseX, width)
    this._drawGraph(spectrums, baseX, width)

    this._animationId = window.requestAnimationFrame(this._startSpectrumAnalyzer.bind(this))
  }

  /**
   * Stop the spectrum analyzer.
   */
  _stopSpectrumAnalyzer () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height)
    window.cancelAnimationFrame(this._animationId)
  }

  /**
   * Adjust the size of the Canvas on the screen.
   */
  _adjustCanvasSize () {
    const width  = this._canvas.offsetWidth  * window.devicePixelRatio
    const height = this._canvas.offsetHeight * window.devicePixelRatio

    if (this._canvas.width !== width) {
      this._canvas.width  = width
    }

    if (this._canvas.height !== height) {
      this._canvas.height = height
    }
  }
}

AudioPlayerSpectrumAnalyzer.propTypes = {
  audioPlayerStore: PropTypes.object,
  onClickInfoDisplay: PropTypes.func,
  useSpectrumAnalyzer: PropTypes.bool
}

export default AudioPlayerSpectrumAnalyzer
