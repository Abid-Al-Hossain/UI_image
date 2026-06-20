"use client";

import React, {
  useState,
  useRef,
  useMemo,
  useDeferredValue,
} from "react";
import ContrastGuard from "@/components/shared/color/ContrastGuard";
import AppShell from "@/components/shared/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "@/components/hooks/useHistoryState";
import PreviewDownloadPanel from "@/components/shared/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/components/shared/layout/PreviewPanel";
import { PlaygroundLayout } from "@/components/shared/layout/PlaygroundLayout";
import UndoRedoButtons from "@/components/shared/layout/UndoRedoButtons";
import SectionSelector from "@/components/shared/layout/SectionSelector";

// Sections
import LivePreview from "./_section/LivePreview";
import ImageBasicsSection from "./_section/ImageBasicsSection";
import ImageMetadataSection from "./_section/ImageMetadataSection";
import ImageCompositionSection from "./_section/ImageCompositionSection";
import ImageLoadingSection from "./_section/ImageLoadingSection";
import ImageFiltersSection from "./_section/ImageFiltersSection";
import ImageTransformSection from "./_section/ImageTransformSection";
import ImageShapeSection from "./_section/ImageShapeSection";
import ImageMaskingSection from "./_section/ImageMaskingSection";
import ImageEffectsSection from "./_section/ImageEffectsSection";
import ImageTypographySection from "./_section/ImageTypographySection";
import ImageAnimationSection from "./_section/ImageAnimationSection";
import ImageAccessibilitySection from "./_section/ImageAccessibilitySection";
import ImageStatesSection from "./_section/ImageStatesSection";
import ImagePresetsSection from "./_section/ImagePresetsSection";

// Types & Utils
import { type ImageState, INITIAL_IMAGE_STATE } from "./types";
import { buildImageExportPayload } from "./_utils/exportUtils";

export default function ImagePlaygroundPage() {
  const mounted = useHydrated();
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

  // Layout & Resize State (Unified)
  const [activeSection, setActiveSection] = useState("presets");

  // History State
  const {
    state,
    set: setState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<ImageState>(INITIAL_IMAGE_STATE);

  // Download/Export
  const [downloadName, setDownloadName] = useState("styled-image");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadName: downloadName || "styled-image",
      ...state,
    };
  }, [downloadName, state]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildImageExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildImageExportPayload(exportPayload);

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Section Configuration
  const sections = [
    { id: "presets", label: "Presets" },
    { id: "basics", label: "Basics", component: ImageBasicsSection },
    { id: "metadata", label: "Metadata", component: ImageMetadataSection },
    { id: "composition", label: "Composition", component: ImageCompositionSection },
    { id: "loading", label: "Loading", component: ImageLoadingSection },
    { id: "filters", label: "Filters", component: ImageFiltersSection },
    { id: "transform", label: "Transform", component: ImageTransformSection },
    { id: "shape", label: "Shape", component: ImageShapeSection },
    { id: "masking", label: "Masking", component: ImageMaskingSection },
    { id: "effects", label: "Effects", component: ImageEffectsSection },
    { id: "typography", label: "Typography", component: ImageTypographySection },
    { id: "animation", label: "Motion", component: ImageAnimationSection },
    { id: "states", label: "States", component: ImageStatesSection },
    { id: "accessibility", label: "Accessibility" },
  ];

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || ImageBasicsSection;

  const applyPreset = (presetState: Partial<ImageState>) => {
    setState(() => ({ ...INITIAL_IMAGE_STATE, ...presetState }));
    setPreviewResetKey((value) => value + 1);
  };

  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  const controls = (
    <>
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {activeSection === "presets" ? (
        <ImagePresetsSection state={state} applyPreset={applyPreset} />
      ) : activeSection === "accessibility" ? (
        <ImageAccessibilitySection
          hasAltText={Boolean(state.alt.trim())}
          hasMeaningfulRole={state.ariaRole !== "none"}
          isDecorative={state.ariaHidden}
          usesLazyLoading={state.loading === "lazy"}
        />
      ) : (
        <ActiveComponent state={state} setState={setState} />
      )}
    </>
  );

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={iframeRef}
      handleIframeLoad={() => {}}
      downloadFormat="react"
      setDownloadFormat={() => {}}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownload}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={<LivePreview key={previewResetKey} state={state} />}
      code={exportCode.content}
    />
  );
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Image Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
