import { Component, ReactElement } from 'react'

interface StaggeredMotionProps {
    /**
     * Default styles
     */
    defaultStyles?: any
    /**
     * Styles to interpolate
     * @param previousInterpolatedStyles The previously interpolating (array of) styles (undefined at first render, unless defaultStyles is provided).
     */
    styles: (x?: any) => (x: any, y: any) => void
}

export declare class StaggeredMotion extends Component<StaggeredMotionProps> {}

export declare function spring(val: number, config?: any): any
