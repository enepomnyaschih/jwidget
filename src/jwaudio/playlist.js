JW.Audio.Playlist = JW.ObservableConfig.extend({
    // Events:
    // trackchange(event, track)
    
    tracks   : null,  // [optional] Array of JW.Audio.Track
    
    playback : null,  // [readonly] JW.Audio.Playback
    index    : null,  // [readonly] Integer
    
    init: function(config)
    {
        this._super(config);
        
        this.tracks = JW.makeArray(this.tracks).map(JW.Audio.Track.create);
    },
    
    destroy: function()
    {
        this.stop();
        
        this._super();
    },
    
    next: function()
    {
        this.stop();
        
        if (this.tracks.isEmpty())
            return;
        
        if (JW.isSet(this.index))
            this.index = (this.index + 1) % this.tracks.length;
        
        this.play();
    },
    
    play: function()
    {
        this.stop();
        
        if (this.tracks.isEmpty())
            return;
        
        this.index = JW.defn(this.index, 0);
        
        var track = this.getCurrentTrack();
        
        this.playback = track.play();
        this.playback.bind("finish", this.next.as(this), this);
        
        this.trigger("trackchange", track);
    },
    
    stop: function()
    {
        if (!this.isPlay())
            return;
        
        this.playback.destroy();
        delete this.playback;
    },
    
    getCurrentTrack: function()
    {
        if (this.tracks.isEmpty() || !JW.isSet(this.index))
            return null;
        
        return this.tracks[this.index];
    },
    
    isPlay: function()
    {
        return JW.isSet(this.playback);
    }
});
