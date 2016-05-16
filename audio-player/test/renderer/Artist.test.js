import assert from 'assert';
import TestDataUtil from '../TestDataUtil.js';
import Artist from '../../src/js/renderer/main/model/Artist.js';
import Album from '../../src/js/renderer/main/model/Album.js';

/** @test {Artist} */
describe( 'Artist', () => {
  /** @test {Artist#findByMusic} */
  it( 'findByMusic', () => {
    const artists = TestDataUtil.createArtists(  );

    const artist = Artist.findByMusic( artists, artists[ 1 ].albums[ 0 ].musics[ 1 ] );
    assert( artist.name === 'artist 1' );
  } );

  /** @test {Artist#add} */
  it( 'add', () => {
    const artist = new Artist( 'artist' );
    const album  = new Album( 'artist', 'album' );
    for( let i = 0; i < 2; ++i ) {
      album.add( TestDataUtil.createMusic( i, i, 'artist', album.name ) );
    }

    artist.add( album );

    assert( artist.albums.length === 1 );
    assert( artist.image === album.image );
    assert( artist.image === album.musics[ 0 ].image );
  } );

  /** @test {Artist#remove} */
  it( 'remove', () => {
    const artist = new Artist( 'artist' );
    const album  = new Album( 'artist', 'album' );
    for( let i = 0; i < 2; ++i ) {
      album.add( TestDataUtil.createMusic( i, i, 'artist', album.name ) );
    }

    artist.add( album );
    assert( artist.albums.length === 1 );

    artist.remove( album );
    assert( artist.albums.length === 0 );
    assert( !( artist.image ) );
  } );

} );
