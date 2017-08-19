(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};



        /**
        * @desc Using getAlbum method to store the album information
        * @type {object}
        */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */

         var currentBuzzObject = null;

         /**
         * @function playSong
         * @desc Set the playing property of the song object to ture and plays currentBuzzObject
         * @param {Object} song
         */
         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
         }

         var getSongIndex = function(song) {
           return currentAlbum.songs.indexOf(song);
           };

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
           if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
           }

           /**
           * @desc Buzz object audio file
           * @type {Object}
           */
           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

           /**
           * @desc Obtains index of song within album
           * @type {Object}
           */

           SongPlayer.currentSong = song;
       };

       /**
       * @function play
       * @desc Play current or new song
       * @param {Object} song
       */
        SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
              setSong(song);
              playSong(song);
           } else if (SongPlayer.currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
           }
         }
       };

       /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
       };

       /**
        * @function previous song
        * @desc Play previous song
        * @param {Object} song
        */
       SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
       };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
