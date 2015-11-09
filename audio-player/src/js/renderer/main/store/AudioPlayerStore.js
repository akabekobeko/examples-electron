import { Store }         from 'material-flux';
import { Keys }          from '../action/AudioPlayerAction.js';
import { PlaybackState } from '../../../common/Constants.js';
import Util              from '../../../common/Util.js';
import AudioPlayer       from '../model/AudioPlayer.js';

/**
 * Execution interval of call back by the timer at the time of playback ( milliseconds ).
 * @type {Number}
 */
const PlaybackTimerInterval = 1000;

/**
 * Manage for audio player.
 */
export default class AudioPlayerStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {MainWindowContext} context Contect of the main window.
   */
  constructor( context ) {
    super( context );

    /**
     * Audio player.
     * @type {AudioPlayer}
     */
    this._audioPlayer = new AudioPlayer();

    /**
     * Timer identifier that will be called at one-second intervals during playback.
     * @type {Number}
     */
    this._playbackTimerIntervalId = null;

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      currentMusic:  null,
      playbackState: PlaybackState.Stopped
    };

    this.register( Keys.open,   this._actionOpen   );
    this.register( Keys.play,   this._actionPlay   );
    this.register( Keys.pause,  this._actionPause  );
    this.register( Keys.stop,   this._actionStop   );
    this.register( Keys.seek,   this._actionSeek   );
    this.register( Keys.volume, this._actionVolume );
  }

  /**
   * Get the currently music.
   *
   * @return {Music} music.
   */
  get currentMusic() {
    return this.state.currentMusic;
  }

  /**
   * Get the currently playback state.
   *
   * @return {PlaybackState} state.
   */
  get playbackState() {
    return this.state.playbackState;
  }

  /**
   * Get the currently music duration.
   *
   * @return {Number} duration.
   */
  get duration() {
    const duration = this._audioPlayer.duration();
    return ( duration === 0 ? ( this.state.currentMusic ? this.state.currentMusic.duration : 0 ) : duration );
  }

  /**
   * Get the currently playback time.
   *
   * @return {Number} playback time ( milliseconds ).
   */
  get currentTime() {
    return this._audioPlayer.currentTime;
  }

  /**
   * Get the frequency spectrum of an audio.
   *
   * @return {Uint8Array} Spectrums If an audio during playback. Otherwise null.
   */
  get spectrums() {
    return this._audioPlayer.spectrums;
  }

  /**
   * Get the audio volume.
   *
   * @return {Number} volume ( range: 0 - 100 ).
   */
  get volume() {
    return this._audioPlayer.volume;
  }

  /**
   * Open an audio file for playback target.
   *
   * @param {Music}  music     Music.
   * @param {Boolean} withPlay If true to play a audio. Default is false.
   */
  _actionOpen( music, withPlay ) {
    if( !( music ) ) { return; }

    this._audioPlayer.open( music.path, ( err ) => {
      if( err ) {
        if( DEBUG ) { Util.error( err ); }

        this.setState( { currentMusic: null, playbackState: PlaybackState.Stopped } );
        return;
      }

      const state = { currentMusic: music };
      if( withPlay ) {
        this._audioPlayer.play();
        this._startTimer();
        state.playbackState = PlaybackState.Playing;
      }

      this.setState( state );
    } );
  }

  /**
   * Play the audio.
   */
  _actionPlay() {
    if( this.state.currentMusic && this.state.playbackState !== PlaybackState.Playing ) {
      this._audioPlayer.play();
      this._startTimer();
      this.setState( { playbackState: PlaybackState.Playing } );
    }
  }

  /**
   * Pause the currently playback audio.
   */
  _actionPause() {
    if( this.state.currentMusic && this.state.playbackState === PlaybackState.Playing ) {
      this._audioPlayer.pause();
      this._stopTimer();
      this.setState( { playbackState: PlaybackState.Paused } );
    }
  }

  /**
   * Stop the currently playback audio.
   */
  _actionStop() {
    if( this.state.currentMusic && this.state.playbackState !== PlaybackState.Stopped ) {
      this._audioPlayer.stop();
      this._stopTimer();
      this.setState( { playbackState: PlaybackState.Stopped } );
    }
  }

  /**
   * Stop the currently playback audio.
   *
   * @param {Number} position New position ( milliseconds ).
   */
  _actionSeek( position ) {
    if( this.state.currentMusic ) {
      this._audioPlayer.currentTime = position;
      this.setState();
    }
  }

  /**
   * Change the volume fro playback audio.
   *
   * @param {Number} volume New volume ( range: 0 - 100 ).
   */
  _actionVolume( volume ) {
    this._audioPlayer.volume = volume;
    this.setState();
  }

  /**
   * Start the timer.
   */
  _startTimer() {
    this._playbackTimerIntervalId = setInterval( () => {
      if( this._audioPlayer.duration <= this._audioPlayer.currentTime ) {
        this._actionStop();

        const nextMusic = this.context.musicListStore.next( this.state.currentMusic );
        if( nextMusic ) {
          this.context.musicListAction.select( nextMusic );
          this._actionOpen( nextMusic, true );
        }
      }

      this.setState();
    }, PlaybackTimerInterval );
  }

  /**
   * Stop the timer.
   */
  _stopTimer() {
    clearInterval( this._playbackTimerIntervalId );
    this._playbackTimerIntervalId = null;
  }
}
