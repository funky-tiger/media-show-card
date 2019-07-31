/* eslint-disable radix */
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:01:20
 * @LastEditTime: 2019-07-29 13:52:22
 */
import * as React from 'react'

interface IProps {
    timePoint: number[]
    handleToggleNextShow: (time: number) => void
    src: string
    autoPlay: boolean
    // loop: boolean | undefined;
    loop: any
    style: { [propsName: string]: any }
}

export default class AnimationShowVideo extends React.Component<IProps> {
    state = {}
    public video: any
    componentDidMount() {
        setTimeout(() => {
            const { timePoint, handleToggleNextShow } = this.props
            console.log('timePoint', this.props)
            // 监听视频播放事件
            this.video.addEventListener('timeupdate', () => {
                // 视频当前播放时间
                // tslint:disable-next-line:radix
                const currentTime = parseInt(this.video.currentTime)
                if (timePoint.indexOf(currentTime) > -1) {
                    handleToggleNextShow(currentTime)
                }
            })
        }, 500)
    }
    render() {
        const { src, autoPlay, loop, style } = this.props
        return (
            // 无滚动条
            <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                <video
                    muted
                    ref={video => (this.video = video)}
                    src={src ? src : ''}
                    autoPlay={autoPlay ? true : false}
                    // autoPlay={true}
                    loop={loop ? loop : 'loop'}
                    // loop={true}
                    style={style ? style : {}}
                />
            </div>
        )
    }
}
