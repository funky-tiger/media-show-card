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
 * @Date: 2019-07-22 13:59:39
 * @LastEditTime: 2019-07-22 16:18:43
 */
var React = __importStar(require("react"));
var AnimationShowVideo_1 = __importDefault(require("./AnimationShowVideo"));
var control_1 = __importDefault(require("./control"));
var AnimationWrapper = /** @class */ (function (_super) {
    __extends(AnimationWrapper, _super);
    function AnimationWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationWrapper.prototype.render = function () {
        return React.createElement("div", __assign({}, this.props));
    };
    AnimationWrapper.VideoBg = AnimationShowVideo_1.default;
    AnimationWrapper.control = control_1.default;
    return AnimationWrapper;
}(React.Component));
exports.default = AnimationWrapper;
