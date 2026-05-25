// Image Component State Types

export type AspectRatioPreset =
  | "1/1"
  | "16/9"
  | "4/3"
  | "3/2"
  | "21/9"
  | "2/3"
  | "9/16"
  | "custom"
  | "none";
export type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type LoadingMode = "lazy" | "eager";
export type DecodingMode = "auto" | "async" | "sync";
export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";
export type ClipPathShape = "none" | "circle" | "ellipse" | "polygon" | "inset";
export type MaskType =
  | "none"
  | "linear-gradient"
  | "radial-gradient"
  | "vignette";
export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";
export type HoverEffect =
  | "none"
  | "zoom-in"
  | "zoom-out"
  | "rotate"
  | "lift"
  | "tilt"
  | "brightness"
  | "grayscale";
export type EntranceAnimation =
  | "none"
  | "fade-in"
  | "slide-up"
  | "zoom-in"
  | "blur-in";

export interface ImageState {
  // Basics
  src: string;
  alt: string;
  width: string;
  widthUnit: "px" | "%" | "vw" | "auto";
  height: string;
  heightUnit: "px" | "%" | "vh" | "auto";
  aspectRatio: AspectRatioPreset;
  customAspectWidth: string;
  customAspectHeight: string;
  objectFit: ObjectFit;
  objectPositionX: string;
  objectPositionY: string;
  loading: LoadingMode;
  decoding: DecodingMode;

  // Filters
  brightness: string;
  contrast: string;
  saturation: string;
  grayscale: string;
  sepia: string;
  hueRotate: string;
  invert: string;
  blur: string;
  filterOpacity: string;

  // Drop Shadow
  dropShadowEnabled: boolean;
  dropShadowX: string;
  dropShadowY: string;
  dropShadowBlur: string;
  dropShadowColor: string;

  // Transforms
  scaleX: string;
  scaleY: string;
  scaleUnified: boolean;
  rotate: string;
  translateX: string;
  translateY: string;
  skewX: string;
  skewY: string;
  transformOrigin: string;

  // 3D
  perspective: string;
  rotateX: string;
  rotateY: string;
  rotateZ: string;
  flipHorizontal: boolean;
  flipVertical: boolean;

  // Shape & Border
  borderRadiusMode: "uniform" | "individual";
  borderRadiusUniform: string;
  borderRadiusTL: string;
  borderRadiusTR: string;
  borderRadiusBR: string;
  borderRadiusBL: string;

  clipPathShape: ClipPathShape;

  borderWidth: string;
  borderStyle: BorderStyle;
  borderColor: string;

  // Box Shadow
  boxShadowEnabled: boolean;
  boxShadowX: string;
  boxShadowY: string;
  boxShadowBlur: string;
  boxShadowSpread: string;
  boxShadowColor: string;
  boxShadowInset: boolean;

  // Masking & Blend
  maskType: MaskType;
  maskAngle: string;
  maskStartOpacity: string;
  maskEndOpacity: string;

  mixBlendMode: BlendMode;

  overlayEnabled: boolean;
  overlayColor: string;
  overlayOpacity: string;
  overlayBlendMode: BlendMode;

  duotoneEnabled: boolean;
  duotoneColor1: string;
  duotoneColor2: string;

  // Effects
  vignetteEnabled: boolean;
  vignetteIntensity: string;
  vignetteSoftness: string;
  vignetteColor: string;

  // Caption
  captionEnabled: boolean;
  captionText: string;
  captionPosition: "top" | "center" | "bottom";
  captionBgStyle: "solid" | "gradient" | "glass";
  captionBgColor: string;
  captionTextColor: string;
  captionFontSize: string;

  // Animation
  hoverEffect: HoverEffect;
  hoverIntensity: string;
  hoverDuration: string;

  // Hover Customization
  hoverZoomScale: string;
  hoverRotateAngle: string;
  hoverLiftAmount: string;
  hoverTiltAmount: string;

