"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { heraldQuestions } from "@/lib/herald/questions";
import {
  emptyRegimentProfile,
  type RegimentProfile,
} from "@/types/regiment";

const STORAGE_KEY = "family-regiment-profile";

export default function HeraldWizard() {
  const router = useRouter();

  const [profile, setProfile] = useState<RegimentProfile>(
    emptyRegimentProfile,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState("");

  const currentQuestion = heraldQuestions[currentQuestionIndex];
  const currentValue = profile[currentQuestion.id];

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / heraldQuestions.length) * 100;
  }, [currentQuestionIndex]);

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion =
    currentQuestionIndex === heraldQuestions.length - 1;

  function updateStringValue(value: string) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [currentQuestion.id]: value,
    }));

    setError("");
  }

  function toggleMultiValue(option: string) {
    const existingValues = Array.isArray(currentValue)
      ? currentValue
      : [];

    const isSelected = existingValues.includes(option);

    if (isSelected) {
      setProfile((currentProfile) => ({
        ...currentProfile,
        [currentQuestion.id]: existingValues.filter(
          (value) => value !== option,
        ),
      }));

      setError("");
      return;
    }

    if (
      currentQuestion.maxSelections &&
      existingValues.length >= currentQuestion.maxSelections
    ) {
      setError(
        `Choose no more than ${currentQuestion.maxSelections} options.`,
      );
      return;
    }

    setProfile((currentProfile) => ({
      ...currentProfile,
      [currentQuestion.id]: [...existingValues, option],
    }));

    setError("");
  }

  function questionHasAnswer() {
    if (currentQuestion.optional) {
      return true;
    }

    if (Array.isArray(currentValue)) {
      return currentValue.length > 0;
    }

    return currentValue.trim().length > 0;
  }

  function handleContinue() {
    if (!questionHasAnswer()) {
      setError("Please answer this question before continuing.");
      return;
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex((index) => index + 1);
      setError("");
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile),
    );

    router.push("/herald/reveal");
  }

  function handleBack() {
    if (isFirstQuestion) {
      router.push("/herald");
      return;
    }

    setCurrentQuestionIndex((index) => index - 1);
    setError("");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171815] text-[#F2EBDD]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.14),_transparent_52%)]" />

      <header className="relative z-10 border-b border-white/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E0D0]">
            The Family Regiment
          </p>

          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8F8B82]">
            The Herald
          </p>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-75px)] w-full max-w-4xl flex-col px-6 py-10 md:px-10 md:py-14">
        <div>
          <div className="flex items-center justify-between gap-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B08D57]">
              Recording Your Regiment
            </p>

            <p className="text-[10px] uppercase tracking-[0.24em] text-[#77736B]">
              {currentQuestionIndex + 1} of {heraldQuestions.length}
            </p>
          </div>

          <div className="mt-4 h-px overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#C6A66B] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center py-12 md:py-16">
          <div className="w-full">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8D887F]">
              Question {currentQuestionIndex + 1}
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] text-[#F4EDDE] sm:text-5xl md:text-6xl">
              {currentQuestion.title}
            </h1>

            {currentQuestion.description && (
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#9D988E]">
                {currentQuestion.description}
              </p>
            )}

            <div className="mt-10">
              {currentQuestion.type === "text" && (
                <input
                  type="text"
                  value={
                    typeof currentValue === "string"
                      ? currentValue
                      : ""
                  }
                  onChange={(event) =>
                    updateStringValue(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleContinue();
                    }
                  }}
                  placeholder={currentQuestion.placeholder}
                  autoFocus
                  className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-5 font-serif text-2xl text-[#F4EDDE] outline-none transition placeholder:text-[#5F5C56] focus:border-[#C6A66B] sm:text-3xl"
                />
              )}

              {currentQuestion.type === "textarea" && (
                <textarea
                  value={
                    typeof currentValue === "string"
                      ? currentValue
                      : ""
                  }
                  onChange={(event) =>
                    updateStringValue(event.target.value)
                  }
                  placeholder={currentQuestion.placeholder}
                  autoFocus
                  rows={5}
                  className="w-full resize-none border border-white/15 bg-white/[0.025] p-5 font-serif text-xl leading-8 text-[#F4EDDE] outline-none transition placeholder:text-[#5F5C56] focus:border-[#C6A66B]"
                />
              )}

              {currentQuestion.type === "single" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = currentValue === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateStringValue(option)}
                        className={`min-h-16 border px-5 text-left text-sm uppercase tracking-[0.18em] transition ${
                          isSelected
                            ? "border-[#C6A66B] bg-[#C6A66B]/10 text-[#E5C98E]"
                            : "border-white/10 bg-white/[0.025] text-[#AAA59B] hover:border-white/25 hover:text-[#F2EBDD]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "multi" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options?.map((option) => {
                    const selectedValues = Array.isArray(currentValue)
                      ? currentValue
                      : [];

                    const isSelected =
                      selectedValues.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiValue(option)}
                        className={`min-h-16 border px-5 text-left text-sm uppercase tracking-[0.18em] transition ${
                          isSelected
                            ? "border-[#C6A66B] bg-[#C6A66B]/10 text-[#E5C98E]"
                            : "border-white/10 bg-white/[0.025] text-[#AAA59B] hover:border-white/25 hover:text-[#F2EBDD]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {currentQuestion.optional && (
              <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-[#6F6B64]">
                Optional — you may continue without answering
              </p>
            )}

            {error && (
              <p className="mt-5 text-sm text-[#D8A58F]">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-7">
          <button
            type="button"
            onClick={handleBack}
            className="text-xs uppercase tracking-[0.24em] text-[#858078] transition hover:text-[#F2EBDD]"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="min-h-13 border border-[#C8A969] bg-[#C8A969] px-7 text-xs font-bold uppercase tracking-[0.24em] text-[#181914] transition hover:bg-[#E0C383]"
          >
            {isLastQuestion
              ? "Present to the Herald"
              : "Continue →"}
          </button>
        </div>
      </section>
    </main>
  );
}