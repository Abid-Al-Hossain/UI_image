"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/components/shared/input/Slider";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import ColorControl from "@/components/shared/color/ColorControl";
import Switch from "@/components/shared/input/Switch";

interface ImageShapeSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageShapeSection({
  state,
  setState,
}: ImageShapeSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-8">
      {/* Border Radius */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Border Radius
          </h3>
          <div className="w-32">
            <SegmentedControl
              value={state.borderRadiusMode}
              onChange={(v) =>
                setKey("borderRadiusMode")(v as ImageState["borderRadiusMode"])
              }
              items={[
                { value: "uniform", label: "Uniform" },
                { value: "individual", label: "Individual" },
              ]}
            />
          </div>
        </div>

        {state.borderRadiusMode === "uniform" ? (
          <LabeledField
            label="All Corners"
            hint={`${state.borderRadiusUniform}px`}
          >
            <Slider
              min={0}
              max={200}
              step={1}
              value={state.borderRadiusUniform}
              onChange={(value) => setKey("borderRadiusUniform")(String(value))}
            />
          </LabeledField>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <LabeledField label="Top Left" hint={`${state.borderRadiusTL}px`}>
              <Slider
                min={0}
                max={200}
                step={1}
                value={state.borderRadiusTL}
                onChange={(value) => setKey("borderRadiusTL")(String(value))}
              />
            </LabeledField>
            <LabeledField label="Top Right" hint={`${state.borderRadiusTR}px`}>
              <Slider
                min={0}
                max={200}
                step={1}
                value={state.borderRadiusTR}
                onChange={(value) => setKey("borderRadiusTR")(String(value))}
              />
            </LabeledField>
            <LabeledField
              label="Bottom Left"
              hint={`${state.borderRadiusBL}px`}
            >
              <Slider
                min={0}
                max={200}
                step={1}
                value={state.borderRadiusBL}
                onChange={(value) => setKey("borderRadiusBL")(String(value))}
              />
            </LabeledField>
            <LabeledField
              label="Bottom Right"
              hint={`${state.borderRadiusBR}px`}
            >
              <Slider
                min={0}
                max={200}
                step={1}
                value={state.borderRadiusBR}
                onChange={(value) => setKey("borderRadiusBR")(String(value))}
              />
            </LabeledField>
          </div>
        )}
      </div>

      {/* Clip Path */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Clip Shape
        </h3>
        <SegmentedControl
          value={state.clipPathShape}
          onChange={(v) =>
            setKey("clipPathShape")(v as ImageState["clipPathShape"])
          }
          items={[
            { value: "none", label: "None" },
            { value: "circle", label: "Circle" },
            { value: "ellipse", label: "Ellipse" },
          ]}
        />
        <div className="mt-2">
          <SegmentedControl
            value={state.clipPathShape}
            onChange={(v) =>
              setKey("clipPathShape")(v as ImageState["clipPathShape"])
            }
            items={[
              { value: "polygon", label: "Polygon" },
              { value: "inset", label: "Inset" },
            ]}
          />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Border
        </h3>
        <LabeledField label="Width" hint={`${state.borderWidth}px`}>
          <Slider
            min={0}
            max={20}
            step={1}
            value={state.borderWidth}
            onChange={(value) => setKey("borderWidth")(String(value))}
          />
        </LabeledField>

        {parseInt(state.borderWidth) > 0 && (
          <>
            <LabeledField label="Style">
              <SegmentedControl
                value={state.borderStyle}
                onChange={(v) =>
                  setKey("borderStyle")(v as ImageState["borderStyle"])
                }
                items={[
                  { value: "solid", label: "Solid" },
                  { value: "dashed", label: "Dashed" },
                  { value: "dotted", label: "Dotted" },
                  { value: "double", label: "Double" },
                ]}
              />
            </LabeledField>
            <ColorControl
              label="Border Color"
              value={state.borderColor}
              onChange={setKey("borderColor")}
            />
          </>
        )}
      </div>

      {/* Box Shadow */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Box Shadow
          </h3>
          <Switch
            checked={state.boxShadowEnabled}
            onChange={setKey("boxShadowEnabled")}
          />
        </div>

        {state.boxShadowEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <LabeledField label="X Offset">
                <Slider
                  min={-50}
                  max={50}
                  step={1}
                  value={state.boxShadowX}
                  onChange={(value) => setKey("boxShadowX")(String(value))}
                />
              </LabeledField>
              <LabeledField label="Y Offset">
                <Slider
                  min={-50}
                  max={50}
                  step={1}
                  value={state.boxShadowY}
                  onChange={(value) => setKey("boxShadowY")(String(value))}
                />
              </LabeledField>
            </div>

            <LabeledField label="Blur">
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.boxShadowBlur}
                onChange={(value) => setKey("boxShadowBlur")(String(value))}
              />
            </LabeledField>

            <LabeledField label="Spread">
              <Slider
                min={-20}
                max={50}
                step={1}
                value={state.boxShadowSpread}
                onChange={(value) => setKey("boxShadowSpread")(String(value))}
              />
            </LabeledField>

            <Switch
              label="Inset shadow"
              checked={state.boxShadowInset}
              onChange={setKey("boxShadowInset")}
            />

            <ColorControl
              label="Shadow Color"
              value={state.boxShadowColor}
              onChange={setKey("boxShadowColor")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
