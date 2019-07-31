/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-29 11:44:18
 * @LastEditTime: 2019-07-29 15:39:12
 */
import * as React from 'react'
import AnimationShow from './AnimationShow'

interface IOptionsSetting {
    setting: any[]
}
interface IProps {
    serializeData: IObjects[]
    src: string
    serializeDom: (num: number) => React.Component
}
interface IObjects {
    [propsName: string]: any
}

export default function() {
    return function decorate(WrappedComponent: any) {
        //
        class ProxyComponent extends React.Component<IProps> {
            // class ProxyComponent extends React.Component<IProps, null> {
            constructor(props: IProps) {
                super(props)
            }
            getAnimationShow = (fadeOutFunc: () => void, options: IOptionsSetting) => {
                let failedRender = false
                const AnimationSetting: IObjects = options.setting || []
                return (fieldElement: React.ReactElement) => {
                    // 因为fieldElement是实例原生DOM组件 所以不能通过props进行传值 通过克隆一份ReactElement组件，再将props传递给该组件
                    const inputElement: React.ReactElement = React.cloneElement(fieldElement)
                    let inputElementArr: string[] | string | null = null
                    if (!Array.isArray(AnimationSetting)) {
                        throw Error('setting必须是一个数组')
                    }
                    if (AnimationSetting.length > 1) {
                        // 多个组件
                        inputElementArr = inputElement.props.children
                    } else {
                        // 单个组件
                        if (typeof inputElement.props.children === 'string') {
                            inputElementArr = [inputElement.props.children]
                            return
                        }
                        inputElementArr = [inputElement.props.children]
                    }
                    if ((inputElementArr as []).length === 0) {
                        failedRender = true
                    }
                    console.log('AnimationSetting', AnimationSetting)
                    return (
                        <div className="tiger">
                            <React.Fragment>
                                {AnimationSetting.length !== 0 &&
                                    !failedRender &&
                                    AnimationSetting.map((item, index) => {
                                        return (
                                            <AnimationShow
                                                key={index}
                                                {...item}
                                                childShowElement={(inputElementArr as [])[index]}
                                                handleFadeOutShow={fadeOutFunc}
                                            />
                                        )
                                    })}
                            </React.Fragment>
                        </div>
                    )
                }
            }

            render() {
                const controlProps = {
                    control: {
                        getAnimationShow: this.getAnimationShow,
                    },
                }
                // 实现对WrappedComponent组件的增强，组件获得{...props}属性
                return <WrappedComponent {...controlProps} {...this.props} />
            }
        }
        return ProxyComponent
    }
}
