import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { Question, TestAttempt } from '../types';
import {
  Check,
  X,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Award
} from 'lucide-react';

export const FreeEnglishTestPage: React.FC = () => {
  const { settings, showToast } = useApp();
  const testSettings = dbService.getTestSettings();
  const allQuestions = dbService.getQuestions();

  // Test state machine: 'intro' | 'testing' | 'review' | 'lead_gate' | 'result'
  const [stage, setStage] = useState<'intro' | 'testing' | 'review' | 'lead_gate' | 'result'>('intro');

  // Selected random subset of questions
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  // Timer
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(testSettings.timeLimitMinutes * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Candidate Lead info
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateError, setCandidateError] = useState('');

  // Finished Attempt Record
  const [finalAttempt, setFinalAttempt] = useState<TestAttempt | null>(null);

  // Initialize random test
  const startAssessment = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const count = Math.min(testSettings.questionsPerTest, allQuestions.length);
    const chosen = shuffled.slice(0, count);

    setTestQuestions(chosen);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeLeftSeconds(testSettings.timeLimitMinutes * 60);
    setTimerActive(testSettings.enableTimer);
    setStage('testing');
  };

  // Timer countdown
  useEffect(() => {
    if (!timerActive || stage !== 'testing') return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, stage]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleFinishTest = () => {
    setTimerActive(false);
    if (testSettings.requireLeadBeforeResult) {
      setStage('lead_gate');
    } else {
      calculateAndShowResult('Anonymous Learner', '');
    }
  };

  const calculateAndShowResult = (name: string, phone: string) => {
    let score = 0;
    const breakdown: Record<string, { correct: number; total: number }> = {};
    const recordedAnswers = testQuestions.map((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctOptionIndex;
      if (isCorrect) score += 1;

      if (!breakdown[q.category]) {
        breakdown[q.category] = { correct: 0, total: 0 };
      }
      breakdown[q.category].total += 1;
      if (isCorrect) {
        breakdown[q.category].correct += 1;
      }

      return {
        questionId: q.id,
        selectedIndex: selected !== undefined ? selected : -1,
        isCorrect
      };
    });

    const percentage = Math.round((score / testQuestions.length) * 100);

    let level: 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced' =
      'Beginner';
    if (percentage >= 90) level = 'Advanced';
    else if (percentage >= 75) level = 'Upper-Intermediate';
    else if (percentage >= 60) level = 'Intermediate';
    else if (percentage >= 40) level = 'Elementary';
    else level = 'Beginner';

    let recommendedCourse = 'Spoken English & Communication Mastery (Foundation Track)';
    if (percentage >= 75) {
      recommendedCourse = 'Job Interview Training Bootcamp & Advanced Extempore Circles';
    } else if (percentage >= 50) {
      recommendedCourse = 'Spoken English & Communication Mastery (Regular Batch)';
    }

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      candidateName: name,
      candidatePhone: phone,
      score,
      totalQuestions: testQuestions.length,
      percentage,
      levelAssigned: level,
      categoryBreakdown: breakdown,
      recommendedCourse,
      answers: recordedAnswers
    };

    dbService.saveTestAttempt(attempt);
    setFinalAttempt(attempt);
    setStage('result');
    showToast('Grammar assessment calculated! Review your breakdown below.', 'success');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setCandidateError('Please enter your full name.');
      return;
    }
    const cleanPhone = candidatePhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setCandidateError('Please enter a valid 10-digit mobile number.');
      return;
    }
    calculateAndShowResult(candidateName.trim(), candidatePhone.trim());
  };

  // Format timer MM:SS
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentQ = testQuestions[currentIndex];
  const progressPercent =
    testQuestions.length > 0 ? Math.round(((currentIndex + 1) / testQuestions.length) * 100) : 0;

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* INTRO SCREEN */}
        {stage === 'intro' && (
          <div className="awesomic-card p-8 sm:p-12 text-center space-y-6 bg-white">
            <div className="space-y-2">
              <span className="awesomic-badge">
                Diagnostic Assessment
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-tight">
                AIESD Spoken &amp; Grammar English Test
              </h1>
              <p className="text-[15px] text-[#71717a] max-w-xl mx-auto leading-relaxed">
                Assess your functional English proficiency across Tenses, Articles, Prepositions, Modals, and Subject-Verb Agreement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left pt-2">
              <div className="p-4 bg-[#fafafa] rounded-[18px] border border-[#e4e4e7]">
                <p className="text-[11px] text-[#71717a] font-semibold uppercase">Questions</p>
                <p className="text-base font-bold text-[#18181b] mt-0.5">
                  {testSettings.questionsPerTest} Questions
                </p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                  Randomized from item pool
                </p>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-[18px] border border-[#e4e4e7]">
                <p className="text-[11px] text-[#71717a] font-semibold uppercase">Time Limit</p>
                <p className="text-base font-bold text-[#18181b] mt-0.5">
                  {testSettings.enableTimer ? `${testSettings.timeLimitMinutes} Minutes` : 'Untimed'}
                </p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Paced timer</p>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-[18px] border border-[#e4e4e7]">
                <p className="text-[11px] text-[#71717a] font-semibold uppercase">Instant Result</p>
                <p className="text-base font-bold text-[#18181b] mt-0.5">Score &amp; Level</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Detailed explanations</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={startAssessment}
                className="awesomic-btn-dark py-3 px-6 text-[14px]"
              >
                <span>Start Assessment Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE TESTING SCREEN (1 Question per screen) */}
        {stage === 'testing' && currentQ && (
          <div className="awesomic-card p-6 sm:p-10 space-y-6 bg-white">
            {/* Header / Progress & Timer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4e4e7] pb-4">
              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase">
                  Question {currentIndex + 1} of {testQuestions.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-[#f4f4f5] text-[#18181b] font-medium px-2.5 py-0.5 rounded-full border border-[#e4e4e7] capitalize">
                    {currentQ.category}
                  </span>
                  <span className="text-[11px] text-[#71717a]">
                    Difficulty: {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {testSettings.enableTimer && (
                <div className="flex items-center gap-2 bg-[#f4f4f5] px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#18181b] border border-[#e4e4e7]">
                  <Clock className="w-3.5 h-3.5 text-[#18181b]" />
                  <span>Time Left: {timeFormatted}</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#f4f4f5] h-1.5 rounded-full overflow-hidden border border-[#e4e4e7]">
              <div
                className="bg-[#09090b] h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#18181b] leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    className={`w-full p-4 rounded-[18px] text-left text-sm font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#09090b] bg-[#f4f4f5] text-[#18181b] font-semibold'
                        : 'border-[#e4e4e7] hover:border-[#18181b]/30 bg-white text-[#3f3f46]'
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium ${
                        isSelected
                          ? 'border-[#09090b] bg-[#09090b] text-white'
                          : 'border-[#e4e4e7] text-[#71717a]'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#e4e4e7] flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="px-3 py-1.5 text-xs font-medium text-[#71717a] disabled:opacity-30 hover:text-[#18181b]"
              >
                &larr; Previous Question
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage('review')}
                  className="px-3 py-1.5 text-xs font-medium text-[#18181b] hover:underline"
                >
                  Review Answers
                </button>

                {currentIndex < testQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="awesomic-btn-dark py-2 px-4 text-xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    className="awesomic-btn-dark py-2 px-5 text-xs"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* REVIEW SCREEN */}
        {stage === 'review' && (
          <div className="awesomic-card p-6 sm:p-10 space-y-6 bg-white">
            <div>
              <h2 className="text-xl font-bold text-[#18181b] tracking-tight">Review Your Answers</h2>
              <p className="text-xs text-[#71717a] mt-1">
                You can return to any question before final calculation.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {testQuestions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setStage('testing');
                    }}
                    className={`p-3 rounded-[14px] border text-xs font-medium flex flex-col items-center gap-0.5 touch-target justify-center ${
                      isAnswered
                        ? 'border-[#18181b] bg-[#f4f4f5] text-[#18181b] font-semibold'
                        : 'border-[#e4e4e7] text-[#71717a] bg-white hover:border-[#18181b]/30'
                    }`}
                  >
                    <span>Q{idx + 1}</span>
                    <span className="text-[10px] text-[#71717a]">
                      {isAnswered ? 'Answered' : 'Pending'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => setStage('testing')}
                className="px-4 py-2.5 text-xs font-medium text-[#71717a] hover:text-[#18181b] text-center"
              >
                &larr; Return to Current Question
              </button>
              <button
                onClick={handleFinishTest}
                className="awesomic-btn-dark py-2.5 px-6 text-xs w-full sm:w-auto text-center justify-center"
              >
                Submit &amp; View Result
              </button>
            </div>
          </div>
        )}

        {/* LEAD GATE SCREEN */}
        {stage === 'lead_gate' && (
          <div className="awesomic-card p-6 sm:p-10 max-w-md mx-auto space-y-5 text-center bg-white">
            <div className="space-y-1">
              <span className="awesomic-badge">
                Result Ready
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight">
                Your Scorecard is Generated
              </h2>
              <p className="text-xs text-[#71717a]">
                Provide your name and WhatsApp number to unlock your proficiency report.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-left pt-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#18181b]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Suman Roy"
                  className="awesomic-input text-sm"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#18181b]">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  placeholder="e.g. 9832109876"
                  className="awesomic-input text-sm"
                  autoComplete="tel"
                />
              </div>

              {candidateError && (
                <p className="text-xs text-red-600 font-medium">{candidateError}</p>
              )}

              <button
                type="submit"
                className="awesomic-btn-dark w-full justify-center py-3 text-sm mt-2"
              >
                View Grammar Scorecard
              </button>
            </form>
          </div>
        )}

        {/* FINAL RESULT SCREEN */}
        {stage === 'result' && finalAttempt && (
          <div className="space-y-6">
            {/* Scorecard Hero */}
            <div className="awesomic-card p-8 sm:p-10 text-center space-y-6 bg-white">
              <div className="space-y-1">
                <span className="awesomic-badge">
                  Assessment Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                  Proficiency Scorecard for {finalAttempt.candidateName}
                </h2>
                <p className="text-xs text-[#71717a]">Attempt recorded on {finalAttempt.date}</p>
              </div>

              {/* Big Score Dial */}
              <div className="max-w-xs mx-auto p-6 bg-[#fafafa] rounded-[24px] border border-[#e4e4e7] text-center space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
                  Overall Score
                </p>
                <div className="text-4xl font-bold text-[#18181b]">
                  {finalAttempt.score}
                  <span className="text-xl text-[#71717a] font-normal">
                    /{finalAttempt.totalQuestions}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#3f3f46]">{finalAttempt.percentage}% Accuracy</p>
                <div className="pt-1">
                  <span className="inline-block px-3.5 py-0.5 bg-[#09090b] text-white text-xs font-semibold rounded-full uppercase">
                    Level: {finalAttempt.levelAssigned}
                  </span>
                </div>
              </div>

              {/* Recommended Program Banner */}
              <div className="p-6 bg-[#fafafa] rounded-[24px] border border-[#e4e4e7] text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase text-[#18181b]">
                    Recommended Course Based on Your Score:
                  </p>
                  <p className="text-base font-bold text-[#18181b] mt-0.5">
                    {finalAttempt.recommendedCourse}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/enroll"
                    className="awesomic-btn-dark py-2 px-4 text-xs"
                  >
                    Enroll in Level
                  </Link>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(
                      /[^0-9]/g,
                      ''
                    )}?text=${encodeURIComponent(
                      `Hello AIESD, I took the Free English Test and scored ${finalAttempt.score}/${finalAttempt.totalQuestions} (${finalAttempt.levelAssigned}). Please advise on my batch placement.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5] rounded-full transition-colors"
                    aria-label="Share score on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#18181b]" />
                  </a>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="text-left space-y-3 pt-3 border-t border-[#e4e4e7]">
                <h3 className="text-sm font-bold text-[#18181b] tracking-tight">
                  Category-Wise Performance Analysis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(finalAttempt.categoryBreakdown).map(([cat, stat]) => {
                    const catPercent = Math.round((stat.correct / stat.total) * 100);
                    return (
                      <div
                        key={cat}
                        className="p-3.5 bg-[#fafafa] rounded-[16px] border border-[#e4e4e7] space-y-1.5"
                      >
                        <div className="flex justify-between text-xs font-semibold text-[#18181b] capitalize">
                          <span>{cat}</span>
                          <span>
                            {stat.correct} / {stat.total} ({catPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#e4e4e7] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#09090b]"
                            style={{ width: `${catPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Answer Explanations Review */}
            <div className="awesomic-card p-6 sm:p-10 space-y-5 bg-white">
              <div>
                <h3 className="text-lg font-bold text-[#18181b] tracking-tight">
                  Detailed Answer Explanations
                </h3>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Learn the grammatical reasoning behind each correct option.
                </p>
              </div>

              <div className="space-y-4">
                {testQuestions.map((q, idx) => {
                  const candidateAnswer = selectedAnswers[q.id];
                  const isCorrect = candidateAnswer === q.correctOptionIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-[20px] border border-[#e4e4e7] bg-[#fafafa] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#71717a]">Question {idx + 1}</span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Correct
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5" /> Incorrect
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#18181b]">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-3 rounded-[14px] bg-white border border-[#e4e4e7]">
                          <span className="text-[#71717a]">Your Selection: </span>
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {candidateAnswer !== undefined
                              ? q.options[candidateAnswer]
                              : 'No answer selected'}
                          </strong>
                        </div>
                        <div className="p-3 rounded-[14px] bg-white border border-[#e4e4e7]">
                          <span className="text-[#71717a]">Correct Answer: </span>
                          <strong className="text-[#18181b]">
                            {q.options[q.correctOptionIndex]}
                          </strong>
                        </div>
                      </div>

                      <div className="text-xs text-[#71717a] bg-white p-3 rounded-[14px] border border-[#e4e4e7] leading-relaxed">
                        <strong className="text-[#18181b]">Grammar Rule: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={startAssessment}
                  className="awesomic-btn-dark py-2.5 px-5 text-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Take Another Practice Assessment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
