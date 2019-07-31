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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-29 15:37:00
 */
var React = __importStar(require("react"));
var react_motion_1 = require("react-motion");
require("./index.css");
// namespace React {
//    class Item {}
// }
// mock展示数据
var mockContentInfo = [
    { title: "生产总长", num: 92876 },
    { title: "生产总长", num: 92876 },
    { title: "生产总长", num: 92876 },
    { title: "生产总长", num: 92876 }
];
// line
var lineSet = [{ class: "svg-line1" }, { class: "svg-line2" }];
var AnimationShow = /** @class */ (function (_super) {
    __extends(AnimationShow, _super);
    function AnimationShow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            unmountComponent: false,
            ReceiveProp: false,
            isFade: false,
            allTransDown: true
        };
        // 一端动画标示位
        _this.transDown = false;
        _this.timer = null;
        _this.unmountTransition = function () {
            var timeout = _this.props.timeout || 4000;
            // console.log("timeout", timeout);
            _this.timer = setTimeout(function () {
                _this.props.handleFadeOutShow();
                _this.setState({ allTransDown: false });
            }, timeout);
            // 淡出动画
            _this.fadeOutTimer = setTimeout(function () {
                _this.fadeOut();
            }, timeout - 800);
        };
        // 控制淡出动画
        _this.fadeOut = function () {
            _this.setState({ isFade: true }, function () { });
        };
        return _this;
    }
    // fadeOutTimer: any;
    // componentWillReceiveProps(nextProps) {}
    AnimationShow.prototype.componentDidMount = function () {
        this.unmountTransition();
    };
    AnimationShow.prototype.componentWillUnmount = function () {
        this.setState = function (state, callback) {
            return;
        };
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.fadeOutTimer) {
            clearTimeout(this.fadeOutTimer);
        }
    };
    AnimationShow.prototype.render = function () {
        var _this = this;
        var _a = this.props, startPoint = _a.startPoint, endPoint = _a.endPoint, frameType = _a.frameType, transparentDown = _a.transparentDown, frameWidth = _a.frameWidth, frameHeight = _a.frameHeight;
        /**
         * 判断线段的连接位置
         * 左边 true
         * 右边 false
         */
        var lineConnectDire = endPoint.x - startPoint.x > 0 ? true : false;
        /**
         * 全透明且为transparentDowntrue
         */
        var transDown = frameType === "parent" && transparentDown ? true : false;
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
        var initPointPoint = {
            x: startPoint.x,
            y: startPoint.y,
            w: 30,
            h: 30
        };
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
        var initLinePoint = {
            x1: initPointPoint.x,
            y1: initPointPoint.y,
            x2: endPoint.x,
            y2: endPoint.y,
            offsetx: initPointPoint.w / 2,
            offsety: initPointPoint.h / 2,
            t: 1,
            progress: 0
        };
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
        var initialWidth = { w: -1000 };
        var initialHeight = { h: -5000 };
        /**
         * @param defaultStyles 初始样式集合
         * @param styles 目标样式集合
         * @param interpolatingStyles transition children DOM
         */
        /**
         * 二段内容区域配置定制
         */
        var secondSetting = { width: frameWidth };
        /**
         *  @param isFade 淡出动画的显示时机
         */
        var isFade = this.state.isFade;
        var childShowElement = this.props.childShowElement;
        return (React.createElement(React.Fragment, null, childShowElement && (React.createElement("div", { className: isFade ? "card-fade-out" : "" },
            React.createElement(react_motion_1.StaggeredMotion, { defaultStyles: [
                    initPointPoint,
                    initLinePoint,
                    initialWidth,
                    initialWidth,
                    initialHeight
                ], styles: function (styles) {
                    return styles.map(function (_, i) {
                        switch (i) {
                            case 0:
                                return {
                                    x: react_motion_1.spring(initPointPoint.x),
                                    y: react_motion_1.spring(initPointPoint.y),
                                    w: react_motion_1.spring(initPointPoint.w),
                                    h: react_motion_1.spring(initPointPoint.h)
                                };
                            case 1:
                                return {
                                    x1: react_motion_1.spring(initLinePoint.x1),
                                    y1: react_motion_1.spring(initLinePoint.y1),
                                    x2: react_motion_1.spring(initLinePoint.x2),
                                    y2: react_motion_1.spring(initLinePoint.y2),
                                    offsetx: react_motion_1.spring(initLinePoint.offsetx),
                                    offsety: react_motion_1.spring(initLinePoint.offsety),
                                    t: react_motion_1.spring(initLinePoint.t),
                                    progress: react_motion_1.spring(100) // svg绘制进度
                                };
                            case 2:
                                return { w: react_motion_1.spring(secondSetting.width) };
                            case 3:
                                return { w: react_motion_1.spring(secondSetting.width) };
                            case 4:
                                return { h: react_motion_1.spring(frameHeight) };
                            default:
                                return "";
                        }
                    });
                } }, function (interpolatingStyles) {
                return (React.createElement("div", { className: "second-transition", style: {
                        // 二段内容区域定制
                        width: secondSetting.width,
                        // 二段动画定位(判断连接处的左右方向)
                        left: lineConnectDire
                            ? initLinePoint.x2
                            : initLinePoint.x2 - secondSetting.width,
                        // 修正二段动画偏移量
                        top: initLinePoint.y2 - 8
                    } }, interpolatingStyles.map(function (style, i) {
                    if (style.progress &&
                        style.progress > 90 &&
                        style.progress < 100) {
                        // 等待一段动画结束
                        _this.transDown = true;
                    }
                    switch (i) {
                        case 0:
                            return (React.createElement("div", { className: "rotate-point", key: i, style: {
                                    top: style.y,
                                    left: style.x,
                                    width: style.w,
                                    height: style.h
                                } },
                                React.createElement("div", { className: "rotate-big" }),
                                React.createElement("div", { className: "rotate-inner" })));
                        case 1:
                            return (React.createElement("div", { key: i, style: { position: "fixed", top: 0, left: 0 } },
                                React.createElement("svg", { width: "100vw", height: "100vh" }, lineSet.map(function (item, index) {
                                    return (React.createElement("line", { key: index, className: item.class, x1: style.x1 + style.offsetx, y1: style.y1 + style.offsety, x2: style.x2, y2: style.y2 }));
                                }))));
                        case 2:
                            return (_this.transDown && (React.createElement("div", { className: "sec-trans-item2", key: i, style: { width: style.w } })));
                        case 3:
                            return (_this.transDown && (React.createElement("div", { className: "sec-trans-item1", key: i, style: { width: style.w } })));
                        case 4:
                            return (_this.transDown && (React.createElement("div", { className: "sec-trans-item3", key: i, style: {
                                    height: style.h,
                                    backgroundColor: frameType === "lucent"
                                        ? "rgba(255, 255, 255, 0.75)"
                                        : "rgba(255, 255, 255, 0)",
                                    bottom: transDown ? -frameHeight : ""
                                } }, childShowElement)));
                        default:
                            return null;
                    }
                })));
            })))));
    };
    return AnimationShow;
}(React.Component));
exports.default = AnimationShow;
