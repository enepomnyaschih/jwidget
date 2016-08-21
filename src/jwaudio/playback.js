JW.Audio.Playback = JW.ObservableConfig.extend({
    // Events:
    // finish(event)
    
    track     : null,  // [required] JW.Audio.Track
    autoStart : false, // [optional] Boolean
    
    audioEl   : null,  // [readonly] Audio
    status    : 0,     // [readonly] Integer, 0 - ready, 1 - play, 2 - finished
    
    init: function(config)
    {
        this._super(config);
        
        this.__onEnded = this._onEnded.as(this);
        this.track = JW.Audio.Track.create(this.track);
        
        this.audioEl = new Audio();
        
        var src = this.track.ogg;
        if (!this.audioEl.canPlayType("audio/ogg") && this.audioEl.canPlayType("audio/mpeg"))
            src = this.track.mp3;
        
        this.audioEl.src = src;
        
        if (this.audioEl.addEventListener)
            this.audioEl.addEventListener('ended', this.__onEnded, false);
        else
            this.audioEl.onended = this.__onEnded;
        
        if (this.autoStart)
            this.__startTimer = setTimeout(this.start.as(this), 1);
    },
    
    destroy: function()
    {
        this.stop();
        
        this._super();
    },
    
    start: function()
    {
        this._abortAutoStart();
        if (!this.isReady())
            return;
        
        this.status = 1;
        this.audioEl.play();
    },
    
    stop: function()
    {
        this._abortAutoStart();
        if (this.isFinished())
            return;
        
        if (this.isPlay())
            this.audioEl.pause();
        
        if (this.audioEl.addEventListener)
            this.audioEl.removeEventListener('ended', this.__onEnded, false);
        else
            delete this.audioEl.onended;
        
        this.status = 2;
        this.audioEl.src = "/dummy";
        delete this.audioEl;
    },
    
    isReady: function()
    {
        return this.status === 0;
    },
    
    isPlay: function()
    {
        return this.status === 1;
    },
    
    isFinished: function()
    {
        return this.status === 2;
    },
    
    _abortAutoStart: function()
    {
        if (!this.__startTimer)
            return;
        
        clearTimeout(this.__startTimer);
        delete this.__startTimer;
    },
    
    _onEnded: function()
    {
        this.stop();
        this.trigger("finish");
    }
});
