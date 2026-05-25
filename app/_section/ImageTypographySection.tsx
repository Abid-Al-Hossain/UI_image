"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import ColorControl from "@/components/shared/color/ColorControl";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";

interface ImageTypographySectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageTypographySection({
  state,
  setState,
}: ImageTypographySectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Typography"
        subtitle="Caption text treatment for editorial overlays."
      >
        {state.captionEnabled ? (
          <div className="space-y-4">
            <ColorControl
              label="Caption Color"
              value={state.captionTextColor}
              onChange={setKey("captionTextColor")}
            />

            <LabeledField label="Caption Size" hint={`${state.captionFontSize}px`}>
              <Slider
                min={12}
                max={48}
                step={1}
                value={state.captionFontSize}
                onChange={setKey("captionFontSize")}
              />
            </LabeledField>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Enable the caption overlay in Effects to style caption typography.
          </p>
        )}
      </SectionCard>
    </div>
  );
}
