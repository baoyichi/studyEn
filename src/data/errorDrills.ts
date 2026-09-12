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

export type TranslationPractice = {
  categories: ErrorCategory[];
  mode: "error" | "core";
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

const lessonCoreDrills: Record<number, ErrorDrill> = {
  77: {
    id: "core-77",
    chinese: "我必须现在就见牙科医生，护士。",
    english: "I must see the dentist now, nurse.",
    focus: "must + 动词原形，表达必须立刻做的事。",
  },
  79: {
    id: "core-79",
    chinese: "我们的茶叶和咖啡不多了，糖和果酱也没有了。",
    english:
      "We haven't got much tea or coffee, and we haven't got any sugar or jam.",
    focus: "much 用于不可数名词；否定句中用 any。",
  },
  81: {
    id: "core-81",
    chinese: "今晚你们又要吃烤牛肉和土豆了！",
    english: "You're going to have roast beef and potatoes again tonight!",
    focus: "be going to + 动词原形，表示按计划或预期会发生的事。",
  },
  83: {
    id: "core-83",
    chinese: "我已经吃过午饭了。",
    english: "I've already had lunch.",
    focus: "现在完成时 have/has + 过去分词；already 放在助动词后。",
  },
  85: {
    id: "core-85",
    chinese: "肯，你去过那里吗？",
    english: "Have you ever been there, Ken?",
    focus: "Have you ever + 过去分词…? 用于询问经历。",
  },
  87: {
    id: "core-87",
    chinese: "没有，他们还在修理它。",
    english: "No, they're still working on it.",
    focus: "现在进行时表示仍在进行；work on 表示“修理、处理”。",
  },
  89: {
    id: "core-89",
    chinese: "我已经在这里住了20年了。",
    english: "I've lived here for twenty years.",
    focus: "现在完成时 + for + 时间段，表示持续至今。",
  },
  91: {
    id: "core-91",
    chinese: "伊恩已经把他的房子卖掉了吗？",
    english: "Has Ian sold his house yet?",
    focus: "现在完成时的一般疑问句；yet 常用于疑问句和否定句。",
  },
  93: {
    id: "core-93",
    chinese: "他已经去过世界上几乎每一个国家。",
    english: "He has already been to nearly every country in the world.",
    focus: "have been to 表示“去过并已回来”的经历。",
  },
  95: {
    id: "core-95",
    chinese: "肯，我们现在最好回到车站去。",
    english: "We had better go back to the station now, Ken.",
    focus: "had better + 动词原形，表示“最好做某事”。",
  },
  97: {
    id: "core-97",
    chinese: "几天前我把一只手提箱忘在开往伦敦的火车上了。",
    english: "I left a suitcase on the train to London the other day.",
    focus: "leave + 物 + 地点，表示“把某物遗忘在某处”。",
  },
  99: {
    id: "core-99",
    chinese: "我想最好请医生来给你看一下。",
    english: "The doctor had better see you.",
    focus: "had better + 动词原形，用于给出强烈建议。",
  },
  103: {
    id: "core-103",
    chinese: "那些题对我来说太难了。",
    english: "They were too difficult for me.",
    focus: "too + 形容词 + for somebody，表示“对某人来说太……”。",
  },
  105: {
    id: "core-105",
    chinese: "我要你把它重打一遍。",
    english: "I want you to type it again.",
    focus: "want somebody to do something，表示“要某人做某事”。",
  },
  107: {
    id: "core-107",
    chinese: "这件衣服对我来说太小了。",
    english: "It's too small for me.",
    focus: "too + 形容词 + for somebody，表达尺寸或程度不合适。",
  },
  111: {
    id: "core-111",
    chinese: "这种型号的比那种要便宜些。",
    english: "This model's less expensive than that one.",
    focus: "less + 形容词 + than，构成“较不……”的比较级。",
  },
  113: {
    id: "core-113",
    chinese: "我也不能。",
    english: "Neither can I.",
    focus: "Neither + 助动词 + 主语，表示“某人也不……”。",
  },
  115: {
    id: "core-115",
    chinese: "我肯定家里没有人。",
    english: "I'm sure there's no one at home.",
    focus: "there is/are + 名词，表示某处“有”；no one 表示“没有人”。",
  },
  117: {
    id: "core-117",
    chinese: "汤米已经把它们咽下去了！",
    english: "Tommy had already swallowed them!",
    focus: "过去完成时 had + 过去分词，表示过去某一时刻之前已完成。",
  },
  119: {
    id: "core-119",
    chinese: "他们进到屋里后，走进了饭厅。",
    english: "After they had entered the house, they went into the dining room.",
    focus: "after 引导的从句用过去完成时，突出先发生的动作。",
  },
  121: {
    id: "core-121",
    chinese: "站在柜台后面的那位女士。",
    english: "The lady who is standing behind the counter.",
    focus: "who 引导定语从句，修饰表示人的先行词。",
  },
  123: {
    id: "core-123",
    chinese: "这是我们所乘的那条船。",
    english: "That's the ship we travelled on.",
    focus: "省略关系代词的定语从句；介词 on 留在句末。",
  },
  125: {
    id: "core-125",
    chinese: "我不得不每天给它浇水。",
    english: "I had to water it every day.",
    focus: "had to 是 have to 的过去式，表示过去“不得不”。",
  },
  127: {
    id: "core-127",
    chinese: "那一定是女演员卡伦·马什。",
    english: "It must be Karen Marsh, the actress.",
    focus: "must + 动词原形，表示对现在情况的肯定推测。",
  },
  129: {
    id: "core-129",
    chinese: "你刚才一定是以每小时70英里的速度开车。",
    english: "You must have been driving at seventy miles an hour.",
    focus: "must have been doing，表示对过去正在发生之事的肯定推测。",
  },
  131: {
    id: "core-131",
    chinese: "我们可能到国外去。",
    english: "We may go abroad.",
    focus: "may + 动词原形，表示不太确定的可能性。",
  },
  133: {
    id: "core-133",
    chinese: "她说她准备退休。",
    english: "She said she was going to retire.",
    focus: "间接引语中，was going to 表示当时的将来计划。",
  },
  135: {
    id: "core-135",
    chinese: "她说她得问问她的未婚夫。",
    english: "She said she would have to ask her future husband.",
    focus: "间接引语中，will have to 通常后移为 would have to。",
  },
  137: {
    id: "core-137",
    chinese: "要是我赢了许多钱，我给你买件貂皮大衣。",
    english: "If I win a lot of money, I'll buy you a mink coat.",
    focus: "第一条件句：if 从句用一般现在时，主句用 will。",
  },
  139: {
    id: "core-139",
    chinese: "我说过我6点到你家。",
    english: "I said I would be at your house at six o'clock.",
    focus: "过去语境中，will 常后移为 would。",
  },
};

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

export function getTranslationPractice(
  lessonNumber: number,
): TranslationPractice {
  const errorPractice = getErrorCategoriesForLesson(lessonNumber);
  if (errorPractice.length > 0) {
    return { categories: errorPractice, mode: "error" };
  }

  const coreDrill = lessonCoreDrills[lessonNumber];
  return {
    categories: coreDrill
      ? [
          {
            id: `core-${lessonNumber}`,
            title: "本课重点句式",
            description: "本课没有匹配的错因专项，改练课文中的核心句式。",
            drills: [coreDrill],
          },
        ]
      : [],
    mode: "core",
  };
}
