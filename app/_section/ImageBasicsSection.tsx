"use client";

import React from "react";
import Image from "next/image";
import type { ImageState } from "../types";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import Input from "@/components/shared/input/Input";
import { IMAGE_PRESETS as presets } from "../types";

interface ImageBasicsSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageBasicsSection({
  state,
  setState,
}: ImageBasicsSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      {/* Target Source */}
      <LabeledField label="Image Source" hint="">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setKey("src")(preset.url)}
                className="relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105"
                style={{
                  borderColor:
                    state.src === preset.url
                      ? "var(--primary)"
                      : "var(--border)",
                  boxShadow:
                    state.src === preset.url
                      ? "0 0 0 2px var(--primary-shadow)"
                      : "none",
                }}
                title={preset.label}
              >
                <Image
                  src={preset.url}
                  alt={preset.label}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 33vw, 120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <Input
            value={state.src}
            onChange={(e) => setKey("src")(e.target.value)}
            placeholder="Or enter custom URL..."
          />
        </div>
      </LabeledField>

      <div className="grid grid-cols-2 gap-4">
        <LabeledField label="Width" hint="">
          <div className="flex gap-2">
            <Input
              value={state.width}
              onChange={(e) => setKey("width")(e.target.value)}
              className="flex-1"
            />
            <div className="w-20">
            <SegmentedControl
              value={state.widthUnit}
              onChange={(v) =>
                setKey("widthUnit")(v as ImageState["widthUnit"])
              }
              items={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "auto", label: "A" },
                ]}
              />
            </div>
          </div>
        </LabeledField>

        <LabeledField label="Height" hint="">
          <div className="flex gap-2">
            <Input
              value={state.height}
              onChange={(e) => setKey("height")(e.target.value)}
              className="flex-1"
            />
            <div className="w-20">
            <SegmentedControl
              value={state.heightUnit}
              onChange={(v) =>
                setKey("heightUnit")(v as ImageState["heightUnit"])
              }
              items={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "auto", label: "A" },
                ]}
              />
            </div>
          </div>
        </LabeledField>
      </div>

      <LabeledField label="Aspect Ratio" hint="">
        <div className="grid grid-cols-4 gap-2">
          {["1/1", "16/9", "4/3", "3/2", "21/9", "2/3", "9/16", "none"].map(
            (ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() =>
                  setKey("aspectRatio")(ratio as ImageState["aspectRatio"])
                }
                className="px-2 py-2 rounded-lg border text-xs font-medium transition-all"
                style={{
                  borderColor:
                    state.aspectRatio === ratio
                      ? "var(--primary)"
                      : "var(--border)",
                  background:
                    state.aspectRatio === ratio
                      ? "var(--primary)"
                      : "transparent",
                  color: state.aspectRatio === ratio ? "white" : "var(--text)",
                }}
              >
                {ratio}
              </button>
            ),
          )}
        </div>
      </LabeledField>

      <LabeledField label="Object Fit" hint="">
        <SegmentedControl
          value={state.objectFit}
          onChange={(v) => setKey("objectFit")(v as ImageState["objectFit"])}
          items={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "none", label: "None" },
          ]}
        />
      </LabeledField>

    </div>
  );
}
