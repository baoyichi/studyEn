import { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

export type TranslationDrill = {
  prompt: string;
  tip: string;
};

type TranslationWorkspaceProps = {
  lessonNumber: number;
  drills: TranslationDrill[];
  answers: string[];
  saved: boolean;
  onAnswerChange: (index: number, value: string) => void;
  onSave: () => void;
};

/** Keeps writing practice focused: reveal a grammar hint only when needed. */
export function TranslationWorkspace({
  lessonNumber,
  drills,
  answers,
  saved,
  onAnswerChange,
  onSave,
}: TranslationWorkspaceProps) {
  const [visibleTips, setVisibleTips] = useState<Record<string, boolean>>({});

  function toggleTip(index: number) {
    const tipKey = `${lessonNumber}-${index}`;
    setVisibleTips((current) => ({ ...current, [tipKey]: !current[tipKey] }));
  }

  return (
    <div className="translate-panel translation-workspace">
      <div className="translation-workspace__header">
        <div>
          <p className="panel-label">CHINESE TO ENGLISH · CORE PATTERNS</p>
          <h4>用本课句式，把中文写成英文</h4>
        </div>
        <button className={saved ? "saved" : "save-answers"} onClick={onSave}>
          {saved ? (
            <>
              <CheckRoundedIcon />
              已保存
            </>
          ) : (
            "保存本课练习"
          )}
        </button>
      </div>

      <p className="translation-intro">
        先自己写，再通过课文阅读核对表达。答案会保存在此课，回看时自动显示。
      </p>

      <div className="translation-drills">
        {drills.map((drill, index) => {
          const tipKey = `${lessonNumber}-${index}`;
          const isTipVisible = Boolean(visibleTips[tipKey]);

          return (
            <div className="translation-drill" key={tipKey}>
              <span className="drill-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="drill-copy">
                <b>{drill.prompt}</b>
                <button
                  className="tip-toggle"
                  type="button"
                  onClick={() => toggleTip(index)}
                  aria-label={isTipVisible ? "隐藏句式重点" : "显示句式重点"}
                  title={isTipVisible ? "隐藏句式重点" : "显示句式重点"}
                >
                  {isTipVisible ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )}
                  <span>{isTipVisible ? drill.tip : "显示句式重点"}</span>
                </button>
              </span>
              <textarea
                value={answers[index] ?? ""}
                onChange={(event) => onAnswerChange(index, event.target.value)}
                placeholder="在这里输入你的英文表达…"
                aria-label={`第 ${index + 1} 句英文输入`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
