"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { StepProgress } from "@/components/wizard/StepProgress";
import { StepNav } from "@/components/wizard/StepNav";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { CoverLetterPreview } from "@/components/preview/CoverLetterPreview";
import { ExampleModal } from "@/components/wizard/ExampleModal";
import { A4PrintPreviewButton } from "@/components/wizard/A4PrintPreview";
import { IntroStep } from "@/components/cover-letter-steps/IntroStep";
import { DetailsStep } from "@/components/cover-letter-steps/DetailsStep";
import { ParagraphStep } from "@/components/cover-letter-steps/ParagraphStep";
import { ReviewStep } from "@/components/cover-letter-steps/ReviewStep";
import { useLocalStorageState, clearLocalStorageState } from "@/lib/useLocalStorageState";
import { emptyCoverLetterData, type CoverLetterData } from "@/lib/types";
import { clOpeningStep, clFitStep, clCompanyStep, clSignOffStep, exampleCoverLetter } from "@/lib/content";
import { downloadCoverLetterPdf, downloadCoverLetterDocx } from "@/lib/downloads";

const STORAGE_KEY = "cover-letter-builder-data-v1";

const STEP_LABELS = [
  "Intro",
  "Your Details",
  "Opening",
  "Why You Fit",
  "Why This Company",
  "Sign-off",
  "Finalise",
];

export default function CoverLetterBuilderPage() {
  const { value: data, setValue: setData, hydrated } = useLocalStorageState<CoverLetterData>(
    STORAGE_KEY,
    emptyCoverLetterData
  );
  const [step, setStep] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);

  function patch(p: Partial<CoverLetterData>) {
    setData((prev) => ({ ...prev, ...p }));
  }

  function goTo(i: number) {
    setStep(Math.max(0, Math.min(STEP_LABELS.length - 1, i)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDownloadPdf() {
    setPdfLoading(true);
    try {
      await downloadCoverLetterPdf(data);
    } finally {
      setPdfLoading(false);
    }
  }

  async function handleDownloadDocx() {
    setDocxLoading(true);
    try {
      await downloadCoverLetterDocx(data);
    } finally {
      setDocxLoading(false);
    }
  }

  function startOver() {
    if (!window.confirm("This will clear everything you've entered. Are you sure?")) return;
    clearLocalStorageState(STORAGE_KEY);
    setData(emptyCoverLetterData);
    setStep(0);
  }

  if (!hydrated) return null;

  let stepContent: React.ReactNode;
  switch (step) {
    case 0:
      stepContent = <IntroStep />;
      break;
    case 1:
      stepContent = <DetailsStep data={data} onChange={patch} />;
      break;
    case 2:
      stepContent = (
        <ParagraphStep
          content={clOpeningStep}
          value={data.openingParagraph}
          onChange={(v) => patch({ openingParagraph: v })}
          fieldLabel="Your opening paragraph"
          placeholder="I am writing to apply for the..."
        />
      );
      break;
    case 3:
      stepContent = (
        <ParagraphStep
          content={clFitStep}
          value={data.fitParagraph}
          onChange={(v) => patch({ fitParagraph: v })}
          fieldLabel="Why you're a good fit"
        />
      );
      break;
    case 4:
      stepContent = (
        <ParagraphStep
          content={clCompanyStep}
          value={data.companyParagraph}
          onChange={(v) => patch({ companyParagraph: v })}
          fieldLabel="Why this company"
        />
      );
      break;
    case 5:
      stepContent = (
        <ParagraphStep
          content={clSignOffStep}
          value={data.closingParagraph}
          onChange={(v) => patch({ closingParagraph: v })}
          fieldLabel="Your sign-off paragraph"
          placeholder="Thank you for considering my application..."
        />
      );
      break;
    default:
      stepContent = (
        <ReviewStep
          onDownloadPdf={handleDownloadPdf}
          onDownloadDocx={handleDownloadDocx}
          pdfLoading={pdfLoading}
          docxLoading={docxLoading}
        />
      );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: "#26215c" }}>
            Cover Letter Builder
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Step {step + 1} of {STEP_LABELS.length}
          </p>
        </div>
        <div className="flex items-center gap-2 no-print shrink-0">
          <ExampleModal buttonLabel="View example" title="Example cover letter — Jessica Taylor">
            <CoverLetterPreview data={exampleCoverLetter} />
          </ExampleModal>
          <A4PrintPreviewButton title="Print Preview — your cover letter">
            <CoverLetterPreview data={data} />
          </A4PrintPreviewButton>
          <button
            type="button"
            onClick={startOver}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={13} /> Start over
          </button>
        </div>
      </div>

      <StepProgress labels={STEP_LABELS} currentIndex={step} onJump={goTo} />

      <WizardLayout
        main={
          <div className="space-y-5">
            {stepContent}
            <StepNav
              hideBack={step === 0}
              onBack={() => goTo(step - 1)}
              onNext={step < STEP_LABELS.length - 1 ? () => goTo(step + 1) : undefined}
              nextLabel={step === STEP_LABELS.length - 2 ? "Review & Finalise" : "Continue"}
            />
          </div>
        }
        preview={<CoverLetterPreview data={data} />}
      />
    </div>
  );
}
