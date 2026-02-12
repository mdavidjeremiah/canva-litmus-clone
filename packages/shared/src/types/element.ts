export type ElementType = "rectangle" | "circle" | "text" | "image" | "triangle";

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

export interface RectangleElement extends BaseElement {
  type: "rectangle";
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
}

export interface CircleElement extends BaseElement {
  type: "circle";
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface TriangleElement extends BaseElement {
  type: "triangle";
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  fill: string;
  align: "left" | "center" | "right";
  lineHeight: number;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  assetId?: string;
}

export type DesignElement =
  | RectangleElement
  | CircleElement
  | TriangleElement
  | TextElement
  | ImageElement;

export interface CreateElementInput {
  type: ElementType;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  [key: string]: any;
}

export interface UpdateElementInput {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  locked?: boolean;
  visible?: boolean;
  zIndex?: number;
  [key: string]: any;
}
