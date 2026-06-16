"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";

interface ImageAnimationSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageAnimationSection({
  state,
  setState,
}: ImageAnimationSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const hoverOptions = [
    { value: "none", label: "None" },
    { value: "zoom-in", label: "Zoom In" },
    { value: "zoom-out", label: "Zoom Out" },
    { value: "rotate", label: "Rotate" },
    { value: "lift", label: "Lift" },
    { value: "tilt", label: "Tilt" },
    { value: "brightness", label: "Brightness" },
    { value: "grayscale", label: "Grayscale" },
  ];

  const entranceOptions = [
    { value: "none", label: "None" },
    { value: "fade-in", label: "Fade In" },
    { value: "slide-up", label: "Slide Up" },
    { value: "zoom-in", label: "Zoom In" },
    { value: "blur-in", label: "Blur In" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Entrance" subtitle="How the image arrives into view.">
      <div className="space-y-4">
        <LabeledField label="Type">
          <Select
            value={state.entranceAnimation}
            onChange={(value) =>
              setKey("entranceAnimation")(
                value as ImageState["entranceAnimation"],
              )
            }
            options={entranceOptions}
          />
        </LabeledField>

        {state.entranceAnimation !== "none" ? (
          <>
            <LabeledField label="Duration" hint={`${state.entranceDuration}ms`}>
              <Slider
                min={100}
                max={2000}
                step={100}
                value={state.entranceDuration}
                onChange={setKey("entranceDuration")}
              />
            </LabeledField>

            <LabeledField label="Delay" hint={`${state.entranceDelay}ms`}>
              <Slider
                min={0}
                max={2000}
                step={100}
                value={state.entranceDelay}
                onChange={setKey("entranceDelay")}
              />
            </LabeledField>
          </>
        ) : null}
      </div>
    </SectionCard>

      <SectionCard title="Hover" subtitle="Interactive motion on pointer hover.">
      <div className="space-y-4">
        <LabeledField label="Effect">
          <Select
            value={state.hoverEffect}
            onChange={(value) =>
              setKey("hoverEffect")(value as ImageState["hoverEffect"])
            }
            options={hoverOptions}
          />
        </LabeledField>

        {state.hoverEffect !== "none" ? (
          <LabeledField label="Duration" hint={`${state.hoverDuration}ms`}>
            <Slider
              min={100}
              max={1000}
              step={50}
              value={state.hoverDuration}
              onChange={setKey("hoverDuration")}
            />
          </LabeledField>
        ) : null}

        {(state.hoverEffect === "zoom-in" ||
          state.hoverEffect === "zoom-out") && (
          <LabeledField label="Scale" hint={`x${state.hoverZoomScale}`}>
            <Slider
              min={0.1}
              max={3}
              step={0.1}
              value={state.hoverZoomScale}
              onChange={setKey("hoverZoomScale")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "rotate" && (
          <LabeledField label="Angle" hint={`${state.hoverRotateAngle} deg`}>
            <Slider
              min={-360}
              max={360}
              step={5}
              value={state.hoverRotateAngle}
              onChange={setKey("hoverRotateAngle")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "lift" && (
          <LabeledField label="Lift Amount" hint={`${state.hoverLiftAmount}px`}>
            <Slider
              min={-50}
              max={50}
              step={1}
              value={state.hoverLiftAmount}
              onChange={setKey("hoverLiftAmount")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "tilt" && (
          <LabeledField label="Tilt Amount" hint={`${state.hoverTiltAmount} deg`}>
            <Slider
              min={0}
              max={45}
              step={1}
              value={state.hoverTiltAmount}
              onChange={setKey("hoverTiltAmount")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "brightness" && (
          <LabeledField label="Intensity" hint={`${state.hoverIntensity}%`}>
            <Slider
              min={0}
              max={200}
              step={10}
              value={state.hoverIntensity}
              onChange={setKey("hoverIntensity")}
            />
          </LabeledField>
        )}
      </div>
    </SectionCard>
    </div>
  );
}
