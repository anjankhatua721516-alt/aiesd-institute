import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  Trash2,
  Plus,
  Save,
  Users,
  Eye
} from 'lucide-react';
import { Question, TestSettings } from '../../types';

export const FreeTestTab: React.FC = () => {
  const { showToast } = useApp();
  const [testSettings, setTestSettings] = useState<TestSettings>(dbService.getTestSettings());
  const [questions, setQuestions] = useState<Question[]>(dbService.getQuestions());
  const [attempts, setAttempts] = useState(dbService.getTestAttempts());
  const [activeSubTab, setActiveSubTab] = useState<'settings' | 'questions' | 'leads'>('leads');

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveTestSettings(testSettings);
    showToast('Diagnostic test settings updated.', 'success');
  };

  const handleCreateQuestion = () => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      category: 'tenses',
      difficulty: 'Intermediate',
      question: 'She _____ English for two years before moving abroad.',
      options: ['had been studying', 'has studied', 'was studied', 'study'],
      correctOptionIndex: 0,
      explanation:
        'Past perfect continuous is used to describe an ongoing action in the past completed before another past event.'
    };
    setEditingQuestion(newQ);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    dbService.saveQuestion(editingQuestion);
    setQuestions(dbService.getQuestions());
    setEditingQuestion(null);
    showToast('Question saved in question bank.', 'success');
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Delete this question from question bank?')) {
      dbService.deleteQuestion(id);
      setQuestions(dbService.getQuestions());
      showToast('Question deleted.', 'info');
      if (editingQuestion?.id === id) setEditingQuestion(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Assessment Engine
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Free Diagnostic English Test Manager
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Configure time limits, lead-gate requirements, question bank MCQs, and review captured assessment candidate leads.
          </p>
        </div>

        {/* Sub-tab navigation: Awesomic pill toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('leads')}
            className={`awesomic-pill-toggle ${activeSubTab === 'leads' ? 'active' : ''}`}
          >
            Candidate Leads ({attempts.length})
          </button>
          <button
            onClick={() => setActiveSubTab('questions')}
            className={`awesomic-pill-toggle ${activeSubTab === 'questions' ? 'active' : ''}`}
          >
            Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`awesomic-pill-toggle ${activeSubTab === 'settings' ? 'active' : ''}`}
          >
            Test Settings
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LEADS CAPTURED */}
      {activeSubTab === 'leads' && (
        <div className="bg-white rounded-[24px] border border-[#e4e4e7] overflow-hidden">
          <div className="p-4 border-b border-[#e4e4e7] flex items-center justify-between bg-[#fafafa]">
            <h3 className="text-sm font-bold text-[#18181b]">
              Assessed Candidates ({attempts.length})
            </h3>
            <span className="text-xs text-[#71717a]">
              Leads captured before viewing grammar scorecards
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] border-b border-[#e4e4e7] font-bold text-[#18181b]">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Assigned Level</th>
                  <th className="p-4">Recommended Course</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e4e7]">
                {attempts.length > 0 ? (
                  attempts.map((att) => (
                    <tr key={att.id} className="hover:bg-[#fafafa]">
                      <td className="p-4 font-bold text-[#18181b]">{att.candidateName}</td>
                      <td className="p-4 font-mono text-[#71717a]">{att.candidatePhone}</td>
                      <td className="p-4 text-[#71717a]">{att.date}</td>
                      <td className="p-4 font-bold text-[#18181b]">
                        {att.score}/{att.totalQuestions} ({att.percentage}%)
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7]">
                          {att.levelAssigned}
                        </span>
                      </td>
                      <td className="p-4 text-[#18181b] font-medium max-w-xs truncate">
                        {att.recommendedCourse}
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`https://wa.me/${att.candidatePhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${att.candidateName}, this is from AIESD Admissions. We noticed your score of ${att.score}/${att.totalQuestions} in our Diagnostic Test. Would you like to schedule a trial spoken English session?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="awesomic-btn-dark py-1 px-3 text-[11px] inline-block"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#71717a]">
                      No test attempts yet. Test submissions will populate here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: QUESTION BANK */}
      {activeSubTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wide">
                {questions.length} Questions Loaded
              </span>
              <button
                onClick={handleCreateQuestion}
                className="awesomic-btn-dark py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, idx) => (
              <div
                key={q.id}
                onClick={() => setEditingQuestion({ ...q })}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white space-y-2 ${
                  editingQuestion?.id === q.id
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-semibold">
                    <span className="bg-[#f4f4f5] text-[#18181b] px-2 py-0.5 rounded-full border border-[#e4e4e7]">
                      #{idx + 1}
                    </span>
                    <span className="bg-[#fafafa] text-[#18181b] px-2 py-0.5 rounded-full border border-[#e4e4e7] capitalize">
                      {q.category}
                    </span>
                    <span className="text-[#71717a]">{q.difficulty}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuestion(q.id);
                    }}
                    className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-bold text-[#18181b] leading-snug">{q.question}</p>
                <p className="text-[11px] text-[#18181b] font-medium">
                  Ans: <span className="font-semibold text-[#09090b]">{q.options[q.correctOptionIndex]}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Question Editor */}
          <div className="lg:col-span-6 bg-white rounded-[24px] border border-[#e4e4e7] p-6">
            {editingQuestion ? (
              <form onSubmit={handleSaveQuestion} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                  <h3 className="text-sm font-bold text-[#18181b]">Edit Question</h3>
                  <button
                    type="submit"
                    className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Question Text</label>
                  <textarea
                    rows={2}
                    required
                    value={editingQuestion.question}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, question: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Category</label>
                    <select
                      value={editingQuestion.category}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          category: e.target.value as any
                        })
                      }
                      className="awesomic-input text-xs bg-white"
                    >
                      <option value="tenses">Tenses</option>
                      <option value="articles">Articles</option>
                      <option value="prepositions">Prepositions</option>
                      <option value="subject-verb agreement">Subject-Verb Agreement</option>
                      <option value="modals">Modals</option>
                      <option value="conditionals">Conditionals</option>
                      <option value="vocabulary">Vocabulary</option>
                      <option value="sentence correction">Sentence Correction</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Difficulty</label>
                    <select
                      value={editingQuestion.difficulty}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          difficulty: e.target.value as any
                        })
                      }
                      className="awesomic-input text-xs bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    4 Multiple Choice Options
                  </label>
                  {editingQuestion.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={editingQuestion.correctOptionIndex === oIdx}
                        onChange={() =>
                          setEditingQuestion({ ...editingQuestion, correctOptionIndex: oIdx })
                        }
                        className="w-4 h-4 text-[#18181b] border-[#e4e4e7] focus:ring-0"
                        title="Mark as Correct Option"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...editingQuestion.options];
                          updated[oIdx] = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: updated });
                        }}
                        className="flex-1 awesomic-input text-xs"
                      />
                    </div>
                  ))}
                  <p className="text-[10px] text-[#71717a]">
                    Select the radio button next to the correct answer.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Grammar Rule / Reason</label>
                  <textarea
                    rows={2}
                    value={editingQuestion.explanation}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, explanation: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-[#71717a] space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-[#e4e4e7]" />
                <p className="text-xs">Select a question on the left to edit or add a new MCQ.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TEST SETTINGS */}
      {activeSubTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-6 max-w-2xl"
        >
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#18181b]">Assessment Parameters</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Questions per Test</label>
                <input
                  type="number"
                  min={5}
                  max={questions.length}
                  value={testSettings.questionsPerTest}
                  onChange={(e) =>
                    setTestSettings({ ...testSettings, questionsPerTest: Number(e.target.value) })
                  }
                  className="awesomic-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">
                  Time Limit (Minutes)
                </label>
                <input
                  type="number"
                  min={2}
                  max={60}
                  value={testSettings.timeLimitMinutes}
                  onChange={(e) =>
                    setTestSettings({
                      ...testSettings,
                      timeLimitMinutes: Number(e.target.value)
                    })
                  }
                  className="awesomic-input text-xs"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={testSettings.enableTimer}
                  onChange={(e) =>
                    setTestSettings({ ...testSettings, enableTimer: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#18181b] border-[#e4e4e7] focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#18181b]">
                  Enable Countdown Timer during testing
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={testSettings.requireLeadBeforeResult}
                  onChange={(e) =>
                    setTestSettings({
                      ...testSettings,
                      requireLeadBeforeResult: e.target.checked
                    })
                  }
                  className="w-4 h-4 rounded text-[#18181b] border-[#e4e4e7] focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#18181b]">
                  Require Candidate Name &amp; Phone (Lead Gate) before displaying score
                </span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="awesomic-btn-dark py-2.5 px-5 text-xs"
            >
              Save Test Parameters
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
