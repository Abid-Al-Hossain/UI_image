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
        onChange={onChange}
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
      </div>
    </div>
  );
}
