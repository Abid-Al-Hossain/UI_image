import React from "react";
import { SectionCard as Section } from "@/components/shared/layout/SectionCard";
type Props = {
  hasAltText: boolean;
  hasMeaningfulRole: boolean;
  isDecorative: boolean;
  usesLazyLoading: boolean;
};
export default function ImageAccessibilitySection({
  hasAltText,
  hasMeaningfulRole,
  isDecorative,
  usesLazyLoading,
}: Props) {

  return (
    <div className="space-y-6">
      <Section title="Accessibility Review" subtitle="Validate the metadata and loading choices.">
        <div className="space-y-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <p>Keep descriptive images exposed with real alt text and use decorative hiding only when the image adds no meaning.</p>
          <p>Use figure semantics only when the image participates in a larger captioned or illustrative composition.</p>
          <p>Lazy loading is usually the right default outside of critical hero media.</p>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={hasAltText}
            label="Has descriptive alt text"
          />
          <AccessibilityCheck
            passed={hasMeaningfulRole || isDecorative}
            label="Role or aria-hidden configured"
          />
          <AccessibilityCheck
            passed={!isDecorative || !hasAltText}
            label="Decorative mode does not keep redundant spoken content"
          />
          <AccessibilityCheck
            passed={usesLazyLoading}
            label="Uses lazy loading for performance"
          />
        </div>
      </Section>
    </div>
  );
}

function AccessibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "OK" : "X"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
