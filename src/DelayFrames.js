class DelayFrames extends TweenCore
{
    constructor()
    {
        super();
        //protected private
        this.frames = null;
        this.frame  = 0;
    }
    
    to(frames, complete,
               completeArg) {
        this.frames      = frames;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.frame       = 0;
    }
    
    update(delta)
    {
        this.tweenCoreUpdate(delta);
        
        ++this.frame;
        if (this.frame === this.frames)
        {
            let tComplete = this.complete;
            this.complete = null;
            if (tComplete)
            {
                if (this.completeArg)
                    tComplete(this.completeArg);
                else
                    tComplete();
                tComplete = null;
            }
        }
    }
}
