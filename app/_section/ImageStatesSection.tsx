"use client";

import React from "react";
import type { ImageState } from "../types";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import ColorControl from "@/components/shared/color/ColorControl";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";

interface Props {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageStatesSection({ state, setState }: Props) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <SectionCard title="Accessibility Labels" subtitle="Explicit ARIA beyond role/aria-hidden.">
      <div className="space-y-4">
        <LabeledField label="Aria Label">
          <Input value={state.ariaLabel} onChange={(e) => setKey("ariaLabel")(e.target.value)} placeholder="Describe the image purpose" />
        </LabeledField>
        <LabeledField label="Aria Described By">
          <Input value={state.ariaDescribedBy} onChange={(e) => setKey("ariaDescribedBy")(e.target.value)} placeholder="element-id" />
        </LabeledField>
      </div>
    </SectionCard>

      <SectionCard title="Link" subtitle="Make the image a clickable link.">
      <div className="space-y-4">
        <LabeledField label="Href">
          <Input value={state.linkHref} onChange={(e) => setKey("linkHref")(e.target.value)} placeholder="https://example.com" />
        </LabeledField>
        <LabeledField label="Target">
          <SegmentedControl
            value={state.linkTarget}
            onChange={(v) => setKey("linkTarget")(v as ImageState["linkTarget"])}
            items={[{ value: "_self", label: "Same tab" }, { value: "_blank", label: "New tab" }]}
          />
        </LabeledField>
        <LabeledField label="Rel">
          <Input value={state.linkRel} onChange={(e) => setKey("linkRel")(e.target.value)} placeholder="noopener noreferrer" />
        </LabeledField>
      </div>
    </SectionCard>

      <SectionCard title="Focus Ring" subtitle="Keyboard focus indicator (only applies when a link is set).">
      <div className="space-y-4">
        <LabeledField label="Enabled">
          <Select value={state.focusRingEnabled ? "true" : "false"} onChange={(v) => setKey("focusRingEnabled")(v === "true")} options={[{ value: "true", label: "Yes" }, { value: "false", label: "No" }]} />
        </LabeledField>
        <ColorControl label="Ring color" value={state.focusRingColor} onChange={setKey("focusRingColor")} />
      </div>
    </SectionCard>

      <SectionCard title="Transitions" subtitle="Used for disabled/opacity changes when no hover effect is active.">
      <div className="space-y-4">
        <LabeledField label="Duration (ms)">
          <Input type="number" value={String(state.transitionDuration)} onChange={(e) => setKey("transitionDuration")(Number(e.target.value) || 0)} />
        </LabeledField>
        <SegmentedControl
          value={state.transitionEasing}
          onChange={(v) => setKey("transitionEasing")(v as ImageState["transitionEasing"])}
          items={[
            { value: "ease", label: "Ease" },
            { value: "ease-in", label: "In" },
            { value: "ease-out", label: "Out" },
            { value: "ease-in-out", label: "In-Out" },
            { value: "linear", label: "Linear" },
          ]}
        />
      </div>
    </SectionCard>

      <SectionCard title="Disabled State" subtitle="Greyed-out, non-interactive image.">
      <div className="space-y-4">
        <LabeledField label="Disabled">
          <Select value={state.disabled ? "true" : "false"} onChange={(v) => setKey("disabled")(v === "true")} options={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]} />
        </LabeledField>
        <LabeledField label="Disabled Opacity">
          <Input type="number" value={String(state.disabledOpacity)} onChange={(e) => setKey("disabledOpacity")(Number(e.target.value) || 0.5)} />
        </LabeledField>
      </div>
    </SectionCard>

      <SectionCard title="Fallback & Loading Placeholder" subtitle="Shown while loading or when the image fails.">
      <div className="space-y-4">
        <ColorControl label="Fallback background (on error)" value={state.objectFitFallbackBg} onChange={setKey("objectFitFallbackBg")} />
        <LabeledField label="Loading placeholder">
          <SegmentedControl
            value={state.loadingPlaceholder}
            onChange={(v) => setKey("loadingPlaceholder")(v as ImageState["loadingPlaceholder"])}
            items={[
              { value: "none", label: "None" },
              { value: "skeleton", label: "Skeleton" },
              { value: "blur", label: "Blur" },
            ]}
          />
        </LabeledField>
        <ColorControl label="Placeholder color" value={state.loadingPlaceholderColor} onChange={setKey("loadingPlaceholderColor")} />
      </div>
    </SectionCard>
    </div>
  );
}
