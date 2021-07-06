import React, { useEffect } from "react"
import JMuxer from "jmuxer"

const Buffer = require('buffer').Buffer

const VideoFeed = ({ DroneVideoFeed }) => {

    useEffect(() => {
        let jmuxer = new JMuxer({
            node: 'player',
            mode: 'video',
            fps: 30,
            flushingTime: 1
        })

        const parseVideo = (dataStream) => {
            jmuxer.feed({
                video: Buffer.from(dataStream)
            })
        }

        DroneVideoFeed.on('message', (videoDataStream) => {
            parseVideo(videoDataStream)
        })

    }, [])

    return (
        <div>
            <div id="videoFeed">
                <video autoPlay={true} id={"player"}></video>
            </div>
        </div>
    )
}

export default VideoFeed