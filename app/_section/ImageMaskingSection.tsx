"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Select from "@/components/shared/input/Select";
import ColorControl from "@/components/shared/color/ColorControl";
import Switch from "@/components/shared/input/Switch";

interface ImageMaskingSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageMaskingSection({
  state,
  setState,
}: ImageMaskingSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const maskTypeOptions = [
    { value: "none", label: "None" },
    { value: "linear-gradient", label: "Linear Fade" },
    { value: "radial-gradient", label: "Radial Fade" },
    { value: "vignette", label: "Vignette" },
  ];

  return (
    <div className="space-y-8">
      {/* Mask Type */}
      <LabeledField label="Mask Type">
        <Select
          value={state.maskType}
          onChange={(v) => setKey("maskType")(v as ImageState["maskType"])}
          options={maskTypeOptions}
        />
      </LabeledField>

      {/* Linear Gradient Controls */}
      {state.maskType === "linear-gradient" && (
        <div
          className="space-y-4 pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <LabeledField label="Angle" hint={`${state.maskAngle}°`}>
            <Slider
              min={0}
              max={360}
              step={1}
              value={state.maskAngle}
              onChange={setKey("maskAngle")}
            />
          </LabeledField>

          <LabeledField
            label="Start Opacity"
            hint={`${state.maskStartOpacity}%`}
          >
            <Slider
              min={0}
              max={100}
              step={1}
              value={state.maskStartOpacity}
              onChange={setKey("maskStartOpacity")}
            />
          </LabeledField>

          <LabeledField label="End Opacity" hint={`${state.maskEndOpacity}%`}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={state.maskEndOpacity}
              onChange={setKey("maskEndOpacity")}
            />
          </LabeledField>
        </div>
      )}

      {/* Radial Gradient Controls */}
      {state.maskType === "radial-gradient" && (
        <div
          className="space-y-4 pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="text-xs text-muted mb-2">
            Radial mask fades from center (start opacity) to edges (end
            opacity).
          </div>
          <LabeledField
            label="Center Opacity"
            hint={`${state.maskStartOpacity}%`}
          >
            <Slider
              min={0}
              max={100}
              step={1}
              value={state.maskStartOpacity}
              onChange={setKey("maskStartOpacity")}
            />
          </LabeledField>

          <LabeledField label="Edge Opacity" hint={`${state.maskEndOpacity}%`}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={state.maskEndOpacity}
              onChange={setKey("maskEndOpacity")}
            />
          </LabeledField>
        </div>
      )}

      {/* Vignette Controls */}
      {state.maskType === "vignette" && (
        <div
          className="space-y-4 pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Enable Vignette</span>
            <Switch
              checked={state.vignetteEnabled}
              onChange={setKey("vignetteEnabled")}
            />
          </div>

          {state.vignetteEnabled && (
            <>
              <LabeledField
                label="Intensity"
                hint={`${state.vignetteIntensity}%`}
              >
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={state.vignetteIntensity}
                  onChange={setKey("vignetteIntensity")}
                />
              </LabeledField>

              <LabeledField
                label="Softness"
                hint={`${state.vignetteSoftness}%`}
              >
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={state.vignetteSoftness}
                  onChange={setKey("vignetteSoftness")}
                />
              </LabeledField>

              <ColorControl
                label="Color"
                value={state.vignetteColor}
                onChange={setKey("vignetteColor")}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
