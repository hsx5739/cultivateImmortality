"use strict";

const wellnessApp = (() => {
  /**
   * @typedef {"身体唤醒类"|"呼吸调节类"|"饮食节律类"|"情绪修复类"|"环境整理类"} WellnessCategory
   */

  /**
   * @typedef {Object} WellnessTask
   * @property {string} id
   * @property {string} title
   * @property {string} description
    * @property {WellnessCategory} category
    * @property {number} reward
   * @property {number} penalty
   * @property {boolean} completed
   */

  /**
   * @typedef {Object} EncouragementLine
   * @property {string} id
   * @property {string} text
   */

  /**
   * @typedef {Object} LevelThreshold
   * @property {string} id
   * @property {string} name
   * @property {number} threshold
   */

  const CATEGORY_CONFIG = /** @type {{category: WellnessCategory, titles: string[], descriptions: string[]}[]} */ ([
    {
      category: "身体唤醒类",
      titles: [
        "晨起舒肩八次",
        "站立抻展两分钟",
        "转动脚踝一圈",
        "轻拍手臂唤醒身体",
        "缓慢扭腰十二下",
        "离开座位走一走",
        "靠墙舒展脊背",
        "垫脚提踵十次",
        "伸展手指与手腕",
        "转转颈肩卸下僵硬",
        "晒三分钟自然光",
        "站姿深呼吸并抬臂",
        "收腹挺背坐正一分钟",
        "轻摆双臂醒神",
        "散步到窗边看看远处",
        "活动膝盖十次",
        "轻握拳再放松",
        "舒展胸口缓一缓",
        "走到阳台感受风",
        "缓慢蹲起五次"
      ],
      descriptions: [
        "让久坐的身体先回一点热度。",
        "用温和的动作把注意力带回自己。",
        "只做小幅度活动，也算认真照顾今天。",
        "给肩颈一点松动空间，状态会更清一点。",
        "先活动一处，身体就会慢慢跟上节奏。"
      ]
    },
    {
      category: "呼吸调节类",
      titles: [
        "闭眼缓息三十秒",
        "做一次四拍吸气",
        "轻轻吐尽一口气",
        "数四次平稳呼吸",
        "鼻吸口呼一分钟",
        "将呼吸放慢一点",
        "掌心覆在心口呼吸",
        "对着窗边缓慢吸气",
        "深呼吸后慢慢放松肩膀",
        "给自己一段安静换气",
        "吸气时数到四",
        "吐气时把眉心放松",
        "沉下肩颈做两轮呼吸",
        "把节奏调到柔和档位",
        "呼吸时感受腹部起伏",
        "给忙碌的大脑降速",
        "停下三十秒听听呼吸",
        "做一轮缓慢腹式呼吸",
        "把气息送到背部",
        "轻呼一口浊气"
      ],
      descriptions: [
        "呼吸稳下来，心也会慢一点。",
        "不必追求标准，只要比刚才更平和。",
        "先照顾气息，再去照顾别的事情。",
        "今天不急，先给自己留一口松气。",
        "一轮轻呼吸，也能把人接回来。"
      ]
    },
    {
      category: "饮食节律类",
      titles: [
        "晨起饮一杯温水",
        "饭前暂停深呼吸",
        "给自己倒一杯热水",
        "慢慢喝下半杯水",
        "准备一份清爽水果",
        "吃东西前先坐稳",
        "为午后补一口温水",
        "把水杯续满",
        "放慢第一口进食速度",
        "吃饭前先放下手机",
        "给身体一口温润",
        "认真咀嚼三次",
        "替下午准备一份轻食",
        "喝水时停一停想想自己",
        "看一眼今天的饮水量",
        "饭后坐直一分钟",
        "把零食换成温和选项",
        "提醒自己按时吃饭",
        "留一口热饮给此刻",
        "用温水唤醒胃口"
      ],
      descriptions: [
        "饮食节律稳一点，整个人会更安稳。",
        "先把身体照顾好，别的事再慢慢来。",
        "一杯温水也是一种认真生活。",
        "给自己一点温润，比催促更有效。",
        "吃和喝都慢一点，今天就顺一点。"
      ]
    },
    {
      category: "情绪修复类",
      titles: [
        "对自己说一句辛苦了",
        "写下一句现在的心情",
        "看看窗外一分钟",
        "把手放心口安静片刻",
        "允许自己短暂停一下",
        "感谢身体还在努力",
        "给自己一句不责备的话",
        "闭眼听环境的声音",
        "回想今天一件顺利小事",
        "放下眉间的紧绷",
        "对今天说一句慢慢来",
        "把情绪写成一个词",
        "给自己一个柔和评价",
        "想想此刻最需要什么",
        "停一下再继续忙碌",
        "伸手抱抱现在的自己",
        "把心情交给一口气",
        "允许自己不必完美",
        "承认自己已经很努力",
        "给疲惫一个出口"
      ],
      descriptions: [
        "情绪被看见一点，人就轻一点。",
        "不需要解决全部，只要先陪住自己。",
        "温和地承认此刻，也是修复的一部分。",
        "先把心接住，再决定下一步。",
        "今天的你已经很认真了。"
      ]
    },
    {
      category: "环境整理类",
      titles: [
        "整理桌面一个角落",
        "收起一件散落物品",
        "擦一擦水杯边缘",
        "把椅背扶正",
        "清走桌面废纸",
        "给书本排整齐",
        "整理一下包里的小物",
        "把充电线绕好",
        "给工作台留出空位",
        "收纳一件衣物",
        "清一清屏幕灰尘",
        "把常用物品归位",
        "倒掉已经放凉的水",
        "替桌边留一点空白",
        "把窗边擦拭一下",
        "整理抽屉最上层",
        "把耳机轻轻收好",
        "清空一个小垃圾",
        "把便签重新排整齐",
        "为自己整理一个呼吸角"
      ],
      descriptions: [
        "环境轻一点，心绪也会跟着松一点。",
        "先整理一个角落，就已经很有进展。",
        "外部变清爽，内部也会慢慢安定。",
        "不需要大扫除，一个小动作就够了。",
        "给空间一点秩序，也是在给自己留余地。"
      ]
    }
  ]);

  const ENCOURAGEMENT_LIBRARY = Object.freeze([
    { id: "enc-01", text: "你已经在照顾自己了，这很重要。" },
    { id: "enc-02", text: "今天不必很满，慢慢养回来就好。" },
    { id: "enc-03", text: "每完成一个小动作，元气都会回来一点。" },
    { id: "enc-04", text: "你的身体正在认真回应这些善意。" },
    { id: "enc-05", text: "先把这一件小事做好，今天就有收获。" },
    { id: "enc-06", text: "不用急着变好，先轻轻稳住自己。" },
    { id: "enc-07", text: "此刻愿意停下来，已经很有力量。" },
    { id: "enc-08", text: "元气不是猛冲回来，而是一点点回温。" },
    { id: "enc-09", text: "你给自己的照顾，会被身体慢慢记住。" },
    { id: "enc-10", text: "哪怕只完成一件，也是在往前走。" },
    { id: "enc-11", text: "先松一点，今天就会顺一点。" },
    { id: "enc-12", text: "你不需要完美，只需要继续温柔地照顾自己。" },
    { id: "enc-13", text: "每一次停下来调整，都是在蓄积更稳的元气。" },
    { id: "enc-14", text: "灵使在这里陪你把今天养回来。" }
  ]);

  const LEVEL_THRESHOLDS = Object.freeze([
    { id: "lv-1", name: "养元一阶", threshold: 0 },
    { id: "lv-2", name: "养元二阶", threshold: 60 },
    { id: "lv-3", name: "养元三阶", threshold: 140 },
    { id: "lv-4", name: "养元四阶", threshold: 240 },
    { id: "lv-5", name: "养元五阶", threshold: 360 }
  ]);

  const COMPANION_STATES = Object.freeze({
    idle: "idle",
    verifying: "verifying",
    success: "success",
    fail: "fail",
    waiting: "waiting"
  });

  const MOTION_CONFIG = Object.freeze({
    sampleWidth: 96,
    sampleHeight: 72,
    intervalMs: 200,
    durationMs: 3200,
    brightnessDelta: 28,
    changedPixelsThreshold: 150,
    burstsRequired: 5
  });

  /** @returns {WellnessTask[]} */
  function createTaskLibrary() {
    /** @type {WellnessTask[]} */
    const tasks = [];

    CATEGORY_CONFIG.forEach((config, categoryIndex) => {
      config.titles.forEach((title, index) => {
        const description = config.descriptions[index % config.descriptions.length];
        tasks.push({
          id: `task-${categoryIndex + 1}-${String(index + 1).padStart(2, "0")}`,
          title,
          description,
          category: config.category,
          reward: 8 + ((index + categoryIndex) % 6) * 2,
          penalty: 4 + ((index + categoryIndex) % 4) * 2,
          completed: false
        });
      });
    });

    return tasks;
  }

  const WELLNESS_TASK_LIBRARY = createTaskLibrary();

  if (WELLNESS_TASK_LIBRARY.length !== 100) {
    throw new Error("Task library must contain exactly 100 tasks.");
  }

  if (ENCOURAGEMENT_LIBRARY.length < 12 || ENCOURAGEMENT_LIBRARY.length > 20) {
    throw new Error("Encouragement library must contain 12 to 20 lines.");
  }

  const state = {
    score: 0,
    encouragementIndex: 0,
    tasks: WELLNESS_TASK_LIBRARY.map((task) => ({ ...task })),
    feedbackLog: ["灵使已备好今日修习，先完成一件小事吧。"],
    toastMessage: "完成任务前需要通过摄像头验证动作。",
    companionState: COMPANION_STATES.idle,
    persistence: {
      hydrated: false,
      saving: false
    },
    camera: {
      stream: null,
      active: false,
      isVerifying: false,
      currentTaskId: "",
      statusTitle: "等待摄像头授权",
      statusDetail: "点击任务后会启动动作验证，检测到明显动作才会计入完成。",
      overlayText: "等待动作验证",
      targetLabel: "当前未选择任务",
      progressRatio: 0,
      motionBursts: 0,
      lastFrame: null,
      intervalId: 0,
      timeoutId: 0
    }
  };

  const cameraAnalyzer = {
    canvas: null,
    context: null
  };

  const dom = {
    currentLevel: null,
    currentScore: null,
    encouragementText: null,
    progressFill: null,
    nextLevelName: null,
    nextLevelGap: null,
    levelMessage: null,
    taskList: null,
    feedbackToast: null,
    feedbackLog: null,
    ambientPulse: null,
    cameraPreview: null,
    cameraPlaceholder: null,
    cameraOverlay: null,
    cameraStatusTitle: null,
    cameraStatusDetail: null,
    cameraTarget: null,
    verificationProgressFill: null,
    startCameraButton: null,
    stopCameraButton: null,
    refreshEncouragementButton: null,
    companionVisual: null
  };

  function getVisibleTasks(tasks) {
    const incomplete = tasks.filter((task) => !task.completed);
    const source = incomplete.length >= 6 ? incomplete : tasks;
    return source.slice(0, 6);
  }

  function getCurrentLevel(score) {
    return LEVEL_THRESHOLDS.reduce((current, level) => (
      score >= level.threshold ? level : current
    ), LEVEL_THRESHOLDS[0]);
  }

  function getNextLevel(score) {
    return LEVEL_THRESHOLDS.find((level) => level.threshold > score) || null;
  }

  function getProgressRatio(score) {
    const currentLevel = getCurrentLevel(score);
    const nextLevel = getNextLevel(score);

    if (!nextLevel) {
      return 100;
    }

    const span = nextLevel.threshold - currentLevel.threshold;
    const progress = score - currentLevel.threshold;
    return Math.max(0, Math.min(100, (progress / span) * 100));
  }

  function advanceEncouragement(step) {
    state.encouragementIndex = (state.encouragementIndex + step + ENCOURAGEMENT_LIBRARY.length) % ENCOURAGEMENT_LIBRARY.length;
    return ENCOURAGEMENT_LIBRARY[state.encouragementIndex];
  }

  function setCompanionState(nextState) {
    state.companionState = nextState;
    if (!dom.companionVisual) {
      return;
    }

    dom.companionVisual.classList.remove(
      "companion-state-idle",
      "companion-state-waiting",
      "companion-state-verifying",
      "companion-state-success",
      "companion-state-fail"
    );
    dom.companionVisual.classList.add(`companion-state-${nextState}`);
  }

  function validateContent() {
    const categories = new Set(WELLNESS_TASK_LIBRARY.map((task) => task.category));
    return {
      taskCount: WELLNESS_TASK_LIBRARY.length,
      encouragementCount: ENCOURAGEMENT_LIBRARY.length,
      levelCount: LEVEL_THRESHOLDS.length,
      categories: Array.from(categories),
      visibleTaskCount: getVisibleTasks(WELLNESS_TASK_LIBRARY).length,
      cameraVerification: true
    };
  }

  function buildProgressPayload() {
    return {
      score: state.score,
      encouragementIndex: state.encouragementIndex,
      completedTaskIds: state.tasks.filter((task) => task.completed).map((task) => task.id)
    };
  }

  function applyPersistedProgress(progress) {
    const completedTaskIds = new Set(Array.isArray(progress.completedTaskIds) ? progress.completedTaskIds : []);
    state.score = Number.isFinite(progress.score) ? Math.max(0, Math.floor(progress.score)) : 0;
    state.encouragementIndex = Number.isFinite(progress.encouragementIndex)
      ? Math.max(0, Math.floor(progress.encouragementIndex)) % ENCOURAGEMENT_LIBRARY.length
      : 0;
    state.tasks = WELLNESS_TASK_LIBRARY.map((task) => ({
      ...task,
      completed: completedTaskIds.has(task.id)
    }));
  }

  async function loadProgress() {
    try {
      const response = await fetch("/api/progress", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Load failed with status ${response.status}`);
      }

      const progress = await response.json();
      applyPersistedProgress(progress);
      state.toastMessage = "已从后端恢复上次修炼进度。";
      appendFeedback("系统已恢复你上一次保存的修炼记录。");
    } catch (error) {
      state.toastMessage = "未能从后端恢复进度，本次将使用默认初始状态。";
      appendFeedback("后端进度读取失败，当前使用默认初始进度。");
    } finally {
      state.persistence.hydrated = true;
    }
  }

  async function saveProgress(reason) {
    if (!state.persistence.hydrated) {
      return;
    }

    state.persistence.saving = true;
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(buildProgressPayload())
      });

      if (!response.ok) {
        throw new Error(`Save failed with status ${response.status}`);
      }

      await response.json();
      if (reason) {
        appendFeedback(`系统已保存当前进度：${reason}。`);
      }
    } catch (error) {
      state.toastMessage = "后端保存失败，本次进度还没有成功持久化。";
      appendFeedback("后端保存失败，刷新页面前请注意当前进度可能会丢失。");
      render();
      pulseToast();
    } finally {
      state.persistence.saving = false;
    }
  }

  function appendFeedback(message) {
    state.feedbackLog = [message, ...state.feedbackLog].slice(0, 4);
  }

  function setCameraStatus(title, detail, overlayText) {
    state.camera.statusTitle = title;
    state.camera.statusDetail = detail;
    state.camera.overlayText = overlayText;
  }

  function isCameraSupported() {
    return typeof navigator !== "undefined"
      && !!navigator.mediaDevices
      && typeof navigator.mediaDevices.getUserMedia === "function";
  }

  function isSecureCameraContext() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.isSecureContext
      || window.location.hostname === "localhost"
      || window.location.hostname === "127.0.0.1";
  }

  function getTaskById(taskId) {
    return state.tasks.find((task) => task.id === taskId) || null;
  }

  function render() {
    if (typeof document === "undefined") {
      return;
    }

    const encouragement = ENCOURAGEMENT_LIBRARY[state.encouragementIndex];
    const currentLevel = getCurrentLevel(state.score);
    const nextLevel = getNextLevel(state.score);
    const visibleTasks = getVisibleTasks(state.tasks);

    dom.currentLevel.textContent = currentLevel.name;
    dom.currentScore.textContent = String(state.score);
    dom.encouragementText.textContent = encouragement.text;
    dom.progressFill.style.width = `${getProgressRatio(state.score)}%`;
    dom.nextLevelName.textContent = nextLevel ? nextLevel.name : "已达最高境界";
    dom.nextLevelGap.textContent = nextLevel
      ? `还差 ${nextLevel.threshold - state.score} 点养元值`
      : "已达当前演示最高阶";
    dom.levelMessage.textContent = nextLevel
      ? `${currentLevel.name}正在稳步累积，向${nextLevel.name}继续靠近。`
      : "你已经抵达当前演示版的最高境界，灵息充盈。";

    dom.taskList.innerHTML = visibleTasks.map((task) => {
      const isVerifyingCurrent = state.camera.isVerifying && state.camera.currentTaskId === task.id;
      const disabled = task.completed || state.camera.isVerifying;
      const label = task.completed
        ? "已修习"
        : isVerifyingCurrent
          ? "验证中..."
          : "开始验证";

      return `
        <article class="task-card ${task.completed ? "is-complete" : ""}">
          <div>
            <p class="task-system-label">系统发布 · ${task.category}</p>
            <div class="task-title-row">
              <h3 class="task-title">《${task.title}》</h3>
              <span class="reward-tag">完成奖励 +${task.reward}</span>
              <span class="penalty-tag">失败惩罚 -${task.penalty}</span>
              ${task.completed ? '<span class="status-tag">已完成</span>' : ""}
            </div>
            <p class="task-description">任务目标：${task.description}</p>
          </div>
          <button class="task-action ${isVerifyingCurrent ? "is-verifying" : ""}" type="button" data-task-id="${task.id}" ${disabled ? "disabled" : ""}>
            ${label}
          </button>
        </article>
      `;
    }).join("");

    dom.feedbackToast.textContent = state.toastMessage;
    dom.feedbackLog.innerHTML = state.feedbackLog.map((item) => `<li>${item}</li>`).join("");
    dom.ambientPulse.textContent = state.camera.isVerifying ? "动作识别中" : dom.ambientPulse.textContent;

    dom.cameraStatusTitle.textContent = state.camera.statusTitle;
    dom.cameraStatusDetail.textContent = state.camera.statusDetail;
    dom.cameraOverlay.textContent = state.camera.overlayText;
    dom.cameraTarget.textContent = state.camera.targetLabel;
    dom.verificationProgressFill.style.width = `${state.camera.progressRatio}%`;
    dom.stopCameraButton.disabled = !state.camera.active;

    if (state.camera.active) {
      dom.cameraPreview.classList.add("is-visible");
      dom.cameraPlaceholder.classList.add("is-hidden");
      dom.startCameraButton.textContent = "重新开启摄像头";
    } else {
      dom.cameraPreview.classList.remove("is-visible");
      dom.cameraPlaceholder.classList.remove("is-hidden");
      dom.startCameraButton.textContent = "开启摄像头";
    }

    setCompanionState(state.companionState);
  }

  function pulseToast() {
    if (!dom.feedbackToast) {
      return;
    }

    dom.feedbackToast.classList.add("is-active");
    window.clearTimeout(pulseToast.timer);
    pulseToast.timer = window.setTimeout(() => {
      dom.feedbackToast.classList.remove("is-active");
    }, 360);
  }
  pulseToast.timer = 0;

  function animateEncouragementRefresh() {
    if (!dom.encouragementText) {
      return;
    }

    dom.encouragementText.classList.add("is-refreshing");
    window.setTimeout(() => {
      dom.encouragementText.classList.remove("is-refreshing");
    }, 220);
  }

  function updateAmbientPulse(message) {
    if (dom.ambientPulse) {
      dom.ambientPulse.textContent = message;
    }
  }

  async function startCamera() {
    if (!isCameraSupported()) {
      setCameraStatus(
        "当前环境不支持摄像头",
        "浏览器未提供 getUserMedia，无法进行动作验证。",
        "无法使用摄像头"
      );
      state.toastMessage = "当前浏览器不支持摄像头验证。";
      setCompanionState(COMPANION_STATES.fail);
      render();
      pulseToast();
      return false;
    }

    if (!isSecureCameraContext()) {
      setCameraStatus(
        "需要安全环境",
        "请通过 localhost 或 https 打开页面，浏览器才会允许摄像头验证。",
        "请在安全环境下使用"
      );
      state.toastMessage = "摄像头验证需要在 localhost 或 https 环境中使用。";
      setCompanionState(COMPANION_STATES.fail);
      render();
      pulseToast();
      return false;
    }

    stopCameraTracks();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      state.camera.stream = stream;
      state.camera.active = true;
      dom.cameraPreview.srcObject = stream;
      await dom.cameraPreview.play();

      setCameraStatus(
        "摄像头已准备好",
        "点击任一系统任务即可进入动作验证，检测到明显动作后才会完成。",
        "镜头待命中"
      );
      state.toastMessage = "摄像头已开启，可以开始动作验证。";
      state.camera.targetLabel = "当前未选择任务";
      state.camera.progressRatio = 0;
      state.camera.lastFrame = null;
      setCompanionState(COMPANION_STATES.waiting);
      render();
      pulseToast();
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "无法访问摄像头。";
      setCameraStatus(
        "未获得摄像头权限",
        `浏览器未允许摄像头访问：${message}`,
        "等待权限授权"
      );
      state.toastMessage = "摄像头未开启，任务无法直接完成。";
      appendFeedback("未获得摄像头权限，动作验证尚未开始。");
      setCompanionState(COMPANION_STATES.fail);
      render();
      pulseToast();
      return false;
    }
  }

  function stopCameraTracks() {
    if (state.camera.stream) {
      state.camera.stream.getTracks().forEach((track) => track.stop());
      state.camera.stream = null;
    }

    state.camera.active = false;
    state.camera.lastFrame = null;

    if (dom.cameraPreview) {
      dom.cameraPreview.pause();
      dom.cameraPreview.srcObject = null;
    }
  }

  function stopCamera() {
    clearVerificationTimers();
    stopCameraTracks();
    state.camera.currentTaskId = "";
    state.camera.isVerifying = false;
    state.camera.motionBursts = 0;
    state.camera.progressRatio = 0;
    setCameraStatus(
      "摄像头已关闭",
      "重新开启摄像头后，才能继续验证任务动作。",
      "镜头已关闭"
    );
    state.camera.targetLabel = "当前未选择任务";
    state.toastMessage = "摄像头已关闭。";
    updateAmbientPulse("灵息安定");
    setCompanionState(COMPANION_STATES.idle);
    render();
  }

  function clearVerificationTimers() {
    if (state.camera.intervalId) {
      window.clearInterval(state.camera.intervalId);
      state.camera.intervalId = 0;
    }

    if (state.camera.timeoutId) {
      window.clearTimeout(state.camera.timeoutId);
      state.camera.timeoutId = 0;
    }
  }

  function getAnalyzerContext() {
    if (!cameraAnalyzer.canvas) {
      cameraAnalyzer.canvas = document.createElement("canvas");
      cameraAnalyzer.canvas.width = MOTION_CONFIG.sampleWidth;
      cameraAnalyzer.canvas.height = MOTION_CONFIG.sampleHeight;
      cameraAnalyzer.context = cameraAnalyzer.canvas.getContext("2d", { willReadFrequently: true });
    }

    return cameraAnalyzer.context;
  }

  function readMotionBurst() {
    const context = getAnalyzerContext();
    if (!context || !dom.cameraPreview || dom.cameraPreview.readyState < 2) {
      return false;
    }

    context.drawImage(dom.cameraPreview, 0, 0, MOTION_CONFIG.sampleWidth, MOTION_CONFIG.sampleHeight);
    const imageData = context.getImageData(0, 0, MOTION_CONFIG.sampleWidth, MOTION_CONFIG.sampleHeight).data;
    const currentFrame = [];

    for (let index = 0; index < imageData.length; index += 16) {
      const brightness = Math.round(
        imageData[index] * 0.299
        + imageData[index + 1] * 0.587
        + imageData[index + 2] * 0.114
      );
      currentFrame.push(brightness);
    }

    if (!state.camera.lastFrame) {
      state.camera.lastFrame = currentFrame;
      return false;
    }

    let changedPixels = 0;
    for (let index = 0; index < currentFrame.length; index += 1) {
      if (Math.abs(currentFrame[index] - state.camera.lastFrame[index]) >= MOTION_CONFIG.brightnessDelta) {
        changedPixels += 1;
      }
    }

    state.camera.lastFrame = currentFrame;
    return changedPixels >= MOTION_CONFIG.changedPixelsThreshold;
  }

  function finishVerification(success) {
    const taskId = state.camera.currentTaskId;
    const task = getTaskById(taskId);

    clearVerificationTimers();
    state.camera.isVerifying = false;
    state.camera.currentTaskId = "";
    state.camera.lastFrame = null;
    state.camera.progressRatio = success ? 100 : 0;

    if (!task) {
      render();
      return;
    }

    if (success) {
      setCameraStatus(
        "动作验证通过",
        `已检测到明显动作，系统任务「${task.title}」可以计入完成。`,
        "验证通过"
      );
      completeTask(task.id);
      return;
    }

    setCameraStatus(
      "未检测到足够动作",
      `系统判定「${task.title}」未达成，请对着镜头做更明显的动作后重试。`,
      "请再做一次动作"
    );
    state.camera.targetLabel = `待验证任务：${task.title}`;
    state.score = Math.max(0, state.score - task.penalty);
    state.toastMessage = `系统任务失败 · 修为进度 -${task.penalty}`;
    appendFeedback(`系统裁定「${task.title}」失败，修为回退 ${task.penalty} 点。`);
    updateAmbientPulse("修为受损");
    setCompanionState(COMPANION_STATES.fail);
    render();
    animateEncouragementRefresh();
    pulseToast();
    saveProgress(`任务失败 ${task.title}`);
  }

  async function startTaskVerification(taskId) {
    const task = getTaskById(taskId);
    if (!task || task.completed || state.camera.isVerifying) {
      return;
    }

    if (!state.camera.active) {
      const opened = await startCamera();
      if (!opened) {
        return;
      }
    }

    clearVerificationTimers();
    state.camera.isVerifying = true;
    state.camera.currentTaskId = task.id;
    state.camera.motionBursts = 0;
    state.camera.progressRatio = 0;
    state.camera.lastFrame = null;
    state.camera.targetLabel = `验证任务：${task.title}`;
    setCameraStatus(
      "动作验证中",
      `请在镜头前完成系统任务「${task.title}」，系统会检测 3 秒内的明显动作变化。`,
      "请开始动作"
    );
    state.toastMessage = `系统任务发布：${task.title}`;
    updateAmbientPulse("系统审查中");
    setCompanionState(COMPANION_STATES.verifying);
    render();
    pulseToast();

    const startedAt = Date.now();
    state.camera.intervalId = window.setInterval(() => {
      if (readMotionBurst()) {
        state.camera.motionBursts += 1;
        state.camera.overlayText = `已捕捉动作 ${state.camera.motionBursts}/${MOTION_CONFIG.burstsRequired}`;
      }

      const elapsed = Date.now() - startedAt;
      state.camera.progressRatio = Math.max(0, Math.min(100, (elapsed / MOTION_CONFIG.durationMs) * 100));
      render();

      if (state.camera.motionBursts >= MOTION_CONFIG.burstsRequired) {
        finishVerification(true);
      }
    }, MOTION_CONFIG.intervalMs);

    state.camera.timeoutId = window.setTimeout(() => {
      finishVerification(state.camera.motionBursts >= MOTION_CONFIG.burstsRequired);
    }, MOTION_CONFIG.durationMs + 40);
  }

  function completeTask(taskId) {
    const task = getTaskById(taskId);
    if (!task || task.completed) {
      return;
    }

    const previousLevel = getCurrentLevel(state.score);

    task.completed = true;
    state.score += task.reward;
    const nextEncouragement = advanceEncouragement(1);
    const newLevel = getCurrentLevel(state.score);
    const leveledUp = newLevel.id !== previousLevel.id;

    state.toastMessage = leveledUp
      ? `已晋升至 ${newLevel.name} · 养元值 +${task.reward}`
      : `系统任务完成 · 修为 +${task.reward} · ${nextEncouragement.text}`;

    appendFeedback(
      leveledUp
        ? `系统确认任务完成，你已迈入${newLevel.name}。`
        : `系统确认「${task.title}」已完成，修为提升 ${task.reward} 点。`
    );

    setCameraStatus(
      leveledUp ? "动作完成并升级" : "动作完成",
      leveledUp
        ? `系统确认了「${task.title}」，你已晋升到${newLevel.name}。`
        : `系统确认了「${task.title}」，奖励已结算。`,
      leveledUp ? "境界提升" : "完成已确认"
    );
    state.camera.targetLabel = "当前未选择任务";
    updateAmbientPulse(leveledUp ? "境界提升" : "灵息回暖");
    setCompanionState(leveledUp ? COMPANION_STATES.success : COMPANION_STATES.idle);
    render();
    animateEncouragementRefresh();
    pulseToast();
    saveProgress(`任务完成 ${task.title}`);
  }

  function refreshEncouragement() {
    const next = advanceEncouragement(1);
    state.toastMessage = `灵使换了一句新的陪伴：${next.text}`;
    appendFeedback("你主动向灵使要了一句新的鼓励。");
    updateAmbientPulse("轻语流转");
    setCompanionState(COMPANION_STATES.idle);
    render();
    animateEncouragementRefresh();
    pulseToast();
    saveProgress("切换鼓励语");
  }

  function cacheDom() {
    dom.currentLevel = document.getElementById("current-level");
    dom.currentScore = document.getElementById("current-score");
    dom.encouragementText = document.getElementById("encouragement-text");
    dom.progressFill = document.getElementById("progress-fill");
    dom.nextLevelName = document.getElementById("next-level-name");
    dom.nextLevelGap = document.getElementById("next-level-gap");
    dom.levelMessage = document.getElementById("level-message");
    dom.taskList = document.getElementById("task-list");
    dom.feedbackToast = document.getElementById("feedback-toast");
    dom.feedbackLog = document.getElementById("feedback-log");
    dom.ambientPulse = document.getElementById("ambient-pulse");
    dom.cameraPreview = document.getElementById("camera-preview");
    dom.cameraPlaceholder = document.getElementById("camera-placeholder");
    dom.cameraOverlay = document.getElementById("camera-overlay");
    dom.cameraStatusTitle = document.getElementById("camera-status-title");
    dom.cameraStatusDetail = document.getElementById("camera-status-detail");
    dom.cameraTarget = document.getElementById("camera-target");
    dom.verificationProgressFill = document.getElementById("verification-progress-fill");
    dom.startCameraButton = document.getElementById("start-camera");
    dom.stopCameraButton = document.getElementById("stop-camera");
    dom.refreshEncouragementButton = document.getElementById("refresh-encouragement");
    dom.companionVisual = document.getElementById("companion-visual");
  }

  function bindEvents() {
    dom.taskList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const button = target.closest("[data-task-id]");
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      startTaskVerification(button.dataset.taskId || "");
    });

    dom.refreshEncouragementButton.addEventListener("click", refreshEncouragement);
    dom.startCameraButton.addEventListener("click", () => {
      startCamera();
    });
    dom.stopCameraButton.addEventListener("click", stopCamera);
  }

  async function init() {
    if (typeof document === "undefined") {
      return;
    }

    cacheDom();
    bindEvents();
    await loadProgress();
    render();
    pulseToast();
  }

  return {
    CATEGORY_CONFIG,
    ENCOURAGEMENT_LIBRARY,
    LEVEL_THRESHOLDS,
    WELLNESS_TASK_LIBRARY,
    getVisibleTasks,
    getCurrentLevel,
    getNextLevel,
    getProgressRatio,
    validateContent,
    init
  };
})();

if (typeof window !== "undefined") {
  window.wellnessApp = wellnessApp;
  window.addEventListener("DOMContentLoaded", wellnessApp.init);
  window.addEventListener("beforeunload", () => {
    const video = document.getElementById("camera-preview");
    if (video && video.srcObject instanceof MediaStream) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = wellnessApp;
}
