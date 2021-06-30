import React, { useState, useEffect } from "react"

const VideoFeed = ({ DroneVideoFeed }) => {

    DroneVideoFeed.on('message', (videoDataStream) => {
        console.log('Video Feed Stream : ', videoDataStream)
    })

    return (
        <div>
            Drone Video Feed
        </div>
    )
}

export default VideoFeed