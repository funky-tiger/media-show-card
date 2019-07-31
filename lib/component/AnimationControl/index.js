"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-29 13:51:13
 */
var React = __importStar(require("react"));
var AnimationWrapper_1 = __importDefault(require("./AnimationWrapper"));
var AnimationControl = /** @class */ (function (_super) {
    __extends(AnimationControl, _super);
    function AnimationControl(props) {
        var _this = _super.call(this, props) || this;
        /**
         * handleToggleNextShow 切换动画的回调
         * @param currentShowSec number 动画时间节点秒数
         */
        _this.handleToggleNextShow = function (currentShowSec) {
            var timePoint = _this.state.timePoint;
            var serializeData = _this.props.serializeData;
            // 获取当前该动画的数据
            _this.setState({
                transData: serializeData[timePoint.indexOf(currentShowSec)].data,
                currentTime: timePoint.indexOf(currentShowSec)
            });
        };
        /**
         * handleFadeOutShow 淡出动画
         */
        _this.handleFadeOutShow = function () {
            console.log("该动画即将结束");
            _this.setState({ transData: [] });
        };
        _this.state = {
            transData: [],
            timePoint: [],
            currentTime: 0 // 当前动画时间节点
        };
        return _this;
    }
    AnimationControl.prototype.componentDidMount = function () {
        console.log("propssssss:", this.props);
        /** 处理动画时间节点 timePoint */
        var serializeData = this.props.serializeData;
        var timePoint = [];
        serializeData.forEach(function (item) {
            timePoint.push(item.showSecond);
        });
        this.setState({ timePoint: timePoint });
    };
    AnimationControl.prototype.render = function () {
        /**
         * @param startPoint Object 起点坐标
         * @param endPoint Object 终点坐标
         * @param frameType 展示区类型
         *        @param lucent string 半透明
         *        @param parent string 全透明
         * @param transparentDown boolen 全透明情况下的下方展示(必须frameType为parent)
         * @param frameWidth number 展示区宽度
         * @param frameHeight number 展示区高度
         * @param timeout number 动画展示时长
         * @param timePoint number[] 动画展示的时间节点
         * @param handleToggleNextShow func 隐藏显示信息卡片
         */
        var _a = this.state, transData = _a.transData, timePoint = _a.timePoint, currentTime = _a.currentTime;
        var _b = this.props, src = _b.src, control = _b.control, serializeDom = _b.serializeDom;
        console.log("transData", transData);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { width: "100vw", height: "100vh" } },
                timePoint.length !== 0 && (React.createElement(AnimationWrapper_1.default.VideoBg, { src: src, autoPlay: true, loop: true, style: { width: "100%", height: "100%" }, timePoint: timePoint, handleToggleNextShow: this.handleToggleNextShow })),
                control.getAnimationShow(this.handleFadeOutShow, {
                    setting: transData
                })(serializeDom(currentTime)))));
    };
    return AnimationControl;
}(React.Component));
exports.default = AnimationWrapper_1.default.control()(AnimationControl);
