"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { StepProgress } from "@/components/wizard/StepProgress";
import { StepNav } from "@/components/wizard/StepNav";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { ExampleModal } from "@/components/wizard/ExampleModal";
import { IntroStep } from "@/components/resume-steps/IntroStep";
import { ContactStep } from "@/components/resume-steps/ContactStep";
import { PersonalStatementStep } from "@/components/resume-steps/PersonalStatementStep";
import { PersonalQualitiesStep } from "@/components/resume-steps/PersonalQualitiesStep";
import { EducationStep } from "@/components/resume-steps/EducationStep";
import { EmploymentStep } from "@/components/resume-steps/EmploymentStep";
import { SkillsStep } from "@/components/resume-steps/SkillsStep";
import { AchievementsStep } from "@/components/resume-steps/AchievementsStep";
import { HobbiesStep } from "@/components/resume-steps/HobbiesStep";
import { RefereesStep } from "@/components/resume-steps/RefereesStep";
import { ReviewStep } from "@/components/resume-steps/ReviewStep";
import { useLocalStorageState, clearLocalStorageState } from "@/lib/useLocalStorageState";
import { emptyResumeData, type ResumeData } from "@/lib/types";
import { exampleResume } from "@/lib/content";
import { downloadResumePdf, downloadResumeDocx } from "@/lib/downloads";

const STORAGE_KEY = "resume-builder-data-v1";

const STEP_LABELS = [
  "Intro",
  "Contact",
  "Personal Statement",
  "Qualities",
  "Education",
  "Employment",
  "Skills",
  "Achievements",
  "Hobbies",
  "Referees",
  "Finalise",
];

export default function ResumeBuilderPage() {
  const { value: data, setValue: setData, hydrated } = useLocalStorageState<ResumeData>(STORAGE_KEY, emptyResumeData);
  const [step, setStep] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);

  function patch(p: Partial<ResumeData>) {
    setData((prev) => ({ ...prev, ...p }));
  }

  function goTo(i: number) {
    setStep(Math.max(0, Math.min(STEP_LABELS.length - 1, i)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDownloadPdf() {
    setPdfLoading(true);
    try {
      await downloadResumePdf(data);
    } finally {
      setPdfLoading(false);
    }
  }

  async function handleDownloadDocx() {
    setDocxLoading(true);
    try {
      await downloadResumeDocx(data);
    } finally {
      setDocxLoading(false);
    }
  }

  function startOver() {
    if (!window.confirm("This will clear everything you've entered. Are you sure?")) return;
    clearLocalStorageState(STORAGE_KEY);
    setData(emptyResumeData);
    setStep(0);
  }

  if (!hydrated) return null;

  let stepContent: React.ReactNode;
  switch (step) {
    case 0:
      stepContent = <IntroStep />;
      break;
    case 1:
      stepContent = <ContactStep data={data} onChange={patch} />;
      break;
    case 2:
      stepContent = <PersonalStatementStep data={data} onChange={patch} />;
      break;
    case 3:
      stepContent = <PersonalQualitiesStep data={data} onChange={patch} />;
      break;
    case 4:
      stepContent = <EducationStep data={data} onChange={patch} />;
      break;
    case 5:
      stepContent = <EmploymentStep data={data} onChange={patch} />;
      break;
    case 6:
      stepContent = <SkillsStep data={data} onChange={patch} />;
      break;
    case 7:
      stepContent = <AchievementsStep data={data} onChange={patch} />;
      break;
    case 8:
      stepContent = <HobbiesStep data={data} onChange={patch} />;
      break;
    case 9:
      stepContent = <RefereesStep data={data} onChange={patch} />;
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
            Resume Builder
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Step {step + 1} of {STEP_LABELS.length}</p>
        </div>
        <div className="flex items-center gap-2 no-print shrink-0">
          <ExampleModal buttonLabel="View example" title="Example resume — Jessica Taylor">
            <ResumePreview data={exampleResume} />
          </ExampleModal>
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
        preview={<ResumePreview data={data} />}
      />
    </div>
  );
}
