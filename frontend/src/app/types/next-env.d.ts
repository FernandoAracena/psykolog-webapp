/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace React {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): React.ReactElement<any, any> | null;
  }
  
  type FC<P = {}> = FunctionComponent<P>;
}