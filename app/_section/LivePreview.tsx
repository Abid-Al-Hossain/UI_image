"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import type { ImageState } from "../types";

interface LivePreviewProps {
  state: ImageState;
}

export default function LivePreview({ state }: LivePreviewProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Build filter string
  const filterString = useMemo(() => {
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

    if (state.dropShadowEnabled) {
      if (isHovered && state.hoverEffect === "lift") {
        filters.push(
          `drop-shadow(${state.dropShadowX}px ${parseFloat(state.dropShadowY) + 10}px ${parseFloat(state.dropShadowBlur) + 5}px ${state.dropShadowColor})`,
        );
      } else {
        filters.push(
          `drop-shadow(${state.dropShadowX}px ${state.dropShadowY}px ${state.dropShadowBlur}px ${state.dropShadowColor})`,
        );
      }
    } else if (isHovered && state.hoverEffect === "lift") {
      filters.push(`drop-shadow(0px 10px 20px rgba(0,0,0,0.3))`);
    }

    if (isHovered) {
      if (state.hoverEffect === "brightness")
        filters.push(`brightness(${state.hoverIntensity}%)`);
      if (state.hoverEffect === "grayscale") filters.push(`grayscale(100%)`);
    }

    return filters.length > 0 ? filters.join(" ") : "none";
  }, [state, isHovered]);

  // Build transform string
  const transformString = useMemo(() => {
    const transforms: string[] = [];

    const scaleXVal = state.flipHorizontal
      ? -parseFloat(state.scaleX)
      : parseFloat(state.scaleX);
    const scaleYVal = state.flipVertical
      ? -parseFloat(state.scaleY)
      : parseFloat(state.scaleY);

    // Hover Scale logic
    let hoverScale = 1;
    if (isHovered) {
      // Use state.hoverZoomScale
      // If zoom-out, we might want 1 / scale or just use the scale directly (assuming user sets < 1)
      // But typically user expects "Amount" to be relative.
      // Let's rely on the user setting. For zoom-out they might set 0.9.
      if (state.hoverEffect === "zoom-in" || state.hoverEffect === "zoom-out") {
        hoverScale = parseFloat(state.hoverZoomScale);
      }
    }

    if (scaleXVal !== 1 || scaleYVal !== 1 || hoverScale !== 1) {
      transforms.push(
        `scale(${scaleXVal * hoverScale}, ${scaleYVal * hoverScale})`,
      );
    }

    // Rotate
    let hoverRotate = 0;
    if (isHovered && state.hoverEffect === "rotate") {
      hoverRotate = parseFloat(state.hoverRotateAngle);
    }

    if (state.rotate !== "0" || hoverRotate !== 0) {
      transforms.push(`rotate(${parseFloat(state.rotate) + hoverRotate}deg)`);
    }

    // Translate (Lift)
    let hoverTranslateY = 0;
    if (isHovered && state.hoverEffect === "lift") {
      // Lift usually means moving UP (negative Y)
      // If user provides positive "10", we might want -10.
      // But user asked for "Direction". So if they set -10, it goes up.
      // Let's map directly to translateY.
      // Convention: Lift Up = negative Y.
      // If state.hoverLiftAmount is "10", we apply -10? Or just let user set -10?
      // Let's assume the slider allows negative values (we set min -50).
      // So we just apply the value directly (maybe inverted if "Lift" implies up).
      // Let's invert it so positive "Lift Amount" = moves UP.
      hoverTranslateY = -parseFloat(state.hoverLiftAmount);
    }

    if (
      state.translateX !== "0" ||
      state.translateY !== "0" ||
      hoverTranslateY !== 0
    ) {
      transforms.push(
        `translate(${state.translateX}px, ${parseFloat(state.translateY) + hoverTranslateY}px)`,
      );
    }

    if (state.skewX !== "0") transforms.push(`skewX(${state.skewX}deg)`);
    if (state.skewY !== "0") transforms.push(`skewY(${state.skewY}deg)`);

    // 3D transforms
    // Tilt effect
    let hoverRotateX = 0;
    let hoverRotateY = 0;
    if (isHovered && state.hoverEffect === "tilt") {
      const tilt = parseFloat(state.hoverTiltAmount);
      hoverRotateX = tilt;
      hoverRotateY = -tilt;
    }

    if (state.rotateX !== "0" || hoverRotateX !== 0)
      transforms.push(
        `rotateX(${parseFloat(state.rotateX) + hoverRotateX}deg)`,
      );
    if (state.rotateY !== "0" || hoverRotateY !== 0)
      transforms.push(
        `rotateY(${parseFloat(state.rotateY) + hoverRotateY}deg)`,
      );
    if (state.rotateZ !== "0") transforms.push(`rotateZ(${state.rotateZ}deg)`);

    return transforms.length > 0 ? transforms.join(" ") : "none";
  }, [state, isHovered]);

  // Build border radius
  const borderRadius = useMemo(() => {
    if (state.borderRadiusMode === "uniform") {
      return `${state.borderRadiusUniform}px`;
    }
    return `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;
  }, [state]);

  // Build clip-path
  const clipPath = useMemo(() => {
    if (state.clipPathShape === "none") return "none";
    if (state.clipPathShape === "circle") return "circle(50% at 50% 50%)";
    if (state.clipPathShape === "ellipse") return "ellipse(50% 50% at 50% 50%)";
    if (state.clipPathShape === "polygon") {
      // Hexagon as default
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    }
    if (state.clipPathShape === "inset") return "inset(10% round 10px)";
    return "none";
  }, [state.clipPathShape]);

  const imageRole = state.ariaRole === "none" ? undefined : state.ariaRole;

  // Build box shadow
  const boxShadow = useMemo(() => {
    if (!state.boxShadowEnabled) return "none";
    const inset = state.boxShadowInset ? "inset " : "";
    return `${inset}${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${state.boxShadowColor}`;
  }, [state]);

  // Build mask (for vignette or gradient fade)
  const maskImage = useMemo(() => {
    if (state.maskType === "none") return "none";

    if (state.maskType === "linear-gradient") {
      const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
      const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
      return `linear-gradient(${state.maskAngle}deg, ${start}, ${end})`;
    }

    if (state.maskType === "radial-gradient") {
      const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
      const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
      return `radial-gradient(circle, ${start} 0%, ${end} 100%)`;
    }

    if (state.maskType === "vignette" && state.vignetteEnabled) {
      const intensity = parseInt(state.vignetteIntensity) / 100;
      const softness = parseInt(state.vignetteSoftness);
      return `radial-gradient(circle, transparent ${softness}%, ${state.vignetteColor} ${100 - intensity * 20}%)`;
    }

    return "none";
  }, [state]);

  // Compute dimensions
  const widthValue =
    state.widthUnit === "auto" ? "auto" : `${state.width}${state.widthUnit}`;
  const heightValue =
    state.heightUnit === "auto" ? "auto" : `${state.height}${state.heightUnit}`;

  const aspectRatioValue =
    state.aspectRatio === "custom"
      ? `${state.customAspectWidth} / ${state.customAspectHeight}`
      : state.aspectRatio === "none"
        ? "auto"
        : state.aspectRatio;

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    perspective: state.perspective !== "0" ? `${state.perspective}px` : "none",
  };

  // Image wrapper for overlay/duotone
  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    cursor: state.hoverEffect !== "none" ? "pointer" : "default",
  };

  // Main image styles
  const imageStyle: React.CSSProperties = {
    width: widthValue,
    height: heightValue,
    aspectRatio: aspectRatioValue,
    objectFit: state.objectFit,
    objectPosition: `${state.objectPositionX}% ${state.objectPositionY}%`,
    filter: filterString,
    transform: transformString,
    transformOrigin: state.transformOrigin,
    borderRadius,
    clipPath,
    border:
      state.borderWidth !== "0"
        ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`
        : "none",
    boxShadow,
    mixBlendMode: state.mixBlendMode as React.CSSProperties["mixBlendMode"],
    maskImage: maskImage !== "none" ? maskImage : undefined,
    WebkitMaskImage: maskImage !== "none" ? maskImage : undefined,
    transition:
      state.hoverEffect !== "none"
        ? `all ${state.hoverDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        : undefined,
  };

  // Overlay styles
  const overlayStyle: React.CSSProperties = state.overlayEnabled
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: state.overlayColor,
        opacity: parseInt(state.overlayOpacity) / 100,
        mixBlendMode:
          state.overlayBlendMode as React.CSSProperties["mixBlendMode"],
        pointerEvents: "none",
        borderRadius,
        clipPath,
      }
    : {};

  // Vignette overlay (alternative to mask)
  const vignetteStyle: React.CSSProperties =
    state.vignetteEnabled && state.maskType === "none"
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle, transparent ${state.vignetteSoftness}%, ${state.vignetteColor} 100%)`,
          opacity: parseInt(state.vignetteIntensity) / 100,
          pointerEvents: "none",
          borderRadius,
          clipPath,
        }
      : {};

  // Duotone helpers
  const duotoneStyles = useMemo(() => {
    if (!state.duotoneEnabled) return null;
    return {
      filter: "grayscale(100%)",
      shadows: {
        backgroundColor: state.duotoneColor1,
        mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
      },
      highlights: {
        backgroundColor: state.duotoneColor2,
        mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
      },
    };
  }, [state.duotoneEnabled, state.duotoneColor1, state.duotoneColor2]);

  // Entrance Animation Styles
  const animationStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (state.entranceAnimation === "none") return undefined;

    const duration = `${state.entranceDuration}ms`;
    const delay = `${state.entranceDelay}ms`;

    // Simple keyframe definitions (injected via style tag below)
    return {
      animationName: `image-entrance-${state.entranceAnimation}`,
      animationDuration: duration,
      animationDelay: delay,
      animationFillMode: "both",
      animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // easeOutExpo
    };
  }, [state.entranceAnimation, state.entranceDuration, state.entranceDelay]);

  // Caption Styles
  const captionContainerStyle: React.CSSProperties | undefined = useMemo(() => {
    if (!state.captionEnabled) return undefined;

    const base: React.CSSProperties = {
      position: "absolute",
      left: 0,
      right: 0,
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    };

    if (state.captionPosition === "top") base.top = 0;
    else if (state.captionPosition === "bottom") base.bottom = 0;
    else {
      base.top = "50%";
      base.transform = "translateY(-50%)";
    }

    return base;
  }, [state.captionEnabled, state.captionPosition]);

  const captionTextStyle: React.CSSProperties | undefined = useMemo(() => {
    if (!state.captionEnabled) return undefined;

    const base: React.CSSProperties = {
      color: state.captionTextColor,
      fontSize: `${state.captionFontSize}px`,
      fontWeight: 500,
      padding: "8px 16px",
      borderRadius: "8px",
    };

    if (state.captionBgStyle === "solid") {
      base.backgroundColor = state.captionBgColor;
    } else if (state.captionBgStyle === "gradient") {
      const isTop = state.captionPosition === "top";
      base.background = isTop
        ? "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
        : "linear-gradient(to top, rgba(0,0,0,0.8), transparent)";
      base.width = "100%";
      base.textAlign = "center";
      base.padding = "20px";
      base.borderRadius = 0;
    } else if (state.captionBgStyle === "glass") {
      base.background = "rgba(255, 255, 255, 0.1)";
      base.backdropFilter = "blur(8px)";
      base.border = "1px solid rgba(255, 255, 255, 0.2)";
      base.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    }

    return base;
  }, [state]);

  // Combined Image Style (incorporating Duotone grayscale)
  const finalImageStyle: React.CSSProperties = {
    ...imageStyle,
    filter: duotoneStyles
      ? `${imageStyle.filter} grayscale(100%)`
      : imageStyle.filter,
    ...(animationStyle ?? {}),
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes image-entrance-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes image-entrance-slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes image-entrance-zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes image-entrance-blur-in { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
      `}</style>

      <div
        style={wrapperStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={state.src}
          alt={state.alt}
          role={imageRole}
          aria-hidden={state.ariaHidden || undefined}
          decoding={state.decoding}
          fill
          unoptimized
          sizes={widthValue}
          style={finalImageStyle}
          className="image-preview"
        />

        {/* Duotone Layers */}
        {duotoneStyles && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: duotoneStyles.shadows.backgroundColor,
                mixBlendMode: duotoneStyles.shadows.mixBlendMode,
                pointerEvents: "none",
                borderRadius,
                clipPath,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: duotoneStyles.highlights.backgroundColor,
                mixBlendMode: duotoneStyles.highlights.mixBlendMode,
                pointerEvents: "none",
                borderRadius,
                clipPath,
              }}
            />
          </>
        )}

        {/* Overlays */}
        {state.overlayEnabled && <div style={overlayStyle} />}
        {state.vignetteEnabled && state.maskType === "none" && (
          <div style={vignetteStyle} />
        )}

        {/* Caption */}
        {state.captionEnabled && (
          <div style={captionContainerStyle}>
            <div style={captionTextStyle}>{state.captionText}</div>
          </div>
        )}
      </div>
    </div>
  );
}
