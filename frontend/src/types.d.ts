/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="next" />

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}