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
/* eslint-disable radix */
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:01:20
 * @LastEditTime: 2019-07-29 13:52:22
 */
var React = __importStar(require("react"));
var AnimationShowVideo = /** @class */ (function (_super) {
    __extends(AnimationShowVideo, _super);
    function AnimationShowVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    AnimationShowVideo.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            var _a = _this.props, timePoint = _a.timePoint, handleToggleNextShow = _a.handleToggleNextShow;
            console.log('timePoint', _this.props);
            // 监听视频播放事件
            _this.video.addEventListener('timeupdate', function () {
                // 视频当前播放时间
                // tslint:disable-next-line:radix
                var currentTime = parseInt(_this.video.currentTime);
                if (timePoint.indexOf(currentTime) > -1) {
                    handleToggleNextShow(currentTime);
                }
            });
        }, 500);
    };
    AnimationShowVideo.prototype.render = function () {
        var _this = this;
        var _a = this.props, src = _a.src, autoPlay = _a.autoPlay, loop = _a.loop, style = _a.style;
        return (
        // 无滚动条
        React.createElement("div", { style: { overflowX: 'hidden', overflowY: 'hidden' } },
            React.createElement("video", { muted: true, ref: function (video) { return (_this.video = video); }, src: src ? src : '', autoPlay: autoPlay ? true : false, 
                // autoPlay={true}
                loop: loop ? loop : 'loop', 
                // loop={true}
                style: style ? style : {} })));
    };
    return AnimationShowVideo;
}(React.Component));
exports.default = AnimationShowVideo;
