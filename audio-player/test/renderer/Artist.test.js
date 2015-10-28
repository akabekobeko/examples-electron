import assert       from 'power-assert';
import TestDataUtil from '../TestDataUtil.js';
import Artist       from '../../src/js/renderer/model/Artist.js';

/** @test {Artist} */
describe( 'Artist', () => {
  /** @test {Artist#findByMusic} */
  it( 'findByMusic', () => {
    const artists = TestDataUtil.createArtists(  );

    const artist = Artist.findByMusic( artists, artists[ 1 ].albums[ 0 ].musics[ 1 ] );
    assert( artist.name === 'artist 1' );
  } );
} );
