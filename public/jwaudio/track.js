JW.Audio.Track = JW.Config.extend({
    mp3 : null, // [required] String, URL
    ogg : null, // [required] String, URL
    
    play: function()
    {
        return new JW.Audio.Playback({
            track     : this,
            autoStart : true
        });
    },
    
    createPlayback: function()
    {
        return new JW.Audio.Playback({
            track : this
        });
    }
});
