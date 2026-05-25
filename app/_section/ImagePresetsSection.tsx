import React, { useMemo, useState } from "react";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
import { IMAGE_PRESETS } from "../_data/imagePresets";
import type { ImageState } from "../types";

type Props = {
  state: ImageState;
  applyPreset: (presetState: Partial<ImageState>) => void;
};

const PAGE_SIZE = 6;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
      style={{
        borderColor: "var(--border)",
        color: "var(--muted)",
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
      }}
    >
      {children}
    </span>
  );
}

export default function ImagePresetsSection({ state, applyPreset }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [archetype, setArchetype] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(
    () => Array.from(new Set(IMAGE_PRESETS.map((preset) => preset.family))),
    [],
  );
  const archetypes = useMemo(
    () => Array.from(new Set(IMAGE_PRESETS.map((preset) => preset.archetype))),
    [],
  );
  const sizes = useMemo(
    () => Array.from(new Set(IMAGE_PRESETS.map((preset) => preset.size))),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return IMAGE_PRESETS.filter((preset) => {
      if (family !== "all" && preset.family !== family) return false;
      if (archetype !== "all" && preset.archetype !== archetype) return false;
      if (size !== "all" && preset.size !== size) return false;
      if (!q) return true;
      const haystack = [
        preset.label,
        preset.description,
        preset.family,
        preset.archetype,
        preset.variant,
        preset.size,
        ...(preset.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [archetype, family, query, size]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setArchetype("all");
    setSize("all");
    setPage(0);
  };

  const surpriseMe = () => {
    if (!filtered.length) return;
    applyPreset(pickRandomPreset(filtered).state);
  };

  return (
    <div className="space-y-4">
      <Section
        title="Presets"
        subtitle={`${IMAGE_PRESETS.length} editable starting points built from the current image system.`}
      >
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Search presets
              </span>
              <input
                value={query}
                onChange={(event) => {
                  setPage(0);
                  setQuery(event.target.value);
                }}
                placeholder="Search by label, description, or tag"
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Filter by family
              </span>
              <select
                value={family}
                onChange={(event) => {
                  setPage(0);
                  setFamily(event.target.value);
                }}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              >
                <option value="all">All families</option>
                {families.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Filter by archetype
              </span>
              <select
                value={archetype}
                onChange={(event) => {
                  setPage(0);
                  setArchetype(event.target.value);
                }}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              >
                <option value="all">All archetypes</option>
                {archetypes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                Filter by size
              </span>
              <select
                value={size}
                onChange={(event) => {
                  setPage(0);
                  setSize(event.target.value);
                }}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              >
                <option value="all">All sizes</option>
                {sizes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border px-3 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Reset filters
            </button>
            <button
              type="button"
              onClick={surpriseMe}
              disabled={!filtered.length}
              className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50"
              style={{
                borderColor: "color-mix(in oklab, var(--primary) 55%, var(--border))",
                background: "color-mix(in oklab, var(--primary) 18%, transparent)",
                color: "var(--text)",
              }}
            >
              Surprise me
            </button>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              Presets apply a full editable snapshot. Continue editing from any section after applying one.
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {visible.length === 0 ? (
              <div
                className="rounded-2xl border p-6 text-sm lg:col-span-2"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--card) 68%, transparent)",
                  color: "var(--muted)",
                }}
              >
                No presets match the current filters. Adjust or reset the filters to continue.
              </div>
            ) : (
              visible.map((preset, index) => {
                const active = state.alt === (preset.state.alt ?? state.alt) && state.src === (preset.state.src ?? state.src);
                return (
                  <div
                    key={preset.id}
                    className="rounded-2xl border p-4"
                    style={{
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      background: active
                        ? "color-mix(in oklab, var(--primary) 8%, var(--surface))"
                        : "color-mix(in oklab, var(--card) 72%, transparent)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                          {preset.label}
                        </div>
                        <div className="mt-1 text-xs leading-5" style={{ color: "var(--muted)" }}>
                          {preset.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => applyPreset(preset.state)}
                        className="rounded-xl px-3 py-2 text-xs font-semibold"
                        style={{
                          background: "var(--primary)",
                          color: "#ffffff",
                        }}
                      >
                        {active ? "Applied" : "Apply"}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Chip>{preset.family}</Chip>
                      <Chip>{preset.archetype}</Chip>
                      <Chip>{preset.size}</Chip>
                      {(preset.tags ?? []).slice(0, 4).map((label) => (
                        <Chip key={`${preset.id}-${label}`}>{label}</Chip>
                      ))}
                      <Chip>{index + 1}</Chip>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              Page {safePage + 1} of {pageCount}
            </div>
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 0}
                onClick={() => setPage(Math.max(0, safePage - 1))}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={safePage >= pageCount - 1}
                onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
