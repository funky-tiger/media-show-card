# 简单介绍

- 一款可以配置起点和终点以及定制展示区域的 dom 视频展示卡片信息的插件

# 插件原理

- `<AnimationControl/>` 对原组件进行分割，将其视频播放和数据动画展示分开，分为 `<AnimationWrapper.VideoBg/>`和`<control/>`

## <AnimationControl />

- control 是一个高阶组件， 在 control 中, 通过 this.props.control.getAnimationShow()来获取通过 props 的传值
- 同时，通过引入 <AnimationShow /> 组件 来进行对原组件的增强 从而增加原组件动画渲染的特性
- AnimationControl 组件的主要作用是对传入的数据和通过 AnimationControl.VideoBg 获取的相应时间节点进行处理，将处理后的数据和配置等传入给高阶组件 control。它对 AnimationWrapper.VideoBg 和 control 进行了深入一层的包裹，该组件需传入 src/serializeData 和 serializeDom.
  > 该组件中通过 AnimationControl.VideoBg 组件获取的动画展示的时间节点

## <AnimationControl.VideoBg />

- AnimationControl.VideoBg 组件是一个纯展示 video 组件，需要传入 video 的 src 和时间节点 timeout 以及 handleToggleNextShow 的回调（该函数会在到相应时间节点时触发）等一些配置，其组件内部主要功能是解析该 video，获取相关时间参数，返回给主组件 AnimationControl 使用
- conntrol 是一个高阶组件，实现对 AnimationControl 组件的增强，使组件获得{...props}属性。它返回了通过 AnimationShow 组件包裹后的 dom，并生成动画。它对外暴露了 getAnimationShow 方法，该方法需要传入三个参数，第一个参数是动画消失时机的回调 handleFadeOutShow，第二个参数是相关动画展示的一些配置和动画的数量等，第三个参数是相应动画对应的 dom，通过 props.children 获取到传入的 dom，将其 dom 再次传给最终的动画组件 AnimationShow

- AnimationShow 组件是动画组件，它将其动画分为 5 段，1 段：图标旋转，2 段： svg 画线，3 段和 4 段画出两个粗细不同的直线，最终 5 段动画来渲染通过高阶组件传入的 dom, 该组件需要传入一些配置...

## 使用方法

- 安装
  > `npm i media-show-card -S`
- 组件中引入
  > `import MediaCardShow from 'media-show-card'`
- <MediaCardShow /> 组件中传入相应参数

  > `<MediaCardShow src={videoSrc} serializeData={serializeData} serializeDom={this.serializeDom} />`

- 相关参数 （3 个 必传）

  > src -> string 视频源

  > serializeData -> object 动画在相应时间节点展示的相关配置

  > serializeDom -> func 动画在相应时间节点展示的 DOM

- 例子:
  > ` serializeData: [
        {
          showSecond: 1,
          data: [
            {
              startPoint: { x: 450, y: 300 },
              endPoint: { x: 600, y: 430 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 500,
              frameHeight: 200,
              timeout: 3800
            }
          ]
        }
        ]`
- 展示动画 DOM:
  > `serializeDom = currentTime => {
        switch (currentTime) {
          case 0:
            return (
              <div>
                <div style={{ fontSize: "50px",color:'red' }}>传递的组件1</div>
              </div>
            );
          }
      }`
- serializeData 参数中具体意义
  - `@param startPoint Object 展示区卡片的起点坐标`
  - `@param endPoint Object 展示区卡片的终点坐标`
  - `@param frameType 展示区类型 ： A. lucent string 半透明 B. parent string 全透明`
  - `@param transparentDown boolen 全透明情况下的下方展示(必须 frameType 为 parent)`
  - `@param frameWidth number 展示区宽度`
  - `@param frameHeight number 展示区高度`
  - `@param timeout number 动画展示时长(默认4000毫秒)`

## 注意点

- 每个动画的配置和 dom 的数量/结构是否对应(参考上方例子 或者 该插件的 example 目录)
- 一个时间节点有多个动画的情况，dom 的结构要同级(除了第一层 dom，其他不要出现父子结构)
- 默认在不传动画展示 DOM 情况下不显示整个动画过程以及 DOM
- 使用 AnimationControl 组件时确保 serializeData 有值
- 推荐写法 `{this.state.serializeData.length !== 0 && (`
  `<AnimationControl src={video1} serializeData={serializeData} serializeDom={this.getDom} />`
  `)}`
- 视频默认开启自动无线循环播放

# 开发过程中所遇到的问题

- <1> AnimationShow 组件内存泄漏
- 原因（2 个）

  > A. 组件卸载时没有及时清除定时器.
  > 解决办法:清除所有定时器: `componentWillUnmount() {clearTimeout(timer); }`
  > B. 组件还没挂载时/组件卸载时使用 setState()等异步方法
  > 解决办法:清除所有的 state 状态: `this.setState = (state, callback) => {return; };`

- <2> <AnimationControl />组件的 props 丢失问题
- 原因
  > A.因为该组件是通过高阶函数 control 进行包裹， 其中的 props 可能没处理好.
  > 解决办法:在高阶组件中将{this.props}和新的 {props} 合并后再传给代理组件 ProxyComponent

##homepage

> https://github.com/funky-tiger/media-show-card/blob/master/README.md

##issues

> https://github.com/funky-tiger/media-show-card/issues
