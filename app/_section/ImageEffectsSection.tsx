"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Switch from "@/components/shared/input/Switch";
import ColorControl from "@/components/shared/color/ColorControl";
import Select from "@/components/shared/input/Select";

interface ImageEffectsSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageEffectsSection({
  state,
  setState,
}: ImageEffectsSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const blendModeOptions = [
    { value: "normal", label: "Normal" },
    { value: "multiply", label: "Multiply" },
    { value: "screen", label: "Screen" },
    { value: "overlay", label: "Overlay" },
    { value: "darken", label: "Darken" },
    { value: "lighten", label: "Lighten" },
    { value: "color-dodge", label: "Color Dodge" },
    { value: "color-burn", label: "Color Burn" },
    { value: "hard-light", label: "Hard Light" },
    { value: "soft-light", label: "Soft Light" },
    { value: "difference", label: "Difference" },
    { value: "exclusion", label: "Exclusion" },
    { value: "hue", label: "Hue" },
    { value: "saturation", label: "Saturation" },
    { value: "color", label: "Color" },
    { value: "luminosity", label: "Luminosity" },
  ];

  return (
    <div className="space-y-8">
      {/* Blend Mode */}
      <LabeledField label="Global Blend Mode">
        <Select
          value={state.mixBlendMode}
          onChange={(v) =>
            setKey("mixBlendMode")(v as ImageState["mixBlendMode"])
          }
          options={blendModeOptions}
        />
      </LabeledField>

      {/* Color Overlay */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Color Overlay
          </h3>
          <Switch
            checked={state.overlayEnabled}
            onChange={setKey("overlayEnabled")}
          />
        </div>

        {state.overlayEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <ColorControl
              label="Overlay Color"
              value={state.overlayColor}
              onChange={setKey("overlayColor")}
            />

            <LabeledField label="Opacity" hint={`${state.overlayOpacity}%`}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.overlayOpacity}
                onChange={(value) => setKey("overlayOpacity")(String(value))}
              />
            </LabeledField>

            <LabeledField label="Blend Mode">
              <Select
                value={state.overlayBlendMode}
                onChange={(v) =>
                  setKey("overlayBlendMode")(
                    v as ImageState["overlayBlendMode"],
                  )
                }
                options={blendModeOptions}
              />
            </LabeledField>
          </div>
        )}
      </div>

      {/* Vignette */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Vignette
          </h3>
          <Switch
            checked={state.vignetteEnabled}
            onChange={setKey("vignetteEnabled")}
          />
        </div>

        {state.vignetteEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <LabeledField
              label="Intensity"
              hint={`${state.vignetteIntensity}%`}
            >
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.vignetteIntensity}
                onChange={(value) => setKey("vignetteIntensity")(String(value))}
              />
            </LabeledField>

            <LabeledField label="Softness" hint={`${state.vignetteSoftness}%`}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.vignetteSoftness}
                onChange={(value) => setKey("vignetteSoftness")(String(value))}
              />
            </LabeledField>

            <ColorControl
              label="Vignette Color"
              value={state.vignetteColor}
              onChange={setKey("vignetteColor")}
            />
          </div>
        )}
      </div>

      {/* Duotone Effect */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Duotone
          </h3>
          <Switch
            checked={state.duotoneEnabled}
            onChange={setKey("duotoneEnabled")}
          />
        </div>

        {state.duotoneEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <ColorControl
              label="Shadows (Dark)"
              value={state.duotoneColor1}
              onChange={setKey("duotoneColor1")}
            />
            <ColorControl
              label="Highlights (Light)"
              value={state.duotoneColor2}
              onChange={setKey("duotoneColor2")}
            />
          </div>
        )}
      </div>

      {/* Caption Overlay */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Caption
          </h3>
          <Switch
            checked={state.captionEnabled}
            onChange={setKey("captionEnabled")}
          />
        </div>

        {state.captionEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <LabeledField label="Text">
              <input
                type="text"
                value={state.captionText}
                onChange={(e) => setKey("captionText")(e.target.value)}
                className="w-full bg-transparent border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>

            <LabeledField label="Position">
              <Select
                value={state.captionPosition}
                onChange={(v) =>
                  setKey("captionPosition")(v as ImageState["captionPosition"])
                }
                options={[
                  { value: "top", label: "Top" },
                  { value: "center", label: "Center" },
                  { value: "bottom", label: "Bottom" },
                ]}
              />
            </LabeledField>

            <LabeledField label="Background Style">
              <Select
                value={state.captionBgStyle}
                onChange={(v) =>
                  setKey("captionBgStyle")(v as ImageState["captionBgStyle"])
                }
                options={[
                  { value: "solid", label: "Solid Color" },
                  { value: "gradient", label: "Gradient Fade" },
                  { value: "glass", label: "Glassmorphism" },
                ]}
              />
            </LabeledField>

            {state.captionBgStyle === "solid" && (
              <ColorControl
                label="Background Color"
                value={state.captionBgColor}
                onChange={setKey("captionBgColor")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
