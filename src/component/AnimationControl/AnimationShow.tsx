/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-29 15:37:00
 */
import * as React from 'react'
import { StaggeredMotion, spring } from 'react-motion'
import './index.css'
import { ReactElement } from '_@types_react@16.8.23@@types/react'

// namespace React {
//    class Item {}
// }
// mock展示数据
const mockContentInfo = [
    { title: '生产总长', num: 92876 },
    { title: '生产总长', num: 92876 },
    { title: '生产总长', num: 92876 },
    { title: '生产总长', num: 92876 },
]
// line
const lineSet = [{ class: 'svg-line1' }, { class: 'svg-line2' }]
interface IIPlainStyle {
    [key: string]: number
}
interface IStyle {
    [key: string]: number | IOpaqueConfig
}
interface IOpaqueConfig {
    val: number
    stiffness: number
    damping: number
    precision: number
}

interface IState {
    unmountComponent?: boolean
    ReceiveProp?: boolean
    isFade?: boolean
    allTransDown?: boolean
}
interface IProps {
    timeout: number
    handleFadeOutShow: () => void
    startPoint: { [propsName: string]: any }
    endPoint: { [propsName: string]: any }
    frameType: string
    transparentDown: boolean
    frameWidth: number
    frameHeight: number
    childShowElement: ReactElement
}
class AnimationShow extends React.Component<IProps, IState> {
    state = {
        unmountComponent: false,
        ReceiveProp: false,
        isFade: false,
        allTransDown: true,
    }
    public fadeOutTimer: any
    // 一端动画标示位
    transDown: boolean = false
    timer: any = null
    // fadeOutTimer: any;

    // componentWillReceiveProps(nextProps) {}
    componentDidMount() {
        this.unmountTransition()
    }
    unmountTransition = () => {
        const timeout = this.props.timeout || 4000
        // console.log("timeout", timeout);
        this.timer = setTimeout(() => {
            this.props.handleFadeOutShow()
            this.setState({ allTransDown: false })
        }, timeout)

        // 淡出动画
        this.fadeOutTimer = setTimeout(() => {
            this.fadeOut()
        }, timeout - 800)
    }

