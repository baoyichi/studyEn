import { useState } from "react";
import Button from "@mui/material/Button";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import type { ErrorCategory } from "../data/errorDrills";

type TranslationWorkspaceProps = {
  lessonNumber: number;
  categories: ErrorCategory[];
  answers: Record<string, string>;
  saved: boolean;
  onAnswerChange: (drillId: string, value: string) => void;
  onSave: () => void;
};

type Detail = "focus" | "original";

/**
 * Each category targets one recurring output problem. Details stay hidden so
 * the learner translates first instead of reading the answer or grammar cue.
 */
export function TranslationWorkspace({
  lessonNumber,
  categories,
  answers,
  saved,
  onAnswerChange,
  onSave,
}: TranslationWorkspaceProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id ?? "",
  );
  const [visibleDetails, setVisibleDetails] = useState<Record<string, boolean>>(
    {},
  );
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];
  const noteId = `lesson-${lessonNumber}-error-notes`;

  function toggleDetail(drillId: string, detail: Detail) {
    const detailKey = `${drillId}-${detail}`;
    setVisibleDetails((current) => ({
      ...current,
      [detailKey]: !current[detailKey],
    }));
  }

  function isDetailVisible(drillId: string, detail: Detail) {
    return Boolean(visibleDetails[`${drillId}-${detail}`]);
  }

  return (
    <div className="translate-panel translation-workspace">
      <div className="translation-workspace__header">
        <div>
          <p className="panel-label">CHINESE TO ENGLISH · ERROR-LED PRACTICE</p>
          <h4>围绕你的高频错因做专项练习</h4>
        </div>
        <Button
          className={saved ? "saved" : "save-answers"}
          variant="outlined"
          size="small"
          onClick={onSave}
          startIcon={saved ? <CheckRoundedIcon /> : undefined}
        >
          {saved ? (
            "已保存"
          ) : (
            "保存专项练习"
          )}
        </Button>
      </div>

      <p className="translation-intro">
        只练当前 Lesson 中与你高频错因对应的原句。先完成翻译，需要时再查看提示或原文。
      </p>

      {selectedCategory ? (
        <>
          <div className="error-category-tabs" aria-label="错题类别">
            {categories.map((category) => (
              <Button
                key={category.id}
                className={
                  category.id === selectedCategory.id ? "selected" : ""
                }
                variant="outlined"
                size="small"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.title}
              </Button>
            ))}
          </div>

          <div className="category-summary">
            <b>{selectedCategory.title}</b>
            <span>{selectedCategory.description}</span>
          </div>

          <div className="translation-drills">
            {selectedCategory.drills.map((drill, index) => (
              <div className="translation-drill" key={drill.id}>
                <span className="drill-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="drill-copy">
                  <b>{drill.chinese}</b>
                  <span className="drill-actions">
                    <RevealButton
                      visible={isDetailVisible(drill.id, "focus")}
                      label="句式重点"
                      onClick={() => toggleDetail(drill.id, "focus")}
                    />
                    <RevealButton
                      visible={isDetailVisible(drill.id, "original")}
                      label="英文原文"
                      onClick={() => toggleDetail(drill.id, "original")}
                    />
                  </span>
                  {isDetailVisible(drill.id, "focus") && (
                    <small>{drill.focus}</small>
                  )}
                  {isDetailVisible(drill.id, "original") && (
                    <em>{drill.english}</em>
                  )}
                </span>
                <textarea
                  value={answers[drill.id] ?? ""}
                  onChange={(event) =>
                    onAnswerChange(drill.id, event.target.value)
                  }
                  placeholder="在这里输入你的英文表达…"
                  aria-label={`第 ${index + 1} 句英文输入`}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="translation-empty">
          <b>本课暂无错因专项</b>
          <span>
            当前 Lesson 的原文中没有筛出与你高频错因对应的句子；不从其他课补题。
          </span>
        </div>
      )}

      <section className="error-notes" aria-labelledby="error-notes-title">
        <div>
          <p className="panel-label">ERROR SENTENCE NOTEBOOK</p>
          <h5 id="error-notes-title">错句拓展练习</h5>
          <p>记录错句，再写近似变式、场景变式和自由造句。</p>
        </div>
        <textarea
          value={answers[noteId] ?? ""}
          onChange={(event) => onAnswerChange(noteId, event.target.value)}
          placeholder={`错句：\n近似变式：\n场景变式：\n自由造句：`}
          aria-label={`Lesson ${lessonNumber} 错句拓展练习`}
        />
      </section>
    </div>
  );
}

function RevealButton({
  visible,
  label,
  onClick,
}: {
  visible: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      className="tip-toggle"
      variant="text"
      size="small"
      onClick={onClick}
      startIcon={
        visible ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />
      }
    >
      {visible ? `隐藏${label}` : label}
    </Button>
  );
}
