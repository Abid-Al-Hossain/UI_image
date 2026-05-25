"use client";

import React from "react";
import type { ImageState } from "../types";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";

type Props = {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
};

export default function ImageLoadingSection({ state, setState }: Props) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <Section
        title="Loading Strategy"
        subtitle="Control how the image loads and when it should decode."
      >
        <div className="space-y-4">
          <LabeledField label="Loading">
            <SegmentedControl
              value={state.loading}
              onChange={(v) => setKey("loading")(v as ImageState["loading"])}
              items={[
                { value: "lazy", label: "Lazy" },
                { value: "eager", label: "Eager" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Decoding">
            <SegmentedControl
              value={state.decoding}
              onChange={(v) =>
                setKey("decoding")(v as ImageState["decoding"])
              }
              items={[
                { value: "auto", label: "Auto" },
                { value: "async", label: "Async" },
                { value: "sync", label: "Sync" },
              ]}
            />
          </LabeledField>

          <div className="rounded-xl border p-4 text-xs leading-5" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            Use `lazy` for most content images. Switch to `eager` only for above-the-fold hero art or when the image must appear immediately.
          </div>
        </div>
      </Section>
    </div>
  );
}
