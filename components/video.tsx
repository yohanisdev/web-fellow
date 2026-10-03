import React from 'react';

const VideoPlayer = () => {
    return (
        <div>
            <video width="320" height="180" loop muted autoPlay>
                <source src="/InShot_20260829_131944163.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
