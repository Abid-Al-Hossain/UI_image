import type { ImageState } from "../types";

interface ExportOptions extends ImageState {
  downloadName: string;
}

export function buildImageExportPayload(options: ExportOptions) {
  const { downloadName, ...state } = options;

  // 1. Build Base Values (Dimensions, Colors, etc.)
  // ---------------------------------------------------------------------------

  // Helpers
  const widthVal =
    state.widthUnit === "auto" ? "auto" : `${state.width}${state.widthUnit}`;
  const heightVal =
    state.heightUnit === "auto" ? "auto" : `${state.height}${state.heightUnit}`;
  const aspectRatio =
    state.aspectRatio === "custom"
      ? `${state.customAspectWidth} / ${state.customAspectHeight}`
      : state.aspectRatio === "none"
        ? "auto"
        : state.aspectRatio;

  // Filter String
  const filters: string[] = [];
  if (state.brightness !== "100")
    filters.push(`brightness(${state.brightness}%)`);
  if (state.contrast !== "100") filters.push(`contrast(${state.contrast}%)`);
  if (state.saturation !== "100")
    filters.push(`saturate(${state.saturation}%)`);
  if (state.grayscale !== "0") filters.push(`grayscale(${state.grayscale}%)`);
  if (state.sepia !== "0") filters.push(`sepia(${state.sepia}%)`);
  if (state.hueRotate !== "0")
    filters.push(`hue-rotate(${state.hueRotate}deg)`);
  if (state.invert !== "0") filters.push(`invert(${state.invert}%)`);
  if (state.blur !== "0") filters.push(`blur(${state.blur}px)`);
  if (state.filterOpacity !== "100")
    filters.push(`opacity(${state.filterOpacity}%)`);

  // Base Drop Shadow (CSS filter level)
  if (state.dropShadowEnabled) {
    filters.push(
      `drop-shadow(${state.dropShadowX}px ${state.dropShadowY}px ${state.dropShadowBlur}px ${state.dropShadowColor})`,
    );
  }
  const baseFilter = filters.length > 0 ? filters.join(" ") : "none";

  // Transform String
  const transforms: string[] = [];
  const rawScaleX = parseFloat(state.scaleX);
  const rawScaleY = state.scaleUnified ? rawScaleX : parseFloat(state.scaleY);
  const scaleX = state.flipHorizontal ? -rawScaleX : rawScaleX;
  const scaleY = state.flipVertical ? -rawScaleY : rawScaleY;
  if (scaleX !== 1 || scaleY !== 1)
    transforms.push(`scale(${scaleX}, ${scaleY})`);
  if (state.rotate !== "0") transforms.push(`rotate(${state.rotate}deg)`);
  if (state.translateX !== "0" || state.translateY !== "0")
    transforms.push(`translate(${state.translateX}px, ${state.translateY}px)`);
  if (state.skewX !== "0") transforms.push(`skewX(${state.skewX}deg)`);
  if (state.skewY !== "0") transforms.push(`skewY(${state.skewY}deg)`);
  if (state.rotateX !== "0") transforms.push(`rotateX(${state.rotateX}deg)`);
  if (state.rotateY !== "0") transforms.push(`rotateY(${state.rotateY}deg)`);
  if (state.rotateZ !== "0") transforms.push(`rotateZ(${state.rotateZ}deg)`);
  const baseTransform = transforms.length > 0 ? transforms.join(" ") : "none";

  // Border Radius
  const borderRadius =
    state.borderRadiusMode === "uniform"
      ? `${state.borderRadiusUniform}px`
      : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;

  // Clip Path
  const clipPath =
    state.clipPathShape !== "none"
      ? state.clipPathShape === "inset"
        ? "inset(10% round 10px)"
        : state.clipPathShape === "circle"
          ? "circle(50% at 50% 50%)"
          : state.clipPathShape === "ellipse"
            ? "ellipse(50% 50% at 50% 50%)"
            : state.clipPathShape === "polygon"
              ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              : "none"
      : "none";

  // Box Shadow
  const boxShadow = state.boxShadowEnabled
    ? `${state.boxShadowInset ? "inset " : ""}${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${state.boxShadowColor}`
    : "none";

  // Mask Image
  let maskImage = "none";
  if (state.maskType === "linear-gradient") {
    const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
    const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
    maskImage = `linear-gradient(${state.maskAngle}deg, ${start}, ${end})`;
  } else if (state.maskType === "radial-gradient") {
    const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
    const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
    maskImage = `radial-gradient(circle, ${start} 0%, ${end} 100%)`;
  } else if (state.maskType === "vignette" && state.vignetteEnabled) {
    const intensity = parseInt(state.vignetteIntensity) / 100;
    const softness = parseInt(state.vignetteSoftness);
    maskImage = `radial-gradient(circle, transparent ${softness}%, ${state.vignetteColor} ${100 - intensity * 20}%)`;
  }

  // Hover Values
  const hoverZoom =
    state.hoverEffect === "zoom-in" || state.hoverEffect === "zoom-out"
      ? state.hoverZoomScale
      : "1";
  const hoverRotate =
    state.hoverEffect === "rotate" ? state.hoverRotateAngle : "0";
  const hoverLift =
    state.hoverEffect === "lift" ? -parseFloat(state.hoverLiftAmount) : 0;
  const hoverTilt =
    state.hoverEffect === "tilt" ? parseFloat(state.hoverTiltAmount) : 0;
  const cursor = state.disabled ? "not-allowed" : state.hoverEffect !== "none" || state.linkHref ? "pointer" : "default";
  const transition =
    state.hoverEffect !== "none"
      ? `all ${state.hoverDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : state.transitionDuration > 0
        ? `opacity ${state.transitionDuration}ms ${state.transitionEasing}`
        : "none";

  // Duotone & Overlay Logics
  const duotoneFilter = state.duotoneEnabled ? "grayscale(100%)" : "";
  const finalFilter =
    [baseFilter !== "none" ? baseFilter : "", duotoneFilter]
      .filter(Boolean)
      .join(" ") || "none";

  // Caption Logic
  let captionCss = "";
  if (state.captionEnabled) {
    const bg =
      state.captionBgStyle === "solid"
        ? `background-color: ${state.captionBgColor};`
        : state.captionBgStyle === "gradient"
          ? `background: linear-gradient(to ${state.captionPosition === "top" ? "bottom" : "top"}, rgba(0,0,0,0.8), transparent); width: 100%; border-radius: 0; padding: 20px; text-align: center;`
          : `background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 6px rgba(0,0,0,0.1);`;

    const pos =
      state.captionPosition === "top"
        ? "top: 0;"
        : state.captionPosition === "bottom"
          ? "bottom: 0;"
          : "top: 50%; transform: translateY(-50%);";
    captionCss = `.image-caption-container { position: absolute; left: 0; right: 0; ${pos} padding: 20px; display: flex; justify-content: center; pointer-events: none; }
      .image-caption-text { color: ${state.captionTextColor}; font-size: ${state.captionFontSize}px; font-weight: 500; padding: 8px 16px; border-radius: 8px; ${bg} }`;
  }

  // 2. Global CSS (HTML/React/Vue/CSS Vars)
  // ---------------------------------------------------------------------------
  const focusRingCss = state.focusRingEnabled && state.linkHref
    ? `.image-wrapper:focus-visible { outline: ${state.focusRingWidth}px solid ${state.focusRingColor}; outline-offset: ${state.focusRingOffset}px; }`
    : "";
  const globalCss = `
    .image-container { position: relative; display: inline-block; perspective: ${state.perspective !== "0" ? state.perspective + "px" : "none"}; width: ${widthVal}; height: ${heightVal}; }
    .image-wrapper { position: relative; display: inline-block; width: 100%; height: 100%; cursor: ${cursor}; overflow: hidden; border-radius: ${borderRadius}; clip-path: ${clipPath}; box-shadow: ${boxShadow}; border: ${state.borderWidth !== "0" ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}` : "none"}; background-color: ${state.objectFitFallbackBg}; opacity: ${state.disabled ? state.disabledOpacity : 1}; pointer-events: ${state.disabled ? "none" : "auto"}; }
    ${focusRingCss}
    .image-placeholder { position: absolute; inset: 0; border-radius: ${borderRadius}; background: ${state.loadingPlaceholder === "skeleton" ? `linear-gradient(90deg, ${state.loadingPlaceholderColor}, color-mix(in oklab, ${state.loadingPlaceholderColor} 60%, white), ${state.loadingPlaceholderColor})` : state.loadingPlaceholderColor}; filter: ${state.loadingPlaceholder === "blur" ? "blur(12px)" : "none"}; }
    .main-image { display: block; width: 100%; height: 100%; object-fit: ${state.objectFit}; object-position: ${state.objectPositionX}% ${state.objectPositionY}%; aspect-ratio: ${aspectRatio}; transform-origin: ${state.transformOrigin}; transform: ${baseTransform}; filter: ${finalFilter}; mask-image: ${maskImage !== "none" ? maskImage : "none"}; -webkit-mask-image: ${maskImage !== "none" ? maskImage : "none"}; mix-blend-mode: ${state.mixBlendMode}; transition: ${transition};
      animation-name: ${state.entranceAnimation !== "none" ? `image-entrance-${state.entranceAnimation}` : "none"}; animation-duration: ${state.entranceDuration}ms; animation-delay: ${state.entranceDelay}ms; animation-fill-mode: both; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
    .image-wrapper:hover .main-image {
       ${state.hoverEffect === "zoom-in" || state.hoverEffect === "zoom-out" ? `transform: ${baseTransform === "none" ? "" : baseTransform} scale(${hoverZoom});` : ""}
       ${state.hoverEffect === "rotate" ? `transform: ${baseTransform === "none" ? "" : baseTransform} rotate(${hoverRotate}deg);` : ""}
       ${state.hoverEffect === "lift" ? `transform: ${baseTransform === "none" ? "" : baseTransform} translateY(${hoverLift}px);` : ""}
       ${state.hoverEffect === "tilt" ? `transform: ${baseTransform === "none" ? "" : baseTransform} rotateX(${hoverTilt}deg) rotateY(-${hoverTilt}deg);` : ""}
       ${state.hoverEffect === "brightness" ? `filter: ${finalFilter === "none" ? "" : finalFilter} brightness(${state.hoverIntensity}%);` : ""}
       ${state.hoverEffect === "grayscale" ? `filter: ${finalFilter === "none" ? "" : finalFilter} grayscale(100%);` : ""}
    }
    .duotone-shadows { position: absolute; inset: 0; pointer-events: none; background-color: ${state.duotoneColor1}; mix-blend-mode: multiply; }
    .duotone-highlights { position: absolute; inset: 0; pointer-events: none; background-color: ${state.duotoneColor2}; mix-blend-mode: screen; }
    .color-overlay { position: absolute; inset: 0; pointer-events: none; background-color: ${state.overlayColor}; opacity: ${parseInt(state.overlayOpacity) / 100}; mix-blend-mode: ${state.overlayBlendMode}; }
    .vignette-overlay { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, transparent ${state.vignetteSoftness}%, ${state.vignetteColor} 100%); opacity: ${parseInt(state.vignetteIntensity) / 100}; }
    @keyframes image-entrance-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes image-entrance-slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes image-entrance-zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    @keyframes image-entrance-blur-in { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
    ${captionCss}
  `;

  // 3. Generators
  // ---------------------------------------------------------------------------

  const content = `'use client';
import React from 'react';
export default function StyledImage() {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  return (<><style>{\`${globalCss}\`}</style>${getJsxStructure(state, "image-container", "image-wrapper", "main-image")}</>);
}`;
  return { content, filename: `${downloadName}.tsx` };
}

// Helpers
function getJsxStructure(state: ImageState, cont: string, wrap: string, img: string) {
  const roleAttr = state.ariaRole === "none" ? "" : ` role="${state.ariaRole}"`;
  const ariaHiddenAttr = state.ariaHidden ? " aria-hidden={true}" : "";
  const ariaLabelAttr = !state.ariaHidden && state.ariaLabel ? ` aria-label="${state.ariaLabel}"` : "";
  const ariaDescribedByAttr = state.ariaDescribedBy ? ` aria-describedby="${state.ariaDescribedBy}"` : "";
  const wrapTag = state.linkHref ? "a" : "div";
  const wrapAttrs = state.linkHref
    ? ` href="${state.linkHref}" target="${state.linkTarget}" rel="${state.linkRel}" tabIndex={${state.disabled ? -1 : 0}}`
    : "";
  return `<div className="${cont}"><${wrapTag} className="${wrap}"${wrapAttrs}>
    {hasError ? (
      <div${roleAttr}${ariaLabelAttr}${ariaDescribedByAttr}${ariaHiddenAttr} style={{ width: "100%", height: "100%" }} />
    ) : (
      <>
        {${state.loadingPlaceholder !== "none"} && !hasLoaded ? <div className="image-placeholder" aria-hidden="true" /> : null}
        <img src="${state.src}" alt="${state.ariaHidden ? "" : state.alt}"${roleAttr}${ariaLabelAttr}${ariaDescribedByAttr}${ariaHiddenAttr} loading="${state.loading}" decoding="${state.decoding}" className="${img}" onLoad={() => setHasLoaded(true)} onError={() => setHasError(true)} />
      </>
    )}
    ${state.duotoneEnabled ? `<div className="duotone-shadows" /><div className="duotone-highlights" />` : ""}
    ${state.overlayEnabled ? `<div className="color-overlay" />` : ""}
    ${state.vignetteEnabled && state.maskType === "none" ? `<div className="vignette-overlay" />` : ""}
    ${state.captionEnabled ? `<div className="image-caption-container"><div className="image-caption-text">${state.captionText}</div></div>` : ""}
  </${wrapTag}></div>`;
}
