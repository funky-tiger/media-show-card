/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-22 16:49:40
 */
import * as React from 'react'
// @ts-ignore
import video1 from './assets/video/video1.mp4'
import { MediaCardShow } from '../../src/component/AnimationControl/index'

interface IObjects {
    [propsName: string]: any
}

// tslint:disable-next-line:no-empty-interface
interface IProps {}

interface IStates {
    mockData: IObjects[]
    currentShowSec: number
    timePoint: number[]
    serializeData: IObjects[]
    showData: IObjects
}
class App extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            mockData: [],
            currentShowSec: 0,
            timePoint: [1, 5, 10, 14, 19], // 动画展示节点
            serializeData: [], // 展示数据与配置
            showData: {},
        }
    }
    componentDidMount() {
        this.setState({
            mockData: [
                {
                    showSecond: 1,
                    data: [
                        {
                            startPoint: { x: 450, y: 300 },
                            endPoint: { x: 600, y: 430 },
                            frameType: 'lucent',
                            transparentDown: false,
                            frameWidth: 300,
                            frameHeight: 150,
                            timeout: 3800,
                        },
                    ],
                },
                {
                    showSecond: 5,
                    data: [
                        {
                            startPoint: { x: 250, y: 455 },
                            endPoint: { x: 350, y: 700 },
                            frameType: 'lucent',
                            transparentDown: false,
                            frameWidth: 350,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                    ],
                },
                {
                    showSecond: 10,
                    data: [
                        {
                            startPoint: { x: 320, y: 510 },
                            endPoint: { x: 400, y: 680 },
                            frameType: 'parent',
                            transparentDown: false,
                            frameWidth: 100,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                        {
                            startPoint: { x: 500, y: 510 },
                            endPoint: { x: 600, y: 380 },
                            frameType: 'parent',
                            transparentDown: true,
                            frameWidth: 100,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                        {
                            startPoint: { x: 685, y: 510 },
                            endPoint: { x: 750, y: 680 },
                            frameType: 'parent',
                            transparentDown: false,
                            frameWidth: 100,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                        {
                            startPoint: { x: 880, y: 510 },
                            endPoint: { x: 980, y: 380 },
                            frameType: 'parent',
                            transparentDown: true,
                            frameWidth: 100,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                    ],
                },
                {
                    showSecond: 14,
                    data: [
                        {
                            startPoint: { x: 1020, y: 452 },
                            endPoint: { x: 1050, y: 350 },
                            frameType: 'lucent',
                            transparentDown: false,
                            frameWidth: 350,
                            frameHeight: 180,
                            timeout: 4000,
                        },
                    ],
                },
                {
                    showSecond: 19,
                    data: [
                        {
                            startPoint: { x: 980, y: 360 },
                            endPoint: { x: 850, y: 450 },
                            frameType: 'lucent',
                            transparentDown: false,
                            frameWidth: 200,
                            frameHeight: 100,
                            timeout: 4000,
                        },
                    ],
                },
            ],
        })
    }
    getDom = (currentTime: number): any => {
        switch (currentTime) {
            case 0:
                return (
                    <div>
                        <div
                            style={{
                                fontSize: '50px',
                                textAlign: 'center',
                                color: 'pink',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            展示组件1
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <div
                            style={{
                                fontSize: '30px',
                                textAlign: 'center',
                                color: 'blue',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            展示组件2
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div
                            style={{
                                fontSize: '15px',
                                marginTop: '50px',
                                color: 'purple',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件3-1
                        </div>
                        <div
                            style={{
                                fontSize: '15px',
                                marginTop: '50px',
                                color: 'skyblue',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件3-2
                        </div>
                        <div
                            style={{
                                fontSize: '15px',
                                marginTop: '50px',
                                color: 'orange',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件3-3
                        </div>
                        <div
                            style={{
                                fontSize: '15px',
                                marginTop: '50px',
                                color: 'hotpink',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件3-4
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <div
                            style={{
                                fontSize: '55px',
                                color: 'purple',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件4
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <div
                            style={{
                                fontSize: '20px',
                                color: 'hotpink',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                        >
                            展示组件5
                        </div>
                    </div>
                )
            default:
                return <div />
        }
    }
    render() {
        const { mockData } = this.state
        console.log('mockData', mockData)
        return (
            <React.Fragment>
                <div style={{ width: '100vw', height: '100vh' }}>
                    {mockData.length !== 0 && (
                        <MediaCardShow src={video1} serializeData={mockData} serializeDom={this.getDom} />
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default App
