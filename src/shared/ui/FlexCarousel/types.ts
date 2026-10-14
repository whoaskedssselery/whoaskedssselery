import type { CSSProperties, MutableRefObject } from 'react';
import type { Texture } from 'ogl';

export type CurlMode = 'twist' | 'rise' | 'fall';
export type CarouselIntro = 'rise' | 'none';

export interface FlexCarouselItem {
  src: string;
  alt?: string;
  title?: string;
}

export interface LensValues {
  lensWidth: number;
  lensHeight: number;
  tilt: number;
  roundness: number;
  bend: number;
  reach: number;
  curl: CurlMode;
  dispersion: number;
  liquid: number;
  followCursor: boolean;
}

export interface FlexCarouselControls {
  step: (delta: number) => void;
  goTo: (index: number) => void;
}

export interface FlexCarouselProps extends Partial<LensValues> {
  items: FlexCarouselItem[];
  controlRef?: MutableRefObject<FlexCarouselControls | null>;
  intro?: CarouselIntro;
  cardHeight?: number;
  gap?: number;
  radius?: number;
  squeeze?: number;
  focusOnClick?: boolean;
  captureWheel?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
  onChange?: (index: number, item: FlexCarouselItem) => void;
  onSelect?: (index: number, item: FlexCarouselItem) => void;
  className?: string;
  style?: CSSProperties;
}

export interface Settings extends LensValues {
  intro: CarouselIntro;
  cardHeight: number;
  gap: number;
  radius: number;
  squeeze: number;
  focusOnClick: boolean;
  captureWheel: boolean;
  outline: [number, number, number] | null;
  outlineWidth: number;
}

export interface Slot {
  item: FlexCarouselItem;
  index: number;
  texture: Texture;
  loaded: boolean;
  failed: boolean;
  ready: number;
  color: number[];
  image: number[];
  outline: number;
  dispose: () => void;
}

export interface Metrics {
  cardH: number;
  widths: number[];
  centers: number[];
  gap: number;
  loop: number;
}

export interface Instance {
  index: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export interface CardEffect {
  alpha: number;
  x: number;
  y: number;
  scale: number;
}

export interface IntroEffects {
  sceneAlpha: number;
  strength: number;
  card: ((rel: number) => CardEffect) | null;
}

export interface Draw {
  i: number;
  rel: number;
  x: number;
  y: number;
  cw: number;
  ch: number;
  alpha: number;
}

export interface Engine {
  wake: () => void;
  setItems: (items: FlexCarouselItem[]) => void;
}

export interface Callbacks {
  onChange?: (index: number, item: FlexCarouselItem) => void;
  onSelect?: (index: number, item: FlexCarouselItem) => void;
}
