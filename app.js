const STORAGE_KEY = "jule-club-learning-v1";

const dateKey = (offset = 0) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

const formatDate = (value) => new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${value}T12:00:00`));
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const round = (value) => Math.round(value);

const courses = [
  { id: "nce1", category: "经典教材", emblem: "NCE 1", tone: "orange", title: "新概念英语 · 第一册", level: "A1–A2", description: "从生活会话开始，打牢句型和语音基础。", progress: 38, total: 144, completed: 55, lesson: "Lesson 56 · Can I help you?", words: [{ word: "assistant", phonetic: "/əˈsɪstənt/", meaning: "n. 店员；助手" }, { word: "receipt", phonetic: "/rɪˈsiːt/", meaning: "n. 收据" }, { word: "change", phonetic: "/tʃeɪndʒ/", meaning: "n. 找给的钱；零钱" }] },
  { id: "nce2", category: "经典教材", emblem: "NCE 2", tone: "purple", title: "新概念英语 · 第二册", level: "A2–B1", description: "用短篇故事提升语法、表达与写作能力。", progress: 12, total: 96, completed: 12, lesson: "Lesson 13 · The Greenwood Boys", words: [{ word: "performance", phonetic: "/pəˈfɔːməns/", meaning: "n. 演出；表现" }, { word: "occasion", phonetic: "/əˈkeɪʒn/", meaning: "n. 场合；时机" }, { word: "present", phonetic: "/prɪˈzent/", meaning: "v. 演出；提出" }] },
  { id: "ket", category: "剑桥考试", emblem: "KET", tone: "green", title: "KET 入门冲刺", level: "A2", description: "覆盖 A2 Key 的词汇、阅读、写作与听说。", progress: 24, total: 60, completed: 14, lesson: "Unit 15 · At the market", words: [{ word: "afford", phonetic: "/əˈfɔːd/", meaning: "v. 买得起" }, { word: "customer", phonetic: "/ˈkʌstəmə(r)/", meaning: "n. 顾客" }, { word: "discount", phonetic: "/ˈdɪskaʊnt/", meaning: "n. 折扣" }] },
  { id: "pet", category: "剑桥考试", emblem: "PET", tone: "blue", title: "PET 能力进阶", level: "B1", description: "B1 Preliminary 真题思路与综合技能训练。", progress: 0, total: 72, completed: 0, lesson: "Unit 1 · A new neighbourhood", words: [{ word: "neighbourhood", phonetic: "/ˈneɪbəhʊd/", meaning: "n. 街区；社区" }, { word: "convenient", phonetic: "/kənˈviːniənt/", meaning: "adj. 方便的" }, { word: "recommend", phonetic: "/ˌrekəˈmend/", meaning: "v. 推荐" }] },
  { id: "fce", category: "剑桥考试", emblem: "FCE", tone: "purple", title: "FCE 高阶表达", level: "B2", description: "训练 First 的高频语法、写作结构与阅读技巧。", progress: 0, total: 80, completed: 0, lesson: "Unit 1 · Language in context", words: [{ word: "achieve", phonetic: "/əˈtʃiːv/", meaning: "v. 实现；获得" }, { word: "essential", phonetic: "/ɪˈsenʃl/", meaning: "adj. 必不可少的" }, { word: "approach", phonetic: "/əˈprəʊtʃ/", meaning: "n. 方法；方式" }] },
  { id: "cet", category: "大学英语", emblem: "CET", tone: "yellow", title: "大学英语四、六级", level: "B1–B2", description: "按题型练阅读、听力、翻译与写作。", progress: 7, total: 70, completed: 5, lesson: "听力篇 · 校园生活", words: [{ word: "schedule", phonetic: "/ˈʃedjuːl/", meaning: "n. 日程；计划" }, { word: "available", phonetic: "/əˈveɪləbl/", meaning: "adj. 可获得的" }, { word: "opportunity", phonetic: "/ˌɒpəˈtjuːnəti/", meaning: "n. 机会" }] },
  { id: "school", category: "校内考试", emblem: "中高考", tone: "orange", title: "中高考英语", level: "A2–B1", description: "词汇、语法、阅读理解和写作同步练。", progress: 0, total: 90, completed: 0, lesson: "阅读篇 · 主旨判断", words: [{ word: "describe", phonetic: "/dɪˈskraɪb/", meaning: "v. 描述" }, { word: "purpose", phonetic: "/ˈpɜːpəs/", meaning: "n. 目的" }, { word: "suggest", phonetic: "/səˈdʒest/", meaning: "v. 表明；建议" }] }
];

const taskDefinitions = [
  { id: "words", icon: "Ａ", tone: "orange", title: "复习 10 个核心词", meta: "生词本 · 预计 8 分钟", points: "+10" },
  { id: "course", icon: "▤", tone: "yellow", title: "完成 1 节课程", meta: "新概念英语 · 第一册", points: "+15" },
  { id: "listening", icon: "◌", tone: "purple", title: "完成 1 个听读训练", meta: "内置练习 · 预计 15 分钟", points: "+12" },
  { id: "review", icon: "↻", tone: "green", title: "完成今日复习", meta: "复习本 · 6 张记忆卡", points: "+10" }
];

const examPlans = {
  ket: {
    name: "KET · A2 Key", level: "A2", weeks: 12, weeklyMinutes: 225, target: "能在熟悉的生活情境中理解和使用基础表达，并完成简单互动。",
    units: [
      ["诊断与日常表达", "完成基线测评；建立自我介绍、时间与地点词汇；跟读 5 组短对话。", "能用 6–8 句介绍自己和日常安排。"],
      ["阅读：通知与信息", "练习识别标志、广告和短消息的关键信息；整理常见功能词。", "10 分钟内完成 8 条生活信息匹配。"],
      ["听力：短对话", "听地点、时间、价格与人物关系；每段材料至少听两遍。", "能准确记下 6 条事实信息。"],
      ["写作：表格与短信息", "填写表格；写 25–35 词的留言或邮件；检查拼写和标点。", "独立完成一则清晰、信息完整的短消息。"],
      ["口语：自我介绍", "练习个人信息、喜好和家庭话题；录音复听并修正发音。", "连续表达 45 秒，信息自然连贯。"],
      ["阅读：篇章理解", "练习人物、地点和事件定位；用题干关键词回到原文。", "完成一篇 A2 短文并解释答案依据。"],
      ["听力：生活场景", "精听购物、出行和约见场景；完成听后关键词复述。", "听懂主要目的及至少 70% 的细节。"],
      ["写作：邮件回应", "围绕邀请、建议、请求写 35 词左右邮件；使用问候和结尾。", "完成一封语气得体、覆盖全部要点的邮件。"],
      ["语法与词汇巩固", "集中复习时态、比较级、介词和高频搭配；错题归因。", "高频基础语法练习正确率达到 80%。"],
      ["口语：互动回应", "针对图片和简单问题作答；练习追问与礼貌回应。", "完成 3 轮简短问答并保持交流。"],
      ["分技能模拟", "按限时完成读写、听力和口语小模拟；记录薄弱题型。", "形成自己的错题清单与复习顺序。"],
      ["全真整合与复盘", "完成一次全流程模拟；只复习错题、模板和易混词。", "达到稳定发挥节奏，明确下一阶段重点。"]
    ]
  },
  pet: {
    name: "PET · B1 Preliminary", level: "B1", weeks: 16, weeklyMinutes: 250, target: "能处理日常学习与生活中的事实信息，并表达简单观点和感受。",
    units: [
      ["诊断与 B1 词汇", "完成基线测评；建立校园、旅行、健康和兴趣主题词网。", "明确两项优先提升的技能。"],
      ["阅读：短文本定位", "练习公告、邮件和广告的信息匹配；建立同义替换清单。", "限时完成信息定位并说出依据。"],
      ["阅读：长文主旨", "从段首、转折和指代入手概括主旨；区分事实与观点。", "读完 350 词文章后写出 3 点摘要。"],
      ["写作：邮件沟通", "写一封 80–100 词日常邮件；覆盖全部提示并使用连接词。", "邮件结构完整，语气自然。"],
      ["听力：事实与态度", "训练数字、地点、原因和说话者意图；建立听前预测习惯。", "两遍内抓住主旨和 70% 细节。"],
      ["口语：个人经历", "用过去经历、计划和偏好展开回答；录音检查停顿。", "围绕一个熟悉话题连续表达 1 分钟。"],
      ["阅读：语境推断", "通过上下文判断词义和人物情绪；完成证据标注。", "能为每题找到明确文本证据。"],
      ["写作：故事或文章", "练习开头、发展、结尾；使用描述性词汇和时间连接。", "完成一篇 100 词左右、逻辑清楚的短文。"],
      ["听力：对话与访谈", "识别转折、纠正和重点信息；听后口头复述。", "完成一段访谈的 5 点笔记。"],
      ["语言准确度", "集中练习时态、情态动词、动词搭配和常见介词。", "语法填空和改错正确率达到 80%。"],
      ["口语：协作任务", "练习提出建议、比较选择、同意和礼貌不同意。", "完成 2 分钟双人决策模拟。"],
      ["综合阅读听力", "用同一主题串联读与听；积累可迁移表达。", "能复述内容并表达自己的看法。"],
      ["写作精修", "用检查单修改两篇旧作：任务回应、结构、语法和拼写。", "形成一份个人写作错误清单。"],
      ["分项模拟", "按规定时间完成读写、听力和口语练习。", "记录每一项的正确率和时间分配。"],
      ["弱项回补", "针对最低分技能安排 3 次短循环练习。", "把一项薄弱能力提升到稳定水平。"],
      ["全真整合与复盘", "完成一次全流程模拟；整理考前一周复习卡。", "具备可执行的考场时间策略。"]
    ]
  },
  fce: {
    name: "FCE · B2 First", level: "B2", weeks: 20, weeklyMinutes: 300, target: "能在学习和生活场景中清晰表达观点、论证理由，并处理较复杂材料。",
    units: [
      ["诊断与 B2 目标", "完成基线测评；建立高频主题词、固定搭配和个人错误库。", "设定每项技能的量化目标。"],
      ["阅读：主旨与结构", "分析文章目的、段落功能和论证线索；练习快速定位。", "在限时内概括文章结构。"],
      ["语言运用：词汇搭配", "练习固定搭配、词形和多义词；将错题写入搭配卡。", "完成 30 个搭配的主动回忆。"],
      ["写作：文章组织", "练习开头立场、主体段论证和结尾回扣；使用衔接手段。", "写出一篇层次分明的观点文章。"],
      ["听力：态度与观点", "在访谈和讨论中识别说话者立场、例子和转折。", "听后准确概括两位说话者的差异。"],
      ["口语：延展回答", "用观点、理由、例子、让步四步扩展回答。", "围绕抽象话题连贯表达 90 秒。"],
      ["阅读：细节与推断", "区分直接信息和隐含态度；回原文标注证据。", "推断题正确率达到 75%。"],
      ["语言运用：句型转换", "练习改写、连接词、从句和强调结构。", "完成 15 个改写并归类错误。"],
      ["写作：评述与建议", "练习 review 或 proposal 的目的、语域和读者意识。", "完成一篇有清晰建议的实用文本。"],
      ["听力：多位说话者", "记录每位说话者的关键词和观点，避免被细节干扰。", "正确匹配人物与观点。"],
      ["口语：比较与协作", "练习比较图片、协商选择和共同完成任务。", "完成 3 分钟合作讨论且有推进语。"],
      ["阅读与词汇整合", "从原创建议类文章提取话题词、搭配与论证句。", "输出一份可复用表达清单。"],
      ["写作：限时产出", "在限时内完成一篇文章并用 5 分钟自检。", "稳定覆盖任务要求与字数范围。"],
      ["听力：精听回放", "对一段材料进行逐句听写、跟读和复述。", "修正 10 个连读或弱读识别问题。"],
      ["语言准确度回补", "针对个人错误库做小题循环：冠词、介词、搭配、词形。", "把高频错误减少一半。"],
      ["口语：观点辩护", "对熟悉议题提出主张、举例、回应不同意见。", "能自然使用 5 个观点表达。"],
      ["分项模拟一", "按限时完成阅读语言运用、写作、听力和口语。", "获得第一轮分项基线。"],
      ["分项模拟二", "针对第一轮的薄弱题型进行二次限时练习。", "时间分配更稳定，正确率提升。"],
      ["弱项冲刺", "只练个人薄弱点，同时维持每日词汇与听力输入。", "形成考前最后复习清单。"],
      ["全真整合与复盘", "完成全流程模拟并复盘答题顺序、检查方式和状态管理。", "以稳定节奏完成目标级别任务。"]
    ]
  }
};

const practiceLibrary = [
  { id: "ket-listening-market", exam: "KET", plan: "ket", type: "听力", level: "A2", logo: "listening", title: "市场里的约定", description: "听一段简短对话，识别时间、地点和购买意图。", minutes: 12, script: "Mia: Are you going to the market on Saturday? Leo: Yes, but I have football practice in the morning. Mia: No problem. Let's meet at the entrance at two o'clock. I need to buy a birthday card for my sister. Leo: Great. I want some fruit for our picnic.", questions: [{ question: "Why can't Leo go to the market in the morning?", options: ["He has an English class.", "He has football practice.", "He needs to see a doctor."], answer: 1 }, { question: "What does Mia want to buy?", options: ["A birthday card.", "Some fruit.", "A football."], answer: 0 }] },
  { id: "ket-reading-club", exam: "KET", plan: "ket", type: "阅读", level: "A2", logo: "reading", title: "课后摄影社", description: "阅读一则社团公告，完成信息定位。", minutes: 10, passage: "PHOTO CLUB\n\nDo you enjoy taking pictures? Our club meets every Wednesday at 4:15 in Room 12. Beginners are welcome. This month, we are learning how to take photos of people and pets. Bring a phone or a camera. On 18 May, we will visit the city park together. Ask Ms Green if you want to join.", questions: [{ question: "When does the photo club meet each week?", options: ["On Wednesday afternoon.", "On Thursday morning.", "On Saturday afternoon."], answer: 0 }, { question: "What are members learning to photograph this month?", options: ["People and pets.", "Cameras and phones.", "Posters and signs."], answer: 0 }] },
  { id: "pet-listening-volunteer", exam: "PET", plan: "pet", type: "听力", level: "B1", logo: "listening", title: "社区清洁日", description: "听同学讨论志愿活动，抓住计划变化和个人原因。", minutes: 15, script: "Anna: Are you still joining the community clean-up on Sunday, Ben? Ben: I was going to, but my cousin is visiting in the morning. Anna: That's a shame. The group starts at ten near the library. Ben: I can come after lunch. Will you still be there? Anna: Yes. We are cleaning the riverside first, then planting flowers behind the sports centre. Ben: Perfect. I will bring gloves and some water for everyone.", questions: [{ question: "Why can't Ben join the activity in the morning?", options: ["He has homework to finish.", "His cousin is visiting.", "He is taking part in a competition."], answer: 1 }, { question: "Where will the group work after lunch?", options: ["Near the library.", "By the riverside and behind the sports centre.", "In the city-centre garden."], answer: 1 }, { question: "What will Ben bring?", options: ["Food and a map.", "Gloves and water.", "A camera and posters."], answer: 1 }] },
  { id: "pet-reading-library", exam: "PET", plan: "pet", type: "阅读", level: "B1", logo: "reading", title: "图书馆的新服务", description: "阅读一封通知邮件，识别目的、细节和建议。", minutes: 14, passage: "Hello students,\n\nFrom next Monday, the town library will stay open until 8 p.m. on Tuesdays and Thursdays. This is to help students who cannot visit after school. You can also reserve popular books online and collect them from the desk within three days. The library is looking for young volunteers to recommend books for a new teen corner. If you are interested, send a short email explaining what you enjoy reading.\n\nBest wishes,\nLibrary Team", questions: [{ question: "Why is the library extending its opening hours?", options: ["To hold more talks.", "To help students after school.", "To sell new books."], answer: 1 }, { question: "How long will reserved books be kept?", options: ["Three days.", "One week.", "One month."], answer: 0 }, { question: "What must students do to apply as volunteers?", options: ["Attend an interview.", "Show their library card.", "Email the library about their reading interests."], answer: 2 }] },
  { id: "fce-listening-podcast", exam: "FCE", plan: "fce", type: "听力", level: "B2", logo: "listening", title: "播客：城市花园", description: "听一段访谈，分辨主张、例证和让步关系。", minutes: 18, script: "Host: Today we are talking to Daniel, who helps turn empty city spaces into small gardens. Daniel, why do these projects matter? Daniel: People often think the main benefit is fresh food. That is useful, but the bigger change is social. Neighbours who never spoke before begin sharing tools and ideas. Host: Some people say gardens take too much time to maintain. Daniel: They can, especially in the first year. So we now choose plants that need less water and ask local schools to help during the summer. Host: Has the project changed your own routine? Daniel: Absolutely. I cycle to each garden twice a week, and I have become much more aware of how quickly a neighbourhood can change.", questions: [{ question: "What does Daniel see as the most important benefit of city gardens?", options: ["They provide fresh food.", "They strengthen social connections.", "They reduce water use."], answer: 1 }, { question: "How does the team deal with maintenance difficulties?", options: ["By making the gardens smaller.", "By choosing low-water plants and involving schools.", "By planting only in winter."], answer: 1 }, { question: "What change in Daniel's own life does he mention?", options: ["He cycles more and notices neighbourhood change.", "He has started teaching at a school.", "He no longer uses public transport."], answer: 0 }] },
  { id: "fce-reading-remote", exam: "FCE", plan: "fce", type: "阅读", level: "B2", logo: "reading", title: "观点阅读：远程工作的边界", description: "阅读一篇评论短文，识别论点、证据和限制条件。", minutes: 16, passage: "Remote work is often presented as a simple choice between freedom and isolation. In reality, its success depends less on location than on the habits a team builds. A clear plan for meetings can protect people from spending an entire day online, while written updates make it easier for quieter colleagues to contribute.\n\nHowever, flexibility is not automatically fair. New employees may find it harder to learn informal routines when they rarely meet experienced colleagues. For that reason, some companies now combine home working with regular team days. This approach does not solve every problem, but it recognises that productive work also depends on trust, shared context and occasional unplanned conversation.", questions: [{ question: "According to the writer, what mainly determines whether remote work succeeds?", options: ["How far employees live from the office.", "The working habits a team develops.", "The price of video software."], answer: 1 }, { question: "What difficulty may new employees experience?", options: ["Learning informal routines is harder.", "They do not have private offices.", "They cannot use written updates."], answer: 0 }, { question: "What is the writer's view of hybrid working?", options: ["It solves every problem.", "It is unnecessary.", "It recognises the value of shared context."], answer: 2 }] }
];

const freshState = () => {
  const initialMinutes = {};
  [6, 5, 4, 3, 2, 1, 0].forEach((offset, index) => { initialMinutes[dateKey(-offset)] = [19, 34, 26, 42, 16, 37, 22][index]; });
  return {
    checkins: [6, 5, 4, 3, 2, 1].map((offset) => dateKey(-offset)),
    completedTasks: ["words"],
    courses: courses.map((course) => ({ ...course })),
    vocab: [
      { id: "v1", word: "routine", phonetic: "/ruːˈtiːn/", meaning: "n. 日常；惯例", source: "新概念第一册", status: "mastering", score: 72, added: dateKey(-2) },
      { id: "v2", word: "confident", phonetic: "/ˈkɒnfɪdənt/", meaning: "adj. 自信的；有把握的", source: "PET", status: "mastering", score: 61, added: dateKey(-1) },
      { id: "v3", word: "receipt", phonetic: "/rɪˈsiːt/", meaning: "n. 收据", source: "新概念第一册", status: "new", score: 34, added: dateKey(0) },
      { id: "v4", word: "improve", phonetic: "/ɪmˈpruːv/", meaning: "v. 改进；提高", source: "VOA Learning English", status: "mastered", score: 92, added: dateKey(-5) },
      { id: "v5", word: "schedule", phonetic: "/ˈʃedjuːl/", meaning: "n. 日程；计划", source: "大学英语四、六级", status: "mastering", score: 66, added: dateKey(-3) },
      { id: "v6", word: "opportunity", phonetic: "/ˌɒpəˈtjuːnəti/", meaning: "n. 机会", source: "大学英语四、六级", status: "new", score: 43, added: dateKey(-1) }
    ],
    sessions: [],
    minutes: initialMinutes,
    activeCourse: "nce1",
    activePlan: "ket",
    activePractice: "ket-listening-market",
    planCompletedWeeks: { ket: [], pet: [], fce: [] },
    practiceResults: {},
    currentPage: "today"
  };
};

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.courses) && Array.isArray(saved.vocab)) return saved;
  } catch (error) {
    console.warn("无法读取既有学习数据", error);
  }
  return freshState();
};

let state = loadState();
state.sessions = Array.isArray(state.sessions) ? state.sessions : [];
state.planCompletedWeeks = state.planCompletedWeeks || { ket: [], pet: [], fce: [] };
state.practiceResults = state.practiceResults || {};
state.activePlan = examPlans[state.activePlan] ? state.activePlan : "ket";
state.activePractice = practiceLibrary.some((practice) => practice.id === state.activePractice) ? state.activePractice : "ket-listening-market";
let ui = { courseFilter: "全部", studyTab: "words", reviewIndex: 0, answerVisible: false, resourceFilter: "全部", transcriptVisible: false };

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
let toastTimer;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
};

const getCourse = (id) => state.courses.find((course) => course.id === id) || state.courses[0];
const isToday = (value) => value === dateKey();
const getStreak = () => {
  const dates = new Set(state.checkins);
  let cursor = isToday(dateKey()) ? 0 : -1;
  let streak = 0;
  while (dates.has(dateKey(cursor))) { streak += 1; cursor -= 1; }
  return streak;
};
const completedCount = () => state.completedTasks.length;
const minutesToday = () => state.minutes?.[dateKey()] || 0;
const addMinutes = (amount) => { state.minutes = state.minutes || {}; state.minutes[dateKey()] = (state.minutes[dateKey()] || 0) + amount; };
const reviewWords = () => state.vocab.filter((word) => word.status !== "mastered");
const getStatusLabel = (status) => ({ new: "刚收录", mastering: "正在掌握", mastered: "已掌握" })[status] || "正在掌握";
const statusFromScore = (score) => score >= 85 ? "mastered" : score >= 55 ? "mastering" : "new";
const formatShortDate = (value) => new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(new Date(`${value}T12:00:00`));

const renderPageHeader = (eyebrow, title, subtitle, options = "") => `
  <header class="page-head">
    <div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>
    ${options}
  </header>`;

const renderTask = (task) => {
  const done = state.completedTasks.includes(task.id);
  return `<div class="task-row ${done ? "done" : ""}">
    <button class="task-check" aria-label="${done ? "取消完成" : "标记完成"}" data-action="toggle-task" data-task="${task.id}">${done ? "✓" : ""}</button>
    <span class="task-icon ${task.tone}">${task.icon}</span>
    <span class="task-content"><span class="task-title">${task.title}</span><span class="task-meta">${task.meta}</span></span>
    <span class="task-points">${done ? "完成" : task.points}</span>
  </div>`;
};

const renderCourseMini = (course) => `<div class="course-mini-item">
  <span class="course-emblem ${course.tone}">${course.emblem}</span>
  <span><span class="course-mini-title">${course.title}</span><span class="course-mini-meta">${course.completed}/${course.total} 节 · ${course.lesson}</span><span class="progress ${course.tone}"><span style="width:${course.progress}%"></span></span></span>
  <span class="course-percent">${round(course.progress)}%</span>
