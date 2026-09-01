export type ErrorDrill = {
  id: string;
  chinese: string;
  english: string;
  focus: string;
};

export type ErrorCategory = {
  id: string;
  title: string;
  description: string;
  drills: ErrorDrill[];
};

// Sentences are transcribed from the supplied NCE 1 PDF, Lessons 73–143.
export const errorCategories: ErrorCategory[] = [
  {
    id: "tense",
    title: "时态选择",
    description: "重点练习过去、现在完成与过去完成等容易在语境中混淆的形式。",
    drills: [
      {
        id: "tense-1",
        chinese: "上星期米尔斯夫人去了伦敦。",
        english: "Last week Mrs. Mills went to London.",
        focus: "明确过去时间：一般过去时 went。",
      },
      {
        id: "tense-2",
        chinese: "我刚刚收到我弟弟蒂姆的一封信。",
        english: "I have just received a letter from my brother, Tim.",
        focus: "just 常与现在完成时连用。",
      },
      {
        id: "tense-3",
        chinese: "他已经在澳大利亚待了六个月。",
        english: "He has been in Australia for six months.",
        focus: "for + 时间段：has been。",
      },
      {
        id: "tense-4",
        chinese: "他已经游览过澳大利亚不少地方了。",
        english:
          "He has already visited a great number of different places in Australia.",
        focus: "already 常用于现在完成时。",
      },
      {
        id: "tense-5",
        chinese: "她以前从未乘过火车。",
        english: "She had never travelled on a train before.",
        focus: "过去某时之前的经历：过去完成时 had never travelled。",
      },
    ],
  },
  {
    id: "sentence-pattern",
    title: "句子骨架",
    description: "练习完整主谓宾、there be、定语从句和条件句的基本搭法。",
    drills: [
      {
        id: "pattern-1",
        chinese: "那就是医生找到我家的方法。",
        english: "That was how the doctor found his way to my house.",
        focus: "That was how + 完整句子。",
      },
      {
        id: "pattern-2",
        chinese: "有一辆汽车停在门前。",
        english: "There is a car parked in front of the door.",
        focus: "there be 句型先确定“有”。",
      },
      {
        id: "pattern-3",
        chinese: "这是我们乘坐过的那艘船。",
        english: "That is the ship we travelled on.",
        focus: "省略关系代词的定语从句；介词留在句末。",
      },
      {
        id: "pattern-4",
        chinese: "我找到了一个上面写着字的牌子。",
        english:
          "I found a sign which said: “Anyone who leaves litter in these woods will be prosecuted!”",
        focus: "which said 引出修饰 sign 的定语从句。",
      },
      {
        id: "pattern-5",
        chinese: "如果你赢了很多钱，你会做什么？",
        english: "What will you do if you win a lot of money?",
        focus: "条件从句主将从现：if you win。",
      },
    ],
  },
  {
    id: "chunks",
    title: "介词 / 词块",
    description: "把高频搭配当整体记忆，减少逐词翻译。",
    drills: [
      {
        id: "chunk-1",
        chinese: "她对伦敦不太熟悉，因此迷了路。",
        english: "She does not know London very well, and she lost her way.",
        focus: "know a place well；lose one’s way。",
      },
      {
        id: "chunk-2",
        chinese: "请问您能告诉我去国王街怎么走吗？",
        english: "Can you tell me the way to King Street, please?",
        focus: "tell somebody the way to + 地点。",
      },
      {
        id: "chunk-3",
        chinese: "他把手伸进口袋里，掏出了一本常用语手册。",
        english: "He put his hand into his pocket, and took out a phrasebook.",
        focus: "put … into …；take out。",
      },
      {
        id: "chunk-4",
        chinese: "这些鞋去年和前年都很流行。",
        english: "They were in fashion last year and the year before last.",
        focus: "be in fashion；the year before last。",
      },
      {
        id: "chunk-5",
        chinese: "请向他问好。",
        english: "Please give him my regards.",
        focus: "give somebody one’s regards。",
      },
    ],
  },
  {
    id: "small-words",
    title: "小词准确度",
    description: "专练冠词、some / any、代词与介词等中文里容易被省略的成分。",
    drills: [
      {
        id: "small-1",
        chinese: "我们没有这样的鞋。",
        english: "We don't have any.",
        focus: "否定句用 any，不用 some。",
      },
      {
        id: "small-2",
        chinese: "你有和这些一样的鞋吗？",
        english: "Do you have any shoes like these?",
        focus: "any + 可数名词复数；like these。",
      },
      {
        id: "small-3",
        chinese: "我想要一双黑色的，五码的鞋。",
        english: "I want a pair of black shoes, size five.",
        focus: "a pair of + 复数名词；size five。",
      },
      {
        id: "small-4",
        chinese: "地上到处都是纸片、烟头、旧轮胎、空瓶子和生锈的罐头盒。",
        english:
          "The ground was covered with pieces of paper, cigarette ends, old tyres, empty bottles and rusty tins.",
        focus: "be covered with；名词复数和冠词。",
      },
      {
        id: "small-5",
        chinese: "游客们被告知要保持树林的整洁。",
        english: "Visitors have been asked to keep the woods clean and tidy.",
        focus: "被动语态 have been asked to do。",
      },
    ],
  },
  {
    id: "natural-expression",
    title: "地道表达",
    description: "将“单词都认识”提升为英语惯用的完整表达。",
    drills: [
      {
        id: "natural-1",
        chinese: "我恐怕不能。",
        english: "I'm afraid that I can't.",
        focus: "I’m afraid that … 是礼貌拒绝的固定表达。",
      },
      {
        id: "natural-2",
        chinese: "它们看上去很不舒服。",
        english: "They look very uncomfortable.",
        focus: "look + 形容词，不用 look very uncomfortably。",
      },
      {
        id: "natural-3",
        chinese: "这是个著名的风景胜地。",
        english: "It is a famous beauty spot.",
        focus: "beauty spot 是“风景胜地”的固定说法。",
      },
      {
        id: "natural-4",
        chinese: "上星期三我到树林里散步。",
        english: "Last Wednesday, I went for a walk in the woods.",
        focus: "go for a walk 是固定搭配。",
      },
      {
        id: "natural-5",
        chinese: "我所看到的一切使我感到非常难过。",
        english: "What I saw made me very sad.",
        focus: "What I saw 作主语；make somebody + 形容词。",
      },
    ],
  },
];

// A drill is available only in the lesson that contains its source sentence.
// This prevents a current lesson from borrowing practice material from another one.
const drillLessonNumbers: Record<string, number> = {
  "tense-1": 73,
  "tense-2": 101,
  "tense-3": 101,
  "tense-4": 101,
  "tense-5": 141,
  "chunk-1": 73,
  "chunk-2": 73,
  "chunk-3": 73,
  "chunk-4": 75,
  "chunk-5": 109,
  "small-1": 75,
  "small-2": 75,
  "small-3": 75,
  "small-4": 143,
  "small-5": 143,
  "natural-1": 75,
  "natural-2": 75,
  "natural-3": 143,
  "natural-4": 143,
  "natural-5": 143,
  "pattern-4": 143,
};

export function getErrorCategoriesForLesson(lessonNumber: number) {
  return errorCategories
    .map((category) => ({
      ...category,
      drills: category.drills.filter(
        (drill) => drillLessonNumbers[drill.id] === lessonNumber,
      ),
    }))
    .filter((category) => category.drills.length > 0);
}