    // 控制淡出动画
    fadeOut = () => {
        // tslint:disable-next-line:no-empty
        this.setState({ isFade: true }, () => {})
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.fadeOutTimer) {
            clearTimeout(this.fadeOutTimer)
        }
    }
    render() {
        const { startPoint, endPoint, frameType, transparentDown, frameWidth, frameHeight } = this.props
        /**
         * 判断线段的连接位置
         * 左边 true
         * 右边 false
         */
        const lineConnectDire: boolean = endPoint.x - startPoint.x > 0 ? true : false

        /**
         * 全透明且为transparentDowntrue
         */
        const transDown: boolean = frameType === 'parent' && transparentDown ? true : false
        /**
         * initPointPoint 坐标点初始坐标
         * initLinePoint 斜线初始坐标
         */
        /**
         *  @param x 旋转图标x坐标
         *  @param y 旋转图标y坐标
         *  @param w 旋转图标宽度
         *  @param h 旋转图标高度
         */
        const initPointPoint: { [propsName: string]: any } = {
            x: startPoint.x,
            y: startPoint.y,
            w: 30,
            h: 30,
        }
        /**
         *  @param x1 line起始x坐标
         *  @param y1 line起始y坐标
         *  @param x2 line终点x坐标
         *  @param y2 line终点y坐标
         *  @param offsetx x轴偏移量
         *  @param offsety y轴偏移量
         *  @param t 动画时间
         *  @param progress svg动画进度 标示位 表示动画是否绘制完毕
         */
        const initLinePoint: { [propsName: string]: any } = {
            x1: initPointPoint.x,
            y1: initPointPoint.y,
            x2: endPoint.x,
            y2: endPoint.y,
            offsetx: initPointPoint.w / 2,
            offsety: initPointPoint.h / 2,
            t: 1,
            progress: 0,
        }
        /**
         * stiffness 和 damping
         * 如果把我们要设置动画的物体想象成弹簧，stiffness相当于弹簧的强度，
         * 其影响的是弹簧回弹的速度，相同damping情况下，stiffness越大，
         * 回弹速度越快；damping是弹簧的减震性，其影响的是弹簧的回弹次数，
         * 相同stiffness情况下，damping越大，回弹次数越少
         */
        /**
         *  @param initialWidth 负数表示初始宽度的时间间隔
         *  @param initialHeight 负数表示初始高度的时间间隔
         */
        const initialWidth: { [propsName: string]: any } = { w: -1000 }
        const initialHeight: { [propsName: string]: any } = { h: -5000 }

        /**
         * @param defaultStyles 初始样式集合
         * @param styles 目标样式集合
         * @param interpolatingStyles transition children DOM
         */
        /**
         * 二段内容区域配置定制
         */
        const secondSetting: { [propsName: string]: any } = { width: frameWidth }

        /**
         *  @param isFade 淡出动画的显示时机
         */
        const { isFade } = this.state
        const { childShowElement } = this.props
        return (
            <React.Fragment>
                {childShowElement && (
                    <div className={isFade ? 'card-fade-out' : ''}>
                        <StaggeredMotion
                            defaultStyles={[initPointPoint, initLinePoint, initialWidth, initialWidth, initialHeight]} // 初始
                            styles={styles => {
                                return styles.map((_: { [propsName: string]: any }, i: number) => {
                                    switch (i) {
                                        case 0:
                                            return {
                                                x: spring(initPointPoint.x),
                                                y: spring(initPointPoint.y),
                                                w: spring(initPointPoint.w),
                                                h: spring(initPointPoint.h),
                                            }
                                        case 1:
                                            return {
                                                x1: spring(initLinePoint.x1), // x
                                                y1: spring(initLinePoint.y1), // y
                                                x2: spring(initLinePoint.x2), // x
                                                y2: spring(initLinePoint.y2), // y
                                                offsetx: spring(initLinePoint.offsetx),
                                                offsety: spring(initLinePoint.offsety),
                                                t: spring(initLinePoint.t), // 动画时间
                                                progress: spring(100), // svg绘制进度
                                            }
                                        case 2:
                                            return { w: spring(secondSetting.width) }
                                        case 3:
                                            return { w: spring(secondSetting.width) }
                                        case 4:
                                            return { h: spring(frameHeight) }
                                        default:
                                            return ''
                                    }
                                })
                            }}
                        >
                            {(interpolatingStyles: any[]) => {
                                return (
                                    <div
                                        className="second-transition"
                                        style={{
                                            // 二段内容区域定制
                                            width: secondSetting.width,
                                            // 二段动画定位(判断连接处的左右方向)
                                            left: lineConnectDire
                                                ? initLinePoint.x2
                                                : initLinePoint.x2 - secondSetting.width,
                                            // 修正二段动画偏移量
                                            top: initLinePoint.y2 - 8,
                                        }}
                                    >
                                        {interpolatingStyles.map((style: { [propsName: string]: any }, i: number) => {
                                            if (style.progress && style.progress > 90 && style.progress < 100) {
                                                // 等待一段动画结束
                                                this.transDown = true
                                            }
                                            switch (i) {
                                                case 0:
                                                    return (
                                                        <div
                                                            className="rotate-point"
                                                            key={i}
                                                            style={{
                                                                top: style.y,
                                                                left: style.x,
                                                                width: style.w,
                                                                height: style.h,
                                                            }}
                                                        >
                                                            <div className="rotate-big" />
                                                            <div className="rotate-inner" />
                                                        </div>
                                                    )
                                                case 1:
                                                    return (
                                                        <div key={i} style={{ position: 'fixed', top: 0, left: 0 }}>
                                                            <svg width="100vw" height="100vh">
                                                                {lineSet.map((item, index) => {
                                                                    return (
                                                                        <line
                                                                            key={index}
                                                                            className={item.class}
                                                                            x1={style.x1 + style.offsetx}
                                                                            y1={style.y1 + style.offsety}
                                                                            x2={style.x2}
                                                                            y2={style.y2}
                                                                        />
                                                                    )
                                                                })}
                                                            </svg>
                                                        </div>
                                                    )
                                                case 2:
                                                    return (
                                                        this.transDown && (
                                                            <div
                                                                className="sec-trans-item2"
                                                                key={i}
                                                                style={{ width: style.w }}
                                                            />
                                                        )
                                                    )
                                                case 3:
                                                    return (
                                                        this.transDown && (
                                                            <div
                                                                className="sec-trans-item1"
                                                                key={i}
                                                                style={{ width: style.w }}
                                                            />
                                                        )
                                                    )
                                                case 4:
                                                    return (
                                                        this.transDown && (
                                                            <div
                                                                className="sec-trans-item3"
                                                                key={i}
                                                                style={{
                                                                    height: style.h,
                                                                    backgroundColor:
                                                                        frameType === 'lucent'
                                                                            ? 'rgba(255, 255, 255, 0.75)'
                                                                            : 'rgba(255, 255, 255, 0)',
                                                                    bottom: transDown ? -frameHeight : '',
                                                                }}
                                                            >
                                                                {childShowElement}
                                                            </div>
                                                        )
                                                    )
                                                default:
                                                    return null
                                            }
                                        })}
                                    </div>
                                )
                            }}
                        </StaggeredMotion>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default AnimationShow
