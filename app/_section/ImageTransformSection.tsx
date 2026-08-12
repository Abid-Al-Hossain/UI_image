"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Switch from "@/components/shared/input/Switch";

interface ImageTransformSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

interface TransformSliderProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  resetValue?: string;
}

function TransformSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  resetValue = "0",
}: TransformSliderProps) {
  return (
    <LabeledField
      label={label}
      hint={
        <div className="flex items-center gap-2">
          <span>
            {value}
            {unit}
          </span>
          <button
            type="button"
            onClick={() => onChange(resetValue)}
            className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            Reset
          </button>
        </div>
      }
    >
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(nextValue) => onChange(String(nextValue))}
      />
    </LabeledField>
  );
}

export default function ImageTransformSection({
  state,
  setState,
}: ImageTransformSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-8">
      {/* 2D Transforms */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          2D Transform
        </h3>

        <TransformSlider
          label="Scale"
          value={state.scaleX}
          onChange={(v) => {
            setKey("scaleX")(v);
            if (state.scaleUnified) setKey("scaleY")(v);
          }}
          min={0.1}
          max={3}
          step={0.1}
          resetValue="1"
        />

        <Switch
          label="Uniform scale (link X/Y)"
          checked={state.scaleUnified}
          onChange={setKey("scaleUnified")}
        />

        <TransformSlider
          label="Rotate"
          value={state.rotate}
          onChange={setKey("rotate")}
          min={-180}
          max={180}
          unit="°"
        />

        <div className="grid grid-cols-2 gap-4">
          <TransformSlider
            label="Translate X"
            value={state.translateX}
            onChange={setKey("translateX")}
            min={-200}
            max={200}
            unit="px"
          />
          <TransformSlider
            label="Translate Y"
            value={state.translateY}
            onChange={setKey("translateY")}
            min={-200}
            max={200}
            unit="px"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TransformSlider
            label="Skew X"
            value={state.skewX}
            onChange={setKey("skewX")}
            min={-45}
            max={45}
            unit="°"
          />
          <TransformSlider
            label="Skew Y"
            value={state.skewY}
            onChange={setKey("skewY")}
            min={-45}
            max={45}
            unit="°"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <Switch
            label="Flip Horizontal"
            checked={state.flipHorizontal}
            onChange={setKey("flipHorizontal")}
          />
          <Switch
            label="Flip Vertical"
            checked={state.flipVertical}
            onChange={setKey("flipVertical")}
          />
        </div>
      </div>

      {/* 3D Transform */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          3D Transform
        </h3>

        <TransformSlider
          label="Perspective"
          value={state.perspective}
          onChange={setKey("perspective")}
          min={0}
          max={3000}
          step={50}
          unit="px"
          resetValue="1000"
        />
        <TransformSlider
          label="Rotate X (Tilt)"
          value={state.rotateX}
          onChange={setKey("rotateX")}
          min={-180}
          max={180}
          unit="°"
        />
        <TransformSlider
          label="Rotate Y (Spin)"
          value={state.rotateY}
          onChange={setKey("rotateY")}
          min={-180}
          max={180}
          unit="°"
        />

        <TransformSlider
          label="Rotate Z"
          value={state.rotateZ}
          onChange={setKey("rotateZ")}
          min={-180}
          max={180}
          unit="°"
        />
      </div>

      {/* Transform Origin */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Transform Origin
        </h3>
        <LabeledField label="Origin">
          <select
            value={state.transformOrigin}
            onChange={(e) => setKey("transformOrigin")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)", color: "var(--text)" }}
          >
            {["center", "top left", "top center", "top right", "center left", "center right", "bottom left", "bottom center", "bottom right"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </LabeledField>
      </div>
    </div>
  );
}
