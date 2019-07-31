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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
 * @Date: 2019-07-29 11:44:18
 * @LastEditTime: 2019-07-29 15:39:12
 */
var React = __importStar(require("react"));
var AnimationShow_1 = __importDefault(require("./AnimationShow"));
function default_1() {
    return function decorate(WrappedComponent) {
        //
        var ProxyComponent = /** @class */ (function (_super) {
            __extends(ProxyComponent, _super);
            // class ProxyComponent extends React.Component<IProps, null> {
            function ProxyComponent(props) {
                var _this = _super.call(this, props) || this;
                _this.getAnimationShow = function (fadeOutFunc, options) {
                    var failedRender = false;
                    var AnimationSetting = options.setting || [];
                    return function (fieldElement) {
                        // 因为fieldElement是实例原生DOM组件 所以不能通过props进行传值 通过克隆一份ReactElement组件，再将props传递给该组件
                        var inputElement = React.cloneElement(fieldElement);
                        var inputElementArr = null;
                        if (!Array.isArray(AnimationSetting)) {
                            throw Error('setting必须是一个数组');
                        }
                        if (AnimationSetting.length > 1) {
                            // 多个组件
                            console.log('多个组件inputElement', inputElement);
                            inputElementArr = inputElement.props.children;
                        }
                        else {
                            // 单个组件
                            if (typeof inputElement.props.children === 'string') {
                                inputElementArr = [inputElement.props.children];
                                return;
                            }
                            inputElementArr = [inputElement.props.children];
                        }
                        if (inputElementArr.length === 0) {
                            failedRender = true;
                        }
                        console.log('AnimationSetting', AnimationSetting);
                        return (React.createElement("div", { className: "tiger" },
                            React.createElement(React.Fragment, null, AnimationSetting.length !== 0 &&
                                !failedRender &&
                                AnimationSetting.map(function (item, index) {
                                    return (React.createElement(AnimationShow_1.default, __assign({ key: index }, item, { childShowElement: inputElementArr[index], handleFadeOutShow: fadeOutFunc })));
                                }))));
                    };
                };
                return _this;
            }
            ProxyComponent.prototype.render = function () {
                var controlProps = {
                    control: {
                        getAnimationShow: this.getAnimationShow,
                    },
                };
                // 实现对WrappedComponent组件的增强，组件获得{...props}属性
                return React.createElement(WrappedComponent, __assign({}, controlProps, this.props));
            };
            return ProxyComponent;
        }(React.Component));
        return ProxyComponent;
    };
}
exports.default = default_1;