  entranceAnimation: EntranceAnimation;
  entranceDuration: string;
  entranceDelay: string;

  // Accessibility
  ariaRole: "img" | "presentation" | "figure" | "none";
  ariaHidden: boolean;
}

export const INITIAL_IMAGE_STATE: ImageState = {
  // Basics
  src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
  alt: "Sample image",
  width: "600",
  widthUnit: "px",
  height: "400",
  heightUnit: "px",
  aspectRatio: "3/2",
  customAspectWidth: "16",
  customAspectHeight: "9",
  objectFit: "cover",
  objectPositionX: "50",
  objectPositionY: "50",
  loading: "lazy",
  decoding: "auto",

  // Filters
  brightness: "100",
  contrast: "100",
  saturation: "100",
  grayscale: "0",
  sepia: "0",
  hueRotate: "0",
  invert: "0",
  blur: "0",
  filterOpacity: "100",

  dropShadowEnabled: false,
  dropShadowX: "0",
  dropShadowY: "10",
  dropShadowBlur: "20",
  dropShadowColor: "#000000",

  // Transforms
  scaleX: "1",
  scaleY: "1",
  scaleUnified: true,
  rotate: "0",
  translateX: "0",
  translateY: "0",
  skewX: "0",
  skewY: "0",
  transformOrigin: "center",

  perspective: "1000",
  rotateX: "0",
  rotateY: "0",
  rotateZ: "0",
  flipHorizontal: false,
  flipVertical: false,

  // Shape & Border
  borderRadiusMode: "uniform",
  borderRadiusUniform: "0",
  borderRadiusTL: "0",
  borderRadiusTR: "0",
  borderRadiusBR: "0",
  borderRadiusBL: "0",

  clipPathShape: "none",

  borderWidth: "0",
  borderStyle: "solid",
  borderColor: "#000000",

  // Box Shadow
  boxShadowEnabled: false,
  boxShadowX: "0",
  boxShadowY: "10",
  boxShadowBlur: "30",
  boxShadowSpread: "0",
  boxShadowColor: "#00000033",
  boxShadowInset: false,

  // Masking & Blend
  maskType: "none",
  maskAngle: "180",
  maskStartOpacity: "100",
  maskEndOpacity: "0",

  mixBlendMode: "normal",

  overlayEnabled: false,
  overlayColor: "#3b82f6",
  overlayOpacity: "50",
  overlayBlendMode: "multiply",

  duotoneEnabled: false,
  duotoneColor1: "#3b82f6",
  duotoneColor2: "#f59e0b",

  // Effects
  vignetteEnabled: false,
  vignetteIntensity: "50",
  vignetteSoftness: "60",
  vignetteColor: "#000000",

  // Caption
  captionEnabled: false,
  captionText: "Capture the moment",
  captionPosition: "bottom",
  captionBgStyle: "glass",
  captionBgColor: "#000000",
  captionTextColor: "#ffffff",
  captionFontSize: "16",

  // Animation
  hoverEffect: "none",
  hoverIntensity: "110",
  hoverDuration: "300",

  hoverZoomScale: "1.1",
  hoverRotateAngle: "5",
  hoverLiftAmount: "10",
  hoverTiltAmount: "10",

  entranceAnimation: "none",
  entranceDuration: "600",
  entranceDelay: "0",

  ariaRole: "img",
  ariaHidden: false,
};

// Image preset gallery
export const IMAGE_PRESETS = [
  {
    id: "landscape-1",
    label: "Mountain",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
  {
    id: "landscape-2",
    label: "Ocean",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
  },
  {
    id: "portrait-1",
    label: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
  },
  {
    id: "abstract-1",
    label: "Abstract",
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop",
  },
  {
    id: "nature-1",
    label: "Forest",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
  },
  {
    id: "architecture-1",
    label: "Architecture",
    url: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?w=800&h=600&fit=crop",
  },
];
