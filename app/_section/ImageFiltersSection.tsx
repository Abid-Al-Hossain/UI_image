"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Switch from "@/components/shared/input/Switch";
import ColorControl from "@/components/shared/color/ColorControl";
import { SectionCard } from "@/components/shared/layout/SectionCard";

interface ImageFiltersSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

interface FilterSliderProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  unit?: string;
  resetValue?: string;
}

function FilterSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 200,
  unit = "%",
  resetValue = "100",
}: FilterSliderProps) {
  return (
    <LabeledField
      label={label}
      hint={
        <span className="flex items-center gap-2">
          <span>
            {value}
            {unit}
          </span>
          <button
            type="button"
            onClick={() => onChange(resetValue)}
            className="rounded border border-slate-700 px-1.5 py-0.5 text-[10px] transition-colors hover:bg-slate-700"
          >
            Reset
          </button>
        </span>
      }
    >
      <Slider
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(nextValue) => onChange(String(nextValue))}
      />
    </LabeledField>
  );
}

export default function ImageFiltersSection({
  state,
  setState,
}: ImageFiltersSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <SectionCard title="Tone" subtitle="Brightness, contrast, and saturation.">
        <FilterSlider
          label="Brightness"
          value={state.brightness}
          onChange={setKey("brightness")}
        />
        <FilterSlider
          label="Contrast"
          value={state.contrast}
          onChange={setKey("contrast")}
        />
        <FilterSlider
          label="Saturation"
          value={state.saturation}
          onChange={setKey("saturation")}
        />
      </SectionCard>

      <SectionCard title="Color Effects" subtitle="Monochrome, sepia, hue, and invert.">
        <FilterSlider
          label="Grayscale"
          value={state.grayscale}
          onChange={setKey("grayscale")}
          max={100}
          resetValue="0"
        />
        <FilterSlider
          label="Sepia"
          value={state.sepia}
          onChange={setKey("sepia")}
          max={100}
          resetValue="0"
        />
        <FilterSlider
          label="Hue Rotate"
          value={state.hueRotate}
          onChange={setKey("hueRotate")}
          max={360}
          unit="deg"
          resetValue="0"
        />
        <FilterSlider
          label="Invert"
          value={state.invert}
          onChange={setKey("invert")}
          max={100}
          resetValue="0"
        />
      </SectionCard>

      <SectionCard title="Optical" subtitle="Blur and opacity treatment.">
        <FilterSlider
          label="Blur"
          value={state.blur}
          onChange={setKey("blur")}
          max={50}
          unit="px"
          resetValue="0"
        />
        <FilterSlider
          label="Opacity"
          value={state.filterOpacity}
          onChange={setKey("filterOpacity")}
          max={100}
          resetValue="100"
        />
      </SectionCard>

      <SectionCard title="Drop Shadow" subtitle="Depth cast outside the frame.">
        <div className="space-y-4">
          <Switch
            checked={state.dropShadowEnabled}
            onChange={setKey("dropShadowEnabled")}
          />

          {state.dropShadowEnabled ? (
            <div
              className="space-y-4 border-l-2 pl-2"
              style={{ borderColor: "var(--primary)" }}
            >
              <div className="grid grid-cols-2 gap-4">
                <LabeledField label="X Offset">
                  <Slider
                    min={-50}
                    max={50}
                    step={1}
                    value={state.dropShadowX}
                    onChange={(value) => setKey("dropShadowX")(String(value))}
                  />
                </LabeledField>
                <LabeledField label="Y Offset">
                  <Slider
                    min={-50}
                    max={50}
                    step={1}
                    value={state.dropShadowY}
                    onChange={(value) => setKey("dropShadowY")(String(value))}
                  />
                </LabeledField>
              </div>

              <FilterSlider
                label="Blur Radius"
                value={state.dropShadowBlur}
                onChange={setKey("dropShadowBlur")}
                max={100}
                unit="px"
                resetValue="0"
              />

              <ColorControl
                label="Shadow Color"
                value={state.dropShadowColor}
                onChange={setKey("dropShadowColor")}
              />
            </div>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}
