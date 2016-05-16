import assert from 'assert';
import TestDataUtil from '../TestDataUtil.js';
import Album from '../../src/js/renderer/main/model/Album.js';

/** @test {Album} */
describe( 'Album', () => {
  /** @test {Album#findByMusic} */
  it( 'findByMusic', () => {
    const albums = [];
    for( let i = 0; i < 2; ++i ) {
      const album = new Album( 'test', 'album ' + i );
      for( let j = 0; j < 2; ++j ) {
        album.add( TestDataUtil.createMusic( j, i + '-' + j, 'artist', album.name ) );
      }

      albums.push( album );
    }

    const target = Album.findByMusic( albums, albums[ 1 ].musics[ 1 ] );
    assert( target ===  albums[ 1 ] );
  } );

  /** @test {Album#add} */
  it( 'add', () => {
    const album = new Album( 'test', 'album' );
    for( let i = 0; i < 2; ++i ) {
      album.add( TestDataUtil.createMusic( i, i, 'artist', album.name ) );
    }

    // Always top
    assert( album.year  === album.musics[ 0 ].year );
    assert( album.image === album.musics[ 0 ].image );
  } );

  /** @test {Album#remove} */
  it( 'remove', () => {
    const album = new Album( 'test', 'album' );
    for( let i = 0; i < 3; ++i ) {
      album.add( TestDataUtil.createMusic( i, i, 'artist', album.name ) );
    }

    album.remove( album.musics[ 0 ] );

    // Count
    assert( album.musics.length === 2 );

    // Change top
    assert( album.year  === album.musics[ 0 ].year );
    assert( album.image === album.musics[ 0 ].image );
  } );
} );
