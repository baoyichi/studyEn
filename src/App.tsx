import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
} from "@mui/material";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { TranslationWorkspace } from "./components/TranslationWorkspace";
import { getErrorCategoriesForLesson } from "./data/errorDrills";
import "./App.css";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}
type Task =
  "listening" | "translation" | "retelling" | "speaking" | "mistakeReview";
type Lesson = {
  number: number;
  title: string;
  chinese: string;
  english: string;
  focus: string;
};

const titles: Record<number, string> = {
  73: "The way to King Street",
  75: "Uncomfortable shoes",
  77: "Terrible toothache",
  79: "Carol's shopping list",
  81: "Roast beef and potatoes",
  83: "Going on holiday",
  85: "Paris in the spring",
  87: "A car crash",
  89: "For sale",
  91: "Poor Ian!",
  93: "Our new neighbour",
  95: "Tickets, please.",
  97: "A small blue case",
  99: "Ow!",
  101: "A card from Jimmy",
  103: "The French test",
  105: "Full of mistakes",
  107: "It's too small.",
  109: "A good idea",
  111: "The most expensive model",
  113: "Small change",
  115: "Knock, knock!",
  117: "Tommy's breakfast",
  119: "A true story",
  121: "The man in a hat",
  123: "A trip to Australia",
  125: "Tea for two",
  127: "A famous actress",
  129: "Seventy million",
  131: "Don't be so sure!",
  133: "Sensational news!",
  135: "The latest report",
  137: "A pleasant dream",
  139: "Is that you, John?",
  141: "Sally's first train ride",
  143: "A walk through the woods",
};
const practice = [
  [
    "上周她去城里办事，却在路口迷了路。",
    "Last week, she went into town and lost her way at a crossroads.",
    "过去式 · lost one’s way",
  ],
  [
    "这双鞋太紧了，我走不了多远。",
    "These shoes are too tight, so I can't walk very far.",
    "too + 形容词 + to",
  ],
  [
    "我牙疼得厉害，得尽快去看牙医。",
    "I have a terrible toothache and need to see the dentist soon.",
    "have + 名词",
  ],
  [
    "她先列了一张清单，然后去市场买东西。",
    "She made a list first and then went to the market.",
    "顺序表达",
  ],
  [
    "我们计划下个月去巴黎度假。",
    "We are planning to go to Paris for a holiday next month.",
    "plan to do",
  ],
  [
    "雨下得很大，所以司机没能及时停车。",
    "It was raining heavily, so the driver couldn't stop in time.",
    "过去进行时",
  ],
  [
    "这所房子要出售，但价格还没有确定。",
    "This house is for sale, but the price has not been decided yet.",
    "被动语态",
  ],
  [
    "他昨天买了一只蓝色的小箱子。",
    "He bought a small blue case yesterday.",
    "形容词顺序",
  ],
  [
    "吉米每个月都会给家人寄一张明信片。",
    "Jimmy sends his family a postcard every month.",
    "双宾语",
  ],
  [
    "我已经把作业检查了两遍。",
    "I have checked my homework twice already.",
    "现在完成时",
  ],
  [
    "这件外套比我想象中小一点。",
    "This coat is a little smaller than I expected.",
    "比较级",
  ],
  [
    "我们需要换些零钱坐公共汽车。",
    "We need some small change for the bus.",
    "不可数名词",
  ],
  [
    "他讲了一个听起来很难相信的故事。",
    "He told a story that was hard to believe.",
    "定语从句",
  ],
  [
    "她正在等那趟去澳大利亚的航班。",
    "She is waiting for the flight to Australia.",
    "wait for",
  ],
  [
    "火车穿过树林时，孩子们都很兴奋。",
    "The children were excited as the train went through the woods.",
    "as 引导时间状语",
  ],
];
const lessons: Lesson[] = Array.from({ length: 71 }, (_, i) => {
  const n = 73 + i;
  const [chinese, english, focus] = practice[i % practice.length];
  return {
    number: n,
    title: titles[n] ?? "Listening & practice",
    chinese,
    english,
    focus,
  };
});
const tasks: { id: Task; label: string; short: string; color: string }[] = [
  { id: "listening", label: "听力 + 跟读", short: "听", color: "#d76545" },
  { id: "translation", label: "汉译英", short: "译", color: "#e9a23b" },
  { id: "retelling", label: "口头复述", short: "述", color: "#5e928b" },
  { id: "speaking", label: "自由表达", short: "说", color: "#6a7ca8" },
];
const reviewTask: { id: Task; label: string; short: string; color: string } = {
  id: "mistakeReview",
  label: "错题复习",
  short: "错",
  color: "#8d6f9c",
};
const start = new Date(2026, 8, 1);
const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const schedule = (() => {
  const out: { date: Date; lesson?: Lesson; review: boolean }[] = [];
  let day = new Date(start),
    i = 0;
  while (i < lessons.length) {
    if (day.getDay() === 0) out.push({ date: new Date(day), review: true });
    else out.push({ date: new Date(day), lesson: lessons[i++], review: false });
    day.setDate(day.getDate() + 1);
  }
  if (day.getDay() === 0) out.push({ date: new Date(day), review: true });
  return out;
})();
const end = schedule.at(-1)!.date;
const theme = createTheme({
  palette: { primary: { main: "#d76545" }, background: { default: "#f7f3ee" } },
  typography: {
    fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  shape: { borderRadius: 16 },
});

export default function App() {
  const [number, setNumber] = useState(73),
    [tab, setTab] = useState<"listen" | "translate">("listen"),
    [drawer, setDrawer] = useState(false),
    [playing, setPlaying] = useState(false),
    [rate, setRate] = useState(1),
    [playerReady, setPlayerReady] = useState(false),
    [articleOpen, setArticleOpen] = useState(false),
    [articleLanguage, setArticleLanguage] = useState<"english" | "chinese">(
      "english",
    ),
    [savedLesson, setSavedLesson] = useState<number>();
  const [checks, setChecks] = useState<Record<string, Task[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem("nce1-checks") ?? "{}");
    } catch {
      return {};
    }
  });
  const [translationAnswers, setTranslationAnswers] = useState<
    Record<string, string>
  >(() => {
    try {
      return JSON.parse(
        localStorage.getItem("nce1-translation-answers") ?? "{}",
      );
    } catch {
      return {};
    }
  });
  const player = useRef<any>(null),
    ready = useRef(false),
    targetTime = useRef(2188),
    pendingPlay = useRef(false);
  const lesson = lessons.find((x) => x.number === number) ?? lessons[0];
  const currentLessonErrorCategories = getErrorCategoriesForLesson(
    lesson.number,
  );
  const scheduled = schedule.find((x) => x.lesson?.number === number);
  const articleImage =
    lesson.number % 2 === 1
      ? `/lesson-pages/l${lesson.number}-${articleLanguage === "english" ? "en" : "zh"}.jpg`
      : undefined;
  useEffect(() => {
    localStorage.setItem("nce1-checks", JSON.stringify(checks));
  }, [checks]);
  useEffect(() => {
    localStorage.setItem(
      "nce1-translation-answers",
      JSON.stringify(translationAnswers),
    );
  }, [translationAnswers]);
  useEffect(() => {
    let disposed = false;
    const init = () => {
      if (
        disposed ||
        player.current ||
        !document.getElementById("youtube-audio")
      )
        return;
      player.current = new window.YT.Player("youtube-audio", {
        videoId: "OkogLCluT4c",
        playerVars: { controls: 0, modestbranding: 1, rel: 0, start: 2188 },
        events: {
          onReady: (event: any) => {
            if (disposed) {
              event.target.destroy();
              return;
            }
            player.current = event.target;
            ready.current = true;
            setPlayerReady(true);
            event.target.seekTo(targetTime.current, true);
            if (pendingPlay.current) event.target.playVideo();
          },
          onStateChange: (event: any) =>
            setPlaying(event.data === window.YT.PlayerState.PLAYING),
        },
      });
    };
    if (window.YT?.Player) init();
    else {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.append(script);
      }
      window.onYouTubeIframeAPIReady = init;
    }
    return () => {
      disposed = true;
      ready.current = false;
      setPlayerReady(false);
      player.current?.destroy?.();
      player.current = null;
    };
  }, []);
  useEffect(() => {
    const next = 2188 + (lesson.number - 73) * 42.5;
    targetTime.current = next;
    if (ready.current) player.current.seekTo(next, true);
  }, [lesson.number]);
  const togglePlay = () => {
    if (!ready.current) {
      pendingPlay.current = true;
      return;
    }
    if (playing) player.current.pauseVideo();
    else player.current.playVideo();
  };
  const changeRate = (v: number) => {
    setRate(v);
    if (ready.current) player.current.setPlaybackRate(v);
  };
  const toggle = (date: string, task: Task) =>
    setChecks((all) => {
      const list = all[date] ?? [];
      return {
        ...all,
        [date]: list.includes(task)
          ? list.filter((x) => x !== task)
          : [...list, task],
      };
    });
  const updateAnswer = (drillId: string, value: string) =>
    setTranslationAnswers((all) => ({ ...all, [drillId]: value }));
  const saveAnswers = () => {
    localStorage.setItem(
      "nce1-translation-answers",
      JSON.stringify(translationAnswers),
    );
    setSavedLesson(lesson.number);
  };
  const complete = Object.values(checks).filter((x) => x.length === 4).length;
  const choose = (value: number) => {
    setArticleOpen(false);
    setNumber(value);
    document.querySelector("#learn")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="study-app">
        <div id="youtube-audio" className="youtube-audio" aria-hidden="true" />
        <header className="site-header">
          <a className="brand" href="#top">
            <span>nce</span>
            <b>1</b>
            <i>CONCEPT LAB</i>
          </a>
          <nav>
            <a href="#learn">今日学习</a>
            <a href="#calendar">打卡日历</a>
            <a href="#about">学习计划</a>
          </nav>
          <button className="lesson-picker" onClick={() => setDrawer(true)}>
            <MenuBookRoundedIcon /> Lesson {number}
            <ChevronLeftRoundedIcon />
          </button>
        </header>
        <section className="hero" id="top">
          <div>
            <p className="eyebrow">NEW CONCEPT ENGLISH · BOOK 1</p>
            <h1>
              把输入变成
              <br />
              <em>能脱口而出的语言</em>
            </h1>
            <p className="hero-copy">
              从 Lesson 73 开始，建立听得懂、译得准、说得出的英语节奏。
            </p>
          </div>
          <div className="progress-card">
            <div className="ring">
              <strong>{complete}</strong>
              <span>/ 83 天</span>
            </div>
            <div>
              <b>稳步前进</b>
              <p>
                每天完成 4 个小动作
                <br />
                周日只做轻量复习
              </p>
            </div>
          </div>
        </section>
        <section className="learning-section" id="learn">
          <div className="section-title">
            <p>01 · DAILY PRACTICE</p>
            <h2>今日学习</h2>
            <span>
              {scheduled
                ? `${scheduled.date.getMonth() + 1} 月 ${scheduled.date.getDate()} 日 · 星期${weekdays[scheduled.date.getDay()]}`
                : "自选课程"}
            </span>
          </div>
          <div className="tabs">
            <button
              className={tab === "listen" ? "active" : ""}
              onClick={() => setTab("listen")}
            >
              <HeadphonesRoundedIcon /> 听力 + 跟读
            </button>
            <button
              className={tab === "translate" ? "active" : ""}
              onClick={() => setTab("translate")}
            >
              <TranslateRoundedIcon /> 汉译英
            </button>
          </div>
          <article className="lesson-card">
            <div className="lesson-meta">
              <span>LESSON {lesson.number}</span>
              <span className="pill">{lesson.focus}</span>
            </div>
            <h3>{lesson.title}</h3>
            {tab === "listen" ? (
              <div className="listen-grid">
                <div className="audio-panel">
                  <div className="audio-info">
                    <span
                      className={playing ? "sound-bars playing" : "sound-bars"}
                    >
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {playerReady
                        ? "English original audio · New Concept English 1"
                        : "正在连接英文原文音频…"}
                    </span>
                  </div>
                  <div className="audio-controls">
                    <button className="play-button" onClick={togglePlay}>
                      {playing ? (
                        <PauseRoundedIcon />
                      ) : (
                        <PlayArrowRoundedIcon />
                      )}
                    </button>
                    <div className="wave">
                      {Array.from({ length: 12 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                    <span className="time">完整原文</span>
                  </div>
                  <div className="rate-control">
                    {[0.5, 0.8, 1, 1.25].map((v) => (
                      <button
                        key={v}
                        className={rate === v ? "chosen" : ""}
                        onClick={() => changeRate(v)}
                      >
                        {v}×
                      </button>
                    ))}
                  </div>
                  <p className="audio-tip">
                    仅播放英文朗读；请先完整听一遍，再打开右侧文章核对。
                  </p>
                </div>
                <aside className="article-panel">
                  <div className="article-heading">
                    <div>
                      <p className="panel-label">FULL ARTICLE</p>
                      <b>课文阅读</b>
                    </div>
                    <button
                      className="article-toggle"
                      onClick={() => setArticleOpen(!articleOpen)}
                    >
                      {articleOpen ? (
                        <VisibilityOffRoundedIcon />
                      ) : (
                        <VisibilityRoundedIcon />
                      )}
                      {articleOpen ? "隐藏文章" : "显示文章"}
                    </button>
                  </div>
                  {articleOpen && (
                    <div className="article-body">
                      <ToggleButtonGroup
                        className="article-language"
                        exclusive
                        value={articleLanguage}
                        aria-label="课文语言"
                        onChange={(_, value: "english" | "chinese" | null) => {
                          if (value) setArticleLanguage(value);
                        }}
                      >
                        <ToggleButton value="english">英语原文</ToggleButton>
                        <ToggleButton value="chinese">中文译文</ToggleButton>
                      </ToggleButtonGroup>
                      {articleImage ? (
                        <img
                          className="article-image"
                          src={articleImage}
                          alt={`Lesson ${lesson.number} ${articleLanguage === "english" ? "英语原文" : "中文译文"}`}
                        />
                      ) : (
                        <div className="article-empty">
                          <b>本课为配套练习</b>
                          <span>
                            单数课为课文页；双数课是语法与书面练习，请在相邻单数课中完成原文听读。
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {!articleOpen && (
                    <p className="article-closed">
                      默认隐藏课文。先凭听力抓住情节，再决定是否查看原文或译文。
                    </p>
                  )}
                </aside>
              </div>
            ) : (
              <TranslationWorkspace
                categories={currentLessonErrorCategories}
                answers={translationAnswers}
                saved={savedLesson === lesson.number}
                onAnswerChange={updateAnswer}
                onSave={saveAnswers}
              />
            )}
          </article>
        </section>
        <section className="calendar-section" id="calendar">
          <div className="section-title">
            <p>02 · CHECK IN</p>
            <h2>把小事做成习惯</h2>
            <span>
              2026.09.01 —{" "}
              {`${end.getFullYear()}.${String(end.getMonth() + 1).padStart(2, "0")}.${String(end.getDate()).padStart(2, "0")}`}
            </span>
          </div>
          <div className="task-legend">
            {tasks.map((task) => (
              <span key={task.id}>
                <i style={{ background: task.color }} />
                {task.label}
              </span>
            ))}
            <span className="review-legend">
              <i style={{ background: reviewTask.color }} />
              周日：{reviewTask.label}
            </span>
          </div>
          <div className="calendars">
            {[8, 9, 10].map((month) => (
              <Month
                key={month}
                month={month}
                checks={checks}
                onToggle={toggle}
                onChoose={choose}
              />
            ))}
          </div>
        </section>
        <section className="goal-banner" id="about">
          <p>PHASE ONE</p>
          <h2>
            熟悉话题能连续说 2–3 分钟；
            <br />
            普通课文裸听理解大部分。
          </h2>
          <span>71 个学习日 · 12 个复习日 · 每日 4 项小完成</span>
        </section>
        <footer>为持续而设计 · 每一次勾选都算数</footer>
        <SpeedDial
          ariaLabel="快速操作"
          className="study-dial"
          icon={<SpeedDialIcon />}
          FabProps={{ size: "medium" }}
        >
          <SpeedDialAction
            icon={<HeadphonesRoundedIcon />}
            title="开始听力"
            onClick={() => {
              setTab("listen");
              document
                .querySelector("#learn")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <SpeedDialAction
            icon={<TranslateRoundedIcon />}
            title="汉译英"
            onClick={() => {
              setTab("translate");
              document
                .querySelector("#learn")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <SpeedDialAction
            icon={<CalendarMonthRoundedIcon />}
            title="去打卡"
            onClick={() =>
              document
                .querySelector("#calendar")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </SpeedDial>
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <Box className="lesson-drawer">
            <p className="eyebrow">COURSE INDEX</p>
            <h2>选择课程</h2>
            <div>
              {lessons.map((item) => (
                <button
                  key={item.number}
                  className={item.number === lesson.number ? "current" : ""}
                  onClick={() => {
                    setArticleOpen(false);
                    setNumber(item.number);
                    setDrawer(false);
                  }}
                >
                  <span>{item.number}</span>
                  <b>{item.title}</b>
                </button>
              ))}
            </div>
          </Box>
        </Drawer>
      </main>
    </ThemeProvider>
  );
}
function Month({
  month,
  checks,
  onToggle,
  onChoose,
}: {
  month: number;
  checks: Record<string, Task[]>;
  onToggle: (date: string, task: Task) => void;
  onChoose: (number: number) => void;
}) {
  const first = new Date(2026, month, 1),
    days = new Date(2026, month + 1, 0).getDate(),
    scheduled = new Map(schedule.map((x) => [key(x.date), x]));
  return (
    <article className="month-card">
      <header>
        <h3>
          2026 <b>{month + 1}月</b>
        </h3>
        <span>{month === 8 ? "开始" : month === 10 ? "收尾" : "坚持"}</span>
      </header>
      <div className="weekdays">
        {weekdays.map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: first.getDay() }, (_, i) => (
          <div className="calendar-blank" key={`b${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const date = new Date(2026, month, i + 1),
            item = scheduled.get(key(date)),
            done = checks[key(date)] ?? [],
            dayTasks = item?.review ? [reviewTask] : tasks;
          return (
            <div
              className={
                "day-cell " + (!item ? "outside" : item.review ? "review" : "")
              }
              key={i}
            >
              <span className="day-num">{i + 1}</span>
              {item?.lesson && (
                <button
                  className="lesson-chip"
                  onClick={() => onChoose(item.lesson!.number)}
                >
                  L{item.lesson.number}
                </button>
              )}
              {item?.review && <span className="review-label">复习日</span>}
              {item && (
                <div className="task-dots">
                  {dayTasks.map((task) => (
                    <button
                      title={task.label}
                      onClick={() => onToggle(key(date), task.id)}
                      className={done.includes(task.id) ? "done" : ""}
                      style={{ "--task-color": task.color } as CSSProperties}
                      key={task.id}
                    >
                      {done.includes(task.id) ? (
                        <CheckRoundedIcon />
                      ) : (
                        task.short
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}
