class Delay extends TweenCore
{
    constructor()
    {
        super();
        //private
        this.delay = null;
    }
    
    to(duration, complete,
                 completeArg) {
        this.duration = duration;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
    }
    
    update(delta)
    {
        if (this.delay)
        {
            this.time += delta * this.motionSpeed;
            if (this.time < this.delay)
                return;
            this.time = 0;
            this.delay = null;
        }
        this.tweenCoreUpdate(delta);
        
        if (this.percent >= 1)
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
