class TweenManager
{
    static add(tween)
    {
        if (TweenManager.tweens.indexOf(tween) === -1)
            TweenManager.tweens.push(tween);
    }
    
    static remove(tween)
    {
        const i = TweenManager.tweens.indexOf(tween);
        if (i !== -1)
            TweenManager.tweens[i] = null;
    }
    
    static setMotionSpeed(value)
    {
        const n = TweenManager.tweens.length;
        for (let i = 0; i < n; ++i)
            if (TweenManager.tweens[i])
                TweenManager.tweens[i].motionSpeed = value;
    }
    
    static delayCall(duration, complete,
                               completeArg) {
        const delay = TweenManager.delaysPool.pop() || new Delay();
        delay.to(duration,
            function(delay) {
                TweenManager.remove(delay);
                TweenManager.delaysPool.push(delay);
                complete(completeArg);
            }, delay);
        TweenManager.add(delay);
        
        return delay;
    }
    
    static delayFramesCall(frames, complete,
                                   completeArg) {
        const delay = TweenManager.delaysFramesPool.pop() || new DelayFrames();
        delay.to(frames,
            function(delay) {
                TweenManager.remove(delay);
                TweenManager.delaysFramesPool.push(delay);
                complete(completeArg);
            }, delay);
        TweenManager.add(delay);
        
        return delay;
    }
    
    static stopDelay(delay)
    {
        TweenManager.remove(delay);
        if (TweenManager.delaysPool.indexOf(delay) === -1)
            TweenManager.delaysPool.push(delay);
    }
    
    static stopDelayFrames(delay)
    {
        TweenManager.remove(delay);
        if (TweenManager.delaysFramesPool.indexOf(delay) === -1)
            TweenManager.delaysFramesPool.push(delay);
    }
    
    update(delta)
    {
        var n = TweenManager.tweens.length,
            c = 0;
        if (n === 0)
            return;
        for (var i = 0; i < n; ++i)
        {
            const tween = TweenManager.tweens[i];
            if (tween)
            {
                if (c !== i) {
                    TweenManager.tweens[c] = tween;
                    TweenManager.tweens[i] = null;
                }
                tween.update(delta);
                ++c;
            }
        }
        
        if (c !== i)
        {
            n = TweenManager.tweens.length;
            while (i < n)
                TweenManager.tweens[c++] = TweenManager.tweens[i++];
            
            TweenManager.tweens.length = c;
        }
    }
}

TweenManager.delaysPool = [];
TweenManager.delaysFramesPool = [];
TweenManager.tweens = [];
