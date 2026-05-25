"use client";

import React from "react";
import type { ImageState } from "../types";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import Input from "@/components/shared/input/Input";

type Props = {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
};

const POSITION_PRESETS = [
  { label: "Center", x: "50", y: "50" },
  { label: "Top", x: "50", y: "20" },
  { label: "Bottom", x: "50", y: "80" },
  { label: "Left", x: "20", y: "50" },
  { label: "Right", x: "80", y: "50" },
  { label: "Top Left", x: "20", y: "20" },
  { label: "Top Right", x: "80", y: "20" },
  { label: "Bottom Left", x: "20", y: "80" },
  { label: "Bottom Right", x: "80", y: "80" },
] as const;

const ARCHETYPES = [
  {
    id: "hero",
    label: "Hero",
    state: {
      objectPositionX: "50",
      objectPositionY: "40",
      overlayEnabled: true,
      overlayOpacity: "28",
      overlayBlendMode: "overlay",
      captionEnabled: true,
      captionText: "Hero image",
      captionPosition: "bottom",
      captionBgStyle: "gradient",
      vignetteEnabled: true,
      duotoneEnabled: false,
      maskType: "none",
      clipPathShape: "none",
    },
  },
  {
    id: "editorial",
    label: "Editorial",
    state: {
      objectPositionX: "50",
      objectPositionY: "50",
      captionEnabled: true,
      captionText: "Editorial card",
      captionPosition: "top",
      captionBgStyle: "glass",
      overlayEnabled: false,
      vignetteEnabled: false,
      duotoneEnabled: false,
      maskType: "none",
      clipPathShape: "none",
    },
  },
  {
    id: "gallery",
    label: "Gallery",
    state: {
      objectPositionX: "50",
      objectPositionY: "50",
      captionEnabled: false,
      overlayEnabled: false,
      vignetteEnabled: false,
      duotoneEnabled: false,
      maskType: "none",
      clipPathShape: "none",
      borderRadiusMode: "uniform",
      borderRadiusUniform: "18",
    },
  },
  {
    id: "poster",
    label: "Poster",
    state: {
      objectPositionX: "50",
      objectPositionY: "35",
      maskType: "linear-gradient",
      maskAngle: "180",
      maskStartOpacity: "100",
      maskEndOpacity: "0",
      captionEnabled: true,
      captionText: "Poster crop",
      captionPosition: "center",
      captionBgStyle: "solid",
      overlayEnabled: true,
      overlayOpacity: "18",
      overlayBlendMode: "multiply",
      vignetteEnabled: false,
      duotoneEnabled: false,
      clipPathShape: "polygon",
    },
  },
  {
    id: "duotone",
    label: "Duotone",
    state: {
      objectPositionX: "50",
      objectPositionY: "50",
      duotoneEnabled: true,
      duotoneColor1: "#0f172a",
      duotoneColor2: "#38bdf8",
      overlayEnabled: true,
      overlayOpacity: "10",
      overlayBlendMode: "screen",
      captionEnabled: false,
      vignetteEnabled: false,
      maskType: "none",
      clipPathShape: "none",
    },
  },
  {
    id: "vignette",
    label: "Vignette",
    state: {
      objectPositionX: "50",
      objectPositionY: "50",
      vignetteEnabled: true,
      vignetteIntensity: "22",
      vignetteSoftness: "48",
      vignetteColor: "#000000",
      overlayEnabled: false,
      captionEnabled: false,
      duotoneEnabled: false,
      maskType: "vignette",
      clipPathShape: "none",
    },
  },
] as const;

function chipStyle(active: boolean): React.CSSProperties {
  return {
    borderColor: active ? "var(--primary)" : "var(--border)",
    background: active
      ? "color-mix(in oklab, var(--primary) 16%, var(--surface))"
      : "color-mix(in oklab, var(--surface) 70%, transparent)",
    color: "var(--text)",
  };
}

export default function ImageCompositionSection({ state, setState }: Props) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const applyArchetype = (
    archetype: (typeof ARCHETYPES)[number],
  ) => {
    setState((prev) => ({
      ...prev,
      ...archetype.state,
    }));
  };

  return (
    <div className="space-y-6">
      <Section
        title="Object Position"
        subtitle="Jump between common crop anchors or fine-tune the values directly."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {POSITION_PRESETS.map((preset) => {
              const active =
                state.objectPositionX === preset.x &&
                state.objectPositionY === preset.y;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setKey("objectPositionX")(preset.x);
                    setKey("objectPositionY")(preset.y);
                  }}
                  className="rounded-xl border px-3 py-2 text-sm font-semibold transition"
                  style={chipStyle(active)}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <LabeledField label="X" hint={`${state.objectPositionX}%`}>
              <Input
                value={state.objectPositionX}
                onChange={(e) => setKey("objectPositionX")(e.target.value)}
                placeholder="50"
              />
            </LabeledField>
            <LabeledField label="Y" hint={`${state.objectPositionY}%`}>
              <Input
                value={state.objectPositionY}
                onChange={(e) => setKey("objectPositionY")(e.target.value)}
                placeholder="50"
              />
            </LabeledField>
          </div>
        </div>
      </Section>

      <Section
        title="Archetypes"
        subtitle="Apply richer editorial, duotone, and overlay compositions in one step."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {ARCHETYPES.map((archetype) => {
            const active =
              state.objectPositionX === archetype.state.objectPositionX &&
              state.objectPositionY === archetype.state.objectPositionY &&
              state.overlayEnabled === (archetype.state.overlayEnabled ?? state.overlayEnabled) &&
              state.duotoneEnabled === (archetype.state.duotoneEnabled ?? state.duotoneEnabled) &&
              state.vignetteEnabled === (archetype.state.vignetteEnabled ?? state.vignetteEnabled);
            return (
              <button
                key={archetype.id}
                type="button"
                onClick={() => applyArchetype(archetype)}
                className="rounded-2xl border p-4 text-left transition"
                style={chipStyle(active)}
              >
                <div className="text-sm font-semibold">{archetype.label}</div>
                <div className="mt-1 text-xs leading-5" style={{ color: "var(--muted)" }}>
                  {archetype.id === "hero"
                    ? "Hero framing with overlay and vignette."
                    : archetype.id === "editorial"
                      ? "Calm editorial caption with glass treatment."
                      : archetype.id === "gallery"
                        ? "Clean gallery tile with minimal adornment."
                        : archetype.id === "poster"
                          ? "Cinematic poster crop with masked fade."
                          : archetype.id === "duotone"
                            ? "Duotone layering with overlay balance."
                            : "Soft vignette-led composition."}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section
        title="Composition Controls"
        subtitle="Fine-tune overlays, masks, captions, and blend behavior."
      >
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Caption Position
              </span>
              <SegmentedControl
                value={state.captionPosition}
                onChange={(v) =>
                  setKey("captionPosition")(v as ImageState["captionPosition"])
                }
                items={[
                  { value: "top", label: "Top" },
                  { value: "center", label: "Center" },
                  { value: "bottom", label: "Bottom" },
                ]}
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Caption Style
              </span>
              <SegmentedControl
                value={state.captionBgStyle}
                onChange={(v) =>
                  setKey("captionBgStyle")(v as ImageState["captionBgStyle"])
                }
                items={[
                  { value: "solid", label: "Solid" },
                  { value: "gradient", label: "Gradient" },
                  { value: "glass", label: "Glass" },
                ]}
              />
            </label>
          </div>
        </div>
      </Section>
    </div>
  );
}