</div>`;

const renderToday = () => {
  const checkedIn = state.checkins.includes(dateKey());
  const activeCourses = state.courses.filter((course) => course.progress > 0).slice(0, 2);
  const courseProgress = round(state.courses.reduce((sum, course) => sum + course.progress, 0) / state.courses.length);
  app.innerHTML = `${renderPageHeader("DAILY PRACTICE", "今天，和英语见个面。", "从一个小任务开始，让进步自然发生。", `<div class="date-note">${formatDate(dateKey())}</div>`)}
    <section class="checkin-banner">
      <div><p class="checkin-title">${checkedIn ? "今天已经打卡，继续保持！" : "先完成今日打卡，点亮你的学习节奏。"}</p><p class="checkin-copy">每次投入都算数，今天也为自己积累一点。</p></div>
      <div class="streak"><div><div class="streak-number">${getStreak()}</div><div class="streak-label">连续学习<br>天数</div></div><button class="primary-btn ${checkedIn ? "checked" : ""}" data-action="checkin">${checkedIn ? "已打卡 ✓" : "立即打卡"}</button></div>
    </section>
    <section class="stats-row">
      <div class="stat-card orange"><span class="stat-label">今日任务</span><span class="stat-number">${completedCount()}<small>/ ${taskDefinitions.length}</small></span><div class="stat-foot orange-text">再完成 ${taskDefinitions.length - completedCount()} 项就圆满了</div></div>
      <div class="stat-card green"><span class="stat-label">今日专注</span><span class="stat-number">${minutesToday()}<small>分钟</small></span><div class="stat-foot">比昨天多投入一点点</div></div>
      <div class="stat-card purple"><span class="stat-label">总体课程进度</span><span class="stat-number">${courseProgress}<small>%</small></span><div class="stat-foot">已完成 ${state.courses.reduce((sum, course) => sum + course.completed, 0)} 节学习</div></div>
    </section>
    <section class="grid-two">
      <div class="card"><div class="card-head"><h2>今日任务</h2><button class="text-link" data-nav="resources">去听读练习 →</button></div><div class="task-list">${taskDefinitions.map(renderTask).join("")}</div></div>
      <div><div class="card"><div class="card-head"><h2>继续学习</h2><button class="text-link" data-nav="courses">全部课程</button></div><div class="course-mini">${activeCourses.map(renderCourseMini).join("")}</div><div class="section-divider"></div><button class="secondary-btn" data-action="continue-course">继续 ${getCourse(state.activeCourse).emblem} 当前课程</button></div>
      <div class="review-card"><div class="quote-mark">“</div><h3>有 ${reviewWords().length} 个词等你重逢</h3><p>今天复习 5 分钟，让记忆更牢一点。</p><button class="primary-btn" data-nav="review">开始复习</button></div></div>
    </section>`;
};

const renderCourses = () => {
  const filters = ["全部", "经典教材", "剑桥考试", "大学英语", "校内考试"];
  const list = ui.courseFilter === "全部" ? state.courses : state.courses.filter((course) => course.category === ui.courseFilter);
  app.innerHTML = `${renderPageHeader("COURSE LIBRARY", "找到适合现在的课程。", "从基础语感到考试能力，按自己的节奏开始。", `<div class="date-note">共 ${state.courses.length} 个课程包</div>`)}
    <div class="chip-row">${filters.map((filter) => `<button class="chip ${ui.courseFilter === filter ? "active" : ""}" data-action="filter-course" data-filter="${filter}">${filter}</button>`).join("")}</div>
    <section class="course-grid">${list.map((course) => { const plan = examPlans[course.id]; return `<article class="course-card tone-${course.tone}">
      <span class="course-category">${course.category.toUpperCase()} · ${course.level}</span><h3>${course.title}</h3><p>${course.description}</p>
      <div class="course-info"><span>${plan ? `${plan.weeks} 周备考计划 · 每周 ${plan.weeklyMinutes} 分钟` : `${course.completed} / ${course.total} 节已完成`}</span><div class="progress ${course.tone}"><span style="width:${course.progress}%"></span></div></div>
      <div class="course-actions"><button class="primary-btn" data-action="start-course" data-course="${course.id}">${course.progress ? "继续学习" : "开始课程"}</button>${plan ? `<button class="soft-btn" data-action="open-plan" data-course="${course.id}">备考计划</button>` : `<button class="soft-btn" data-action="set-course" data-course="${course.id}">课程详情</button>`}</div>
    </article>`; }).join("")}</section>`;
};

const renderStudyWords = (course) => `<div class="word-list">${course.words.map((word) => `<div class="word-row"><div class="word-main"><strong>${word.word}</strong><span>${word.phonetic}</span></div><span class="word-meaning">${word.meaning}</span><span><button class="icon-btn" title="朗读单词" data-action="speak" data-text="${word.word}">◖</button><button class="icon-btn" title="收录进生词本" data-action="add-course-word" data-word="${word.word}">＋</button></span></div>`).join("")}</div>`;

const renderStudyContent = (course) => {
  if (ui.studyTab === "sentences") return `<div class="sentence"><p>Can I help you?</p><small>我能帮您吗？用于商店、服务台等场景中的礼貌询问。</small><br><button class="soft-btn" data-action="speak" data-text="Can I help you?">朗读这句话</button></div><div class="sentence"><p>Here is your receipt and your change.</p><small>这是您的收据和找零。注意 receipt 中的字母 p 不发音。</small><br><button class="soft-btn" data-action="speak" data-text="Here is your receipt and your change.">朗读这句话</button></div>`;
  if (ui.studyTab === "quiz") return `<div class="quiz"><p class="quiz-question">选择最合适的回答："Can I help you?"</p><label class="quiz-option"><input type="radio" name="quiz-answer" value="a"> A. Yes, please. I am looking for a notebook.</label><label class="quiz-option"><input type="radio" name="quiz-answer" value="b"> B. It is on the table yesterday.</label><label class="quiz-option"><input type="radio" name="quiz-answer" value="c"> C. I help my mother last night.</label><button class="secondary-btn" data-action="check-quiz">提交答案</button></div>`;
  return renderStudyWords(course);
};

const renderStudy = () => {
  const course = getCourse(state.activeCourse);
  const completedSample = Math.max(1, course.completed);
  app.innerHTML = `<button class="back-btn" data-nav="courses">← 返回课程包</button>
    <section class="study-layout"><div><div class="study-hero"><p class="eyebrow">${course.emblem} · ${course.level}</p><h1>${course.lesson}</h1><p>预计 12 分钟 · 词汇、重点句与随堂练习</p><span class="course-emblem ${course.tone}">${course.emblem}</span></div>
    <div class="card"><div class="lesson-tabs"><button class="lesson-tab ${ui.studyTab === "words" ? "active" : ""}" data-action="study-tab" data-tab="words">本课词汇</button><button class="lesson-tab ${ui.studyTab === "sentences" ? "active" : ""}" data-action="study-tab" data-tab="sentences">重点句</button><button class="lesson-tab ${ui.studyTab === "quiz" ? "active" : ""}" data-action="study-tab" data-tab="quiz">随堂练习</button></div><div class="study-content">${renderStudyContent(course)}<div class="study-finish"><span>完成本课将增加课程进度和今日学习时长。</span><span><button class="soft-btn ${examPlans[course.id] ? "" : "hidden"}" data-action="open-plan" data-course="${course.id}">本周计划</button> <button class="primary-btn" data-action="complete-lesson" data-course="${course.id}">完成本课 ✓</button></span></div></div></div></div>
    <aside class="lesson-side"><div class="card roadmap"><p class="roadmap-title">本单元进度</p>${[0, 1, 2, 3, 4].map((item) => `<div class="lesson-node ${item < 2 ? "done" : item === 2 ? "current" : ""}"><span class="lesson-dot">${item < 2 ? "✓" : item + 1}</span><span><strong>${item === 2 ? course.lesson : `Lesson ${completedSample + item - 1}`}</strong><small>${item < 2 ? "已完成" : item === 2 ? "正在学习" : "待解锁"}</small></span></div>`).join("")}</div><div class="card tip-card"><h3>今日小提示</h3><p>先听一遍，再跟读两遍。没有完全听懂也没关系，保持对语音的熟悉更重要。</p></div></aside></section>`;
};

const getPractice = (id) => practiceLibrary.find((practice) => practice.id === id) || practiceLibrary[0];
const practiceName = (practiceId) => practiceLibrary.find((practice) => practice.id === practiceId)?.title || "往期听读训练";
const completedWeeks = (planId) => state.planCompletedWeeks[planId] || [];
const nextWeek = (planId) => {
  const completed = new Set(completedWeeks(planId));
  const plan = examPlans[planId];
  return plan.units.findIndex((_, index) => !completed.has(index)) + 1 || plan.weeks;
};

const renderPlan = () => {
  const planId = state.activePlan;
  const plan = examPlans[planId];
  const doneWeeks = completedWeeks(planId);
  const progress = plan.weeks ? round(doneWeeks.length / plan.weeks * 100) : 0;
  app.innerHTML = `${renderPageHeader("EXAM ROADMAP", "把备考拆成每周做得到的事。", "每周 5 次练习，读、听、写、说和语言准确度同步推进。", `<div class="date-note">第 ${nextWeek(planId)} / ${plan.weeks} 周</div>`)}
    <div class="chip-row">${Object.entries(examPlans).map(([id, item]) => `<button class="chip ${id === planId ? "active" : ""}" data-action="select-plan" data-plan="${id}">${item.name}</button>`).join("")}</div>
    <section class="plan-hero"><div><p class="eyebrow">${plan.name.toUpperCase()} · CEFR ${plan.level}</p><h2>${plan.weeks} 周稳步备考路径</h2><p>${plan.target}</p></div><div class="plan-hero-stats"><span><b>${plan.weeklyMinutes}</b> 分钟<small>每周建议投入</small></span><span><b>5</b> 次<small>每周有效练习</small></span><span><b>${doneWeeks.length}</b> 周<small>已完成</small></span></div></section>
    <section class="plan-overview"><div class="card"><div class="card-head"><h2>整体进度</h2><span class="muted">${progress}%</span></div><div class="progress ${planId === "ket" ? "green" : planId === "pet" ? "blue" : "purple"}"><span style="width:${progress}%"></span></div><p class="resource-note">每周建议安排：2 次读写（各 45 分钟）、2 次听说（各 45 分钟）、1 次语言复盘（45 分钟）。完成本周计划时，系统会把本周学习量记入成长分析。</p></div><div class="card plan-standard"><span class="stat-label">能力达标参照</span><p>${planId === "ket" ? "A2：理解并使用基础表达，处理简单书面信息和日常互动。" : planId === "pet" ? "B1：理解事实信息，在日常主题中表达意见、写邮件和参与交流。" : "B2：在较复杂的学习与生活情境中清晰论证、比较选择并产出详细文本。"}</p><button class="soft-btn" data-nav="resources">去完成本周听读</button></div></section>
    <section class="week-grid">${plan.units.map(([focus, practice, goal], index) => { const done = doneWeeks.includes(index); const isCurrent = nextWeek(planId) === index + 1 && !done; return `<article class="week-card ${done ? "done" : ""} ${isCurrent ? "current" : ""}"><div class="week-top"><span class="week-number">W${String(index + 1).padStart(2, "0")}</span><span class="status-pill ${done ? "mastered" : isCurrent ? "mastering" : "new"}">${done ? "本周达标" : isCurrent ? "本周进行中" : "待开始"}</span></div><h3>${focus}</h3><p>${practice}</p><div class="week-goal"><span>本周产出</span>${goal}</div><button class="${done ? "soft-btn" : "primary-btn"}" data-action="complete-plan-week" data-plan="${planId}" data-week="${index}">${done ? "取消完成" : "标记本周达标"}</button></article>`; }).join("")}</section>
    <p class="resource-note plan-note">说明：这是依据 A2 Key、B1 Preliminary 与 B2 First 的 CEFR 能力目标设计的原创学习计划，不是 Cambridge 官方课程或真题。</p>`;
};

const renderResources = () => {
  const filters = ["全部", "KET", "PET", "FCE", "听力", "阅读"];
  const list = practiceLibrary.filter((practice) => ui.resourceFilter === "全部" || practice.exam === ui.resourceFilter || practice.type === ui.resourceFilter);
  const recent = state.sessions.filter((session) => session.completed).slice(0, 5);
  const completedToday = state.sessions.filter((session) => session.date === dateKey() && session.completed).length;
  app.innerHTML = `${renderPageHeader("LISTEN & READ", "在句乐部里完成听读训练。", "所有材料、朗读、答题、完成记录和每日任务都留在当前页面。", `<div class="date-note">今日完成 ${completedToday} 次</div>`)}
    <div class="chip-row">${filters.map((filter) => `<button class="chip ${ui.resourceFilter === filter ? "active" : ""}" data-action="filter-resource" data-filter="${filter}">${filter}</button>`).join("")}</div>
    <section class="resource-layout"><div><div class="resource-grid">${list.map((practice) => { const result = state.practiceResults[practice.id]; return `<article class="resource-card ${result?.completed ? "completed-practice" : ""}"><span class="resource-logo ${practice.logo}">${practice.exam}</span><div><h3>${practice.title}</h3><p>${practice.description}</p><small>${practice.exam} · ${practice.type} · ${practice.level} · ${practice.minutes} 分钟</small>${result?.completed ? `<span class="practice-score">已完成 · ${result.score}/${result.total} 题正确</span>` : ""}</div><div class="resource-actions"><button class="secondary-btn" data-action="start-practice" data-practice="${practice.id}">${result?.completed ? "再次练习" : "进入训练"}</button></div></article>`; }).join("")}</div><p class="resource-note">内置材料为原创练习内容。听力使用浏览器的英语语音朗读；可先听后答，再按需查看原文。</p></div>
    <aside class="card"><div class="card-head"><h2>最近完成</h2><span class="muted">${recent.length} 次</span></div><div class="session-list">${recent.length ? recent.map((session) => `<div class="session-item"><strong>${practiceName(session.resourceId)}</strong><small>${formatShortDate(session.date)} · ${session.minutes} 分钟 · 已完成</small></div>`).join("") : `<div class="empty-state"><strong>还没有听读记录</strong>完成一篇内置训练，就会自动计入今天的打卡与成长分析。</div>`}</div><div class="section-divider"></div><button class="soft-btn" data-nav="plans">查看本周备考计划</button></aside></section>`;
};

const renderPractice = () => {
  const practice = getPractice(state.activePractice);
  const isListening = practice.type === "听力";
  const previous = state.practiceResults[practice.id];
  const content = isListening ? practice.script : practice.passage;
  app.innerHTML = `<button class="back-btn" data-nav="resources">← 返回听力阅读</button>
    <section class="practice-layout"><div><div class="practice-hero ${isListening ? "listening" : "reading"}"><p class="eyebrow">${practice.exam} · ${practice.level} · ${practice.type}</p><h1>${practice.title}</h1><p>${practice.description}</p><span>${practice.minutes} MIN</span></div>
    <div class="card practice-content">${isListening ? `<div class="practice-audio"><div><strong>先听后答</strong><p>建议连续听两遍，第二遍记下关键词和变化信息。</p></div><button class="primary-btn" data-action="speak-practice" data-practice="${practice.id}">▶ 播放英文朗读</button></div><button class="text-link" data-action="toggle-transcript">${ui.transcriptVisible ? "收起听力原文" : "需要时查看听力原文"}</button><div class="transcript ${ui.transcriptVisible ? "" : "hidden"}">${content}</div>` : `<div class="reading-passage">${content.split("\n").map((paragraph) => `<p>${paragraph || "&nbsp;"}</p>`).join("")}</div>`}
      <form class="practice-form" data-form="practice" data-practice="${practice.id}"><div class="section-divider"></div><h2>理解检测</h2>${practice.questions.map((question, index) => `<div class="practice-question"><p><b>${index + 1}.</b> ${question.question}</p>${question.options.map((option, optionIndex) => `<label class="quiz-option"><input type="radio" name="practice-q-${index}" value="${optionIndex}"> ${String.fromCharCode(65 + optionIndex)}. ${option}</label>`).join("")}</div>`).join("")}<button class="primary-btn" type="submit">提交并完成训练</button></form>${previous ? `<div class="practice-result ${previous.completed ? "success" : ""}">${previous.completed ? `已记录：${previous.score}/${previous.total} 题正确，${practice.minutes} 分钟已计入今日学习。` : `最近一次得分 ${previous.score}/${previous.total}。再听一遍，答对所有题目即可完成记录。`}</div>` : ""}</div></div>
    <aside class="lesson-side"><div class="card"><p class="roadmap-title">本次训练目标</p><div class="lesson-node current"><span class="lesson-dot">1</span><span><strong>${isListening ? "先听主旨" : "快速通读"}</strong><small>${isListening ? "识别场景与人物关系" : "判断文章目的与结构"}</small></span></div><div class="lesson-node"><span class="lesson-dot">2</span><span><strong>${isListening ? "捕捉细节" : "定位证据"}</strong><small>${isListening ? "时间、地点、原因和变化" : "回到原文确认依据"}</small></span></div><div class="lesson-node"><span class="lesson-dot">3</span><span><strong>完成检测</strong><small>答对全部问题即可记录完成</small></span></div></div><div class="card tip-card"><h3>本周计划联动</h3><p>完成本单元会自动完成今日“听读训练”任务，并计入成长分析。${practice.plan.toUpperCase()} 的周计划可继续在备考计划中勾选。</p><button class="soft-btn" data-action="open-plan" data-course="${practice.plan}">查看 ${practice.exam} 计划</button></div></aside></section>`;
};

const renderMastery = () => {
  const sortedWords = [...state.vocab].sort((first, second) => second.score - first.score);
  const count = (status) => state.vocab.filter((word) => word.status === status).length;
  app.innerHTML = `${renderPageHeader("MASTERY LIST", "看见每个词的成长。", "掌握度会随复习反馈更新，优先巩固正在形成的记忆。", `<button class="secondary-btn" data-nav="vocab">管理生词本</button>`)}
    <section class="mastery-layout"><div class="word-card-list">${sortedWords.map((word) => `<article class="mastery-card"><span class="word-initial">${word.word.charAt(0).toUpperCase()}</span><div><h3>${word.word}</h3><p>${word.meaning} · ${word.source}</p><div class="progress green"><span style="width:${word.score}%"></span></div></div><div class="mastery-right"><div class="mastery-percent">${word.score}%</div><span class="status-pill ${word.status}">${getStatusLabel(word.status)}</span></div></article>`).join("")}</div>
    <aside class="card"><span class="stat-label">当前词汇库</span><div class="mastery-number">${state.vocab.length}<small> 词</small></div><div class="section-divider"></div><div class="breakdown"><div class="breakdown-item"><span>已掌握</span><b>${count("mastered")} 个</b></div><div class="progress green"><span style="width:${state.vocab.length ? count("mastered") / state.vocab.length * 100 : 0}%"></span></div><div class="breakdown-item"><span>正在掌握</span><b>${count("mastering")} 个</b></div><div class="progress yellow"><span style="width:${state.vocab.length ? count("mastering") / state.vocab.length * 100 : 0}%"></span></div><div class="breakdown-item"><span>刚收录</span><b>${count("new")} 个</b></div><div class="progress purple"><span style="width:${state.vocab.length ? count("new") / state.vocab.length * 100 : 0}%"></span></div></div><div class="section-divider"></div><p class="muted">建议每天优先处理“正在掌握”的单词，再吸收少量新词。</p></aside></section>`;
};

const renderReview = () => {
  const items = reviewWords();
  const current = items[ui.reviewIndex % Math.max(items.length, 1)];
  app.innerHTML = `<section class="review-layout"><div class="review-top"><p class="eyebrow">SMART REVIEW</p><h1>复习，让记忆留下来。</h1><p class="page-subtitle">根据你刚才的感受，选择最接近的一项。</p></div>${current ? `<div class="review-word-card"><span class="word">${current.word}</span><span class="phonetic">${current.phonetic}</span><span class="review-answer ${ui.answerVisible ? "" : "hidden"}">${current.meaning}</span><button class="soft-btn ${ui.answerVisible ? "hidden" : ""}" data-action="show-answer">显示释义</button></div><div class="review-actions"><button class="rating-btn hard" data-action="rate-review" data-rating="hard">有点模糊<br><small>明天再见</small></button><button class="rating-btn good" data-action="rate-review" data-rating="good">记得<br><small>3 天后复习</small></button><button class="rating-btn easy" data-action="rate-review" data-rating="easy">很熟悉<br><small>7 天后复习</small></button></div><p class="review-count">本轮第 ${ui.reviewIndex + 1} / ${items.length} 个词</p>` : `<div class="empty-state"><strong>今天的复习已完成</strong>去生词本收录一些新词，或明天再回来看看。</div>`}</section>`;
};

const renderVocab = () => {
  const vocab = [...state.vocab].sort((first, second) => second.added.localeCompare(first.added));
  app.innerHTML = `${renderPageHeader("VOCABULARY NOTEBOOK", "把遇见的词收进来。", "来自课程和听读时的积累，会成为你自己的词汇库。", `<div class="date-note">已收录 ${state.vocab.length} 个词</div>`)}
    <section class="vocab-layout"><div class="vocab-table">${vocab.length ? vocab.map((word) => `<article class="vocab-row"><div class="vocab-word"><strong>${word.word}</strong><small>${word.phonetic || "未填写音标"}</small></div><span class="vocab-definition">${word.meaning}</span><span class="status-pill ${word.status}">${getStatusLabel(word.status)}</span><span class="word-tools"><button title="朗读" data-action="speak" data-text="${word.word}">◖</button><button title="删除" data-action="delete-word" data-word-id="${word.id}">×</button></span></article>`).join("") : `<div class="empty-state"><strong>生词本还是空的</strong>从课程页收录，或用右侧表单手动添加。</div>`}</div>
    <aside class="card"><div class="card-head"><h2>收录新词</h2><span>＋</span></div><form class="add-word-form" data-form="add-word"><label class="field-label">英文词或短语<input class="text-input" name="word" required placeholder="例如 remarkable" /></label><label class="field-label">中文释义<input class="text-input" name="meaning" required placeholder="例如 值得注意的；非凡的" /></label><label class="field-label">音标（可选）<input class="text-input" name="phonetic" placeholder="/rɪˈmɑːkəbl/" /></label><label class="field-label">来源<select class="select-input" name="source"><option>手动收录</option><option>阅读听力</option><option>新概念英语</option><option>剑桥考试</option></select></label><button class="primary-btn" type="submit">收录到生词本</button></form><p class="vocab-hint">小提示：只收录真正影响理解或值得复用的词。少而常见，比囤积更有效。</p></aside></section>`;
};

const renderInsights = () => {
  const days = [6, 5, 4, 3, 2, 1, 0].map((offset) => ({ date: dateKey(-offset), minutes: state.minutes?.[dateKey(-offset)] || 0 }));
  const totalWeek = days.reduce((sum, day) => sum + day.minutes, 0);
  const maxMinutes = Math.max(...days.map((day) => day.minutes), 1);
  const totalSessions = state.sessions.filter((session) => session.completed).length;
  const studiedDays = days.filter((day) => day.minutes > 0).length;
  const skills = [{ name: "课程", value: 62, style: "" }, { name: "听力", value: 48, style: "purple" }, { name: "复习", value: 73, style: "green" }, { name: "阅读", value: 38, style: "" }];
  app.innerHTML = `${renderPageHeader("LEARNING INSIGHTS", "每一段投入，都有回响。", "把注意力放在规律和趋势上，而不是某一天的完美。", `<div class="date-note">近 7 天</div>`)}
    <section class="stats-row"><div class="stat-card green"><span class="stat-label">近七日学习</span><span class="stat-number">${totalWeek}<small>分钟</small></span><div class="stat-foot">${studiedDays} 天都有学习记录</div></div><div class="stat-card orange"><span class="stat-label">连续学习</span><span class="stat-number">${getStreak()}<small>天</small></span><div class="stat-foot orange-text">稳定比冲刺更重要</div></div><div class="stat-card purple"><span class="stat-label">听读完成</span><span class="stat-number">${totalSessions}<small>次</small></span><div class="stat-foot">真实材料正在建立语感</div></div></section>
    <section class="insight-grid"><div class="card"><div class="card-head"><h2>近七日学习时长</h2><span class="muted">总计 ${totalWeek} 分钟</span></div><div class="heatmap">${days.map((day) => `<div class="day-cell"><div class="day-name">${new Intl.DateTimeFormat("zh-CN", { weekday: "narrow" }).format(new Date(`${day.date}T12:00:00`))}</div><div class="day-bar-wrap"><div class="day-bar" style="height:${Math.max(9, day.minutes / maxMinutes * 100)}%; opacity:${.48 + day.minutes / Math.max(maxMinutes, 1) * .52}"></div></div><div class="day-minutes">${day.minutes}m</div></div>`).join("")}</div></div><div class="card"><div class="card-head"><h2>技能投入</h2><span class="muted">本周</span></div>${skills.map((skill) => `<div class="skill-row"><span>${skill.name}</span><div class="skill-progress ${skill.style}"><i style="width:${skill.value}%"></i></div><b>${skill.value}%</b></div>`).join("")}<div class="section-divider"></div><div class="metric-stack"><div class="metric-box"><span class="metric-icon">✦</span><span><strong>${state.vocab.filter((word) => word.status === "mastered").length} 个</strong><small>已掌握单词</small></span></div><div class="metric-box"><span class="metric-icon">▤</span><span><strong>${state.courses.reduce((sum, course) => sum + course.completed, 0)} 节</strong><small>累计完成课程</small></span></div></div></div></section>`;
};

const pageRenderers = { today: renderToday, courses: renderCourses, study: renderStudy, plans: renderPlan, resources: renderResources, practice: renderPractice, mastery: renderMastery, review: renderReview, vocab: renderVocab, insights: renderInsights };
const render = () => {
  pageRenderers[state.currentPage]?.();
  document.querySelectorAll("[data-nav]").forEach((button) => button.classList.toggle("active", button.dataset.nav === state.currentPage || (state.currentPage === "study" && button.dataset.nav === "courses") || (state.currentPage === "practice" && button.dataset.nav === "resources")));
  const reviewBadge = document.querySelector("#review-badge");
  if (reviewBadge) reviewBadge.textContent = reviewWords().length;
  app.focus({ preventScroll: true });
};

const navigate = (page) => { state.currentPage = page; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); };

const completeTask = (id) => {
  if (!state.completedTasks.includes(id)) state.completedTasks.push(id);
};

const toggleTask = (id) => {
  if (state.completedTasks.includes(id)) { state.completedTasks = state.completedTasks.filter((taskId) => taskId !== id); showToast("任务已恢复为未完成"); }
  else { state.completedTasks.push(id); addMinutes(id === "listening" ? 15 : 8); showToast("任务完成，继续保持！"); }
  save(); render();
};

const speak = (content) => {
  if (!window.speechSynthesis) { showToast("当前浏览器暂不支持朗读功能"); return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = "en-US";
  utterance.rate = .85;
  window.speechSynthesis.speak(utterance);
};

const addCourseWord = (wordText) => {
  const course = getCourse(state.activeCourse);
  const word = course.words.find((item) => item.word === wordText);
  if (!word) return;
  if (state.vocab.some((item) => item.word.toLowerCase() === word.word.toLowerCase())) { showToast("这个词已经在生词本里了"); return; }
  state.vocab.unshift({ id: `v${Date.now()}`, ...word, source: course.title, status: "new", score: 30, added: dateKey() });
  save(); showToast(`已收录 “${word.word}”`); render();
};

const completeLesson = (courseId) => {
  const course = getCourse(courseId);
  const increment = 100 / course.total;
  course.progress = clamp(course.progress + increment, 0, 100);
  course.completed = clamp(course.completed + 1, 0, course.total);
  completeTask("course");
  addMinutes(12);
  save();
  showToast("本课完成！课程进度和学习时长已更新。");
  render();
};

const completePlanWeek = (planId, weekIndex) => {
  const completed = state.planCompletedWeeks[planId] || [];
  if (completed.includes(weekIndex)) {
    state.planCompletedWeeks[planId] = completed.filter((week) => week !== weekIndex);
    showToast("本周计划已恢复为进行中。");
  } else {
    state.planCompletedWeeks[planId] = [...completed, weekIndex].sort((first, second) => first - second);
    addMinutes(examPlans[planId].weeklyMinutes);
    completeTask("course");
    showToast("本周计划已达标，学习时长已记入成长分析！");
  }
  save();
  render();
};

const submitPractice = (form) => {
  const practice = getPractice(form.dataset.practice);
  const answers = practice.questions.map((_, index) => form.querySelector(`input[name="practice-q-${index}"]:checked`));
  if (answers.some((answer) => !answer)) { showToast("请完成全部题目后再提交"); return; }
  const rawScore = answers.reduce((total, answer, index) => total + (Number(answer.value) === practice.questions[index].answer ? 1 : 0), 0);
  const previous = state.practiceResults[practice.id];
  const score = Math.max(rawScore, previous?.score || 0);
  const completed = score === practice.questions.length;
  state.practiceResults[practice.id] = { score, total: practice.questions.length, completed, date: dateKey() };
  let checkedInNow = false;
  if (completed && !previous?.completed) {
    state.sessions.unshift({ id: `s${Date.now()}`, resourceId: practice.id, date: dateKey(), minutes: practice.minutes, completed: true });
    addMinutes(practice.minutes);
    completeTask("listening");
  }
  if (completed && !state.checkins.includes(dateKey())) {
    state.checkins.push(dateKey());
    checkedInNow = true;
  }
  save();
  showToast(completed ? `训练完成！${checkedInNow ? "今日已同步打卡，" : ""}学习时长已计入成长分析。` : `答对 ${score}/${practice.questions.length} 题，再听一遍试试。`);
  render();
};

const rateReview = (rating) => {
  const items = reviewWords();
  const current = items[ui.reviewIndex % Math.max(items.length, 1)];
  if (!current) return;
  const adjustments = { hard: -8, good: 13, easy: 25 };
  current.score = clamp(current.score + adjustments[rating], 10, 100);
  current.status = statusFromScore(current.score);
  completeTask("review");
  addMinutes(2);
  const remainingItems = reviewWords();
  if (current.status === "mastered") ui.reviewIndex = Math.min(ui.reviewIndex, Math.max(remainingItems.length - 1, 0));
  else ui.reviewIndex = (ui.reviewIndex + 1) % Math.max(remainingItems.length, 1);
  ui.answerVisible = false;
  save();
  showToast(rating === "easy" ? "很好，这个词的掌握度提升了。" : "复习反馈已记录。");
  render();
};

const checkQuiz = () => {
  const selected = document.querySelector('input[name="quiz-answer"]:checked');
  if (!selected) { showToast("先选择一个答案吧"); return; }
  showToast(selected.value === "a" ? "回答正确！这是一句自然的购物场景表达。" : "再想一想，注意问句与回答的语境。" );
};

document.addEventListener("click", (event) => {
  const navTarget = event.target.closest("[data-nav]");
  if (navTarget) { navigate(navTarget.dataset.nav); return; }
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const { action } = trigger.dataset;
  if (action === "checkin") {
    if (state.checkins.includes(dateKey())) { showToast("今天已经打过卡了，继续完成任务吧！"); return; }
    state.checkins.push(dateKey()); addMinutes(1); save(); showToast("打卡成功！连续学习记录已更新。"); render();
  }
  if (action === "toggle-task") toggleTask(trigger.dataset.task);
  if (action === "continue-course") navigate("study");
  if (action === "filter-course") { ui.courseFilter = trigger.dataset.filter; render(); }
  if (action === "set-course") { state.activeCourse = trigger.dataset.course; save(); showToast("已设为当前学习课程"); render(); }
  if (action === "start-course") { state.activeCourse = trigger.dataset.course; save(); navigate("study"); }
  if (action === "open-plan") { state.activePlan = trigger.dataset.course; state.activeCourse = trigger.dataset.course; save(); navigate("plans"); }
  if (action === "select-plan") { state.activePlan = trigger.dataset.plan; state.activeCourse = trigger.dataset.plan; save(); render(); }
  if (action === "complete-plan-week") completePlanWeek(trigger.dataset.plan, Number(trigger.dataset.week));
  if (action === "study-tab") { ui.studyTab = trigger.dataset.tab; render(); }
  if (action === "speak") speak(trigger.dataset.text);
  if (action === "speak-practice") { const practice = getPractice(trigger.dataset.practice); speak(practice.script); }
  if (action === "toggle-transcript") { ui.transcriptVisible = !ui.transcriptVisible; render(); }
  if (action === "add-course-word") addCourseWord(trigger.dataset.word);
  if (action === "complete-lesson") completeLesson(trigger.dataset.course);
  if (action === "filter-resource") { ui.resourceFilter = trigger.dataset.filter; render(); }
  if (action === "start-practice") { state.activePractice = trigger.dataset.practice; ui.transcriptVisible = false; save(); navigate("practice"); }
  if (action === "show-answer") { ui.answerVisible = true; render(); }
  if (action === "rate-review") rateReview(trigger.dataset.rating);
  if (action === "check-quiz") checkQuiz();
  if (action === "delete-word") {
    state.vocab = state.vocab.filter((word) => word.id !== trigger.dataset.wordId);
    save(); showToast("已从生词本移除"); render();
  }
});

document.addEventListener("submit", (event) => {
  const practiceForm = event.target.closest('[data-form="practice"]');
  if (practiceForm) {
    event.preventDefault();
    submitPractice(practiceForm);
    return;
  }
  const form = event.target.closest('[data-form="add-word"]');
  if (!form) return;
  event.preventDefault();
  const formData = new FormData(form);
  const word = String(formData.get("word") || "").trim();
  if (state.vocab.some((item) => item.word.toLowerCase() === word.toLowerCase())) { showToast("这个词已经收录过了"); return; }
  state.vocab.unshift({ id: `v${Date.now()}`, word, meaning: String(formData.get("meaning") || "").trim(), phonetic: String(formData.get("phonetic") || "").trim(), source: String(formData.get("source") || "手动收录"), status: "new", score: 25, added: dateKey() });
  save(); showToast(`“${word}” 已收录到生词本`); render();
});

render();
