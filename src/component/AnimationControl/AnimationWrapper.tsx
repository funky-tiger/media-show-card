/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 13:59:39
 * @LastEditTime: 2019-07-22 16:18:43
 */
import * as React from 'react'
import AnimationShowVideo from './AnimationShowVideo'
import control from './control'

export default class AnimationWrapper extends React.Component {
    static VideoBg = AnimationShowVideo
    static control = control
    render() {
        return <div {...this.props}></div>
    }
}
