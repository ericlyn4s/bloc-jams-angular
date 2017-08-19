(function() {
    function SongPlayer() {
         var SongPlayer = {};

         var currentSong = null;
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

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
           if (currentBuzzObject) {
             currentBuzzObject.stop();
             currentSong.playing = null;
           }

           /**
           * @desc Buzz object audio file
           * @type {Object}
           */
           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

           currentSong = song;
       };

         SongPlayer.play = function(song) {
           if (currentSong !== song) {
              setSong(song);
              playSong(song);
           } else if (currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
           }
         }
       };

        SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
       };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
