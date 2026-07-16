const MODELS = [
  {
    id: "codex",
    name: "Codex-style agent",
    provider: "OpenAI",
    strengths: ["fullstack", "debugging", "tests", "refactor", "frontend", "deployment"],
    inputCost: 1.5,
    outputCost: 6,
    quality: 89,
    speed: 84,
    easeOfUse: 92,
    reliability: 88,
    privacy: 62,
    reviewNeed: 26,
    license: "API terms",
  },
  {
    id: "claude",
    name: "Claude Code",
    provider: "Anthropic",
    strengths: ["architecture", "frontend", "reasoning", "review", "writing", "strategy"],
    inputCost: 3,
    outputCost: 15,
    quality: 93,
    speed: 72,
    easeOfUse: 84,
    reliability: 89,
    privacy: 58,
    reviewNeed: 22,
    license: "API terms",
  },
  {
    id: "qwen",
    name: "Qwen2.5-Coder",
    provider: "Open model",
    strengths: ["planning", "code", "local", "classification"],
    inputCost: 0.18,
    outputCost: 0.45,
    quality: 78,
    speed: 66,
    easeOfUse: 64,
    reliability: 72,
    privacy: 82,
    reviewNeed: 44,
    license: "Apache-2.0",
  },
  {
    id: "deepseek",
    name: "DeepSeek-R1-Distill",
    provider: "Open model",
    strengths: ["reasoning", "analysis", "review", "security"],
    inputCost: 0.22,
    outputCost: 0.55,
    quality: 82,
    speed: 61,
    easeOfUse: 61,
    reliability: 76,
    privacy: 82,
    reviewNeed: 39,
    license: "MIT",
  },
  {
    id: "local",
    name: "Local small model",
    provider: "Self-hosted",
    strengths: ["privacy", "classification", "retrieval", "policy"],
    inputCost: 0.03,
    outputCost: 0.08,
    quality: 66,
    speed: 79,
    easeOfUse: 54,
    reliability: 68,
    privacy: 96,
    reviewNeed: 52,
    license: "Apache-2.0",
  },
];

const BENCHMARKS = [
  {
    title: "SaaS landing page with auth",
    type: "frontend_fullstack",
    tokens: 118000,
    quality: 86,
    outcome: "Codex-led route finished faster with fewer manual fixes.",
    tags: ["frontend", "auth", "deployment"],
  },
  {
    title: "Stripe checkout integration",
    type: "backend_integration",
    tokens: 98000,
    quality: 84,
    outcome: "Single coding agent worked well after a focused implementation plan.",
    tags: ["payments", "backend", "tests"],
  },
  {
    title: "System architecture review",
    type: "architecture",
    tokens: 72000,
    quality: 91,
    outcome: "Claude-style review improved design tradeoffs before coding.",
    tags: ["architecture", "reasoning", "review"],
  },
  {
    title: "Security review of API routes",
    type: "security_review",
    tokens: 89000,
    quality: 87,
    outcome: "Local profiling reduced sensitive context exposure before escalation.",
    tags: ["security", "backend", "privacy"],
  },
  {
    title: "Research notes to product spec",
    type: "product_research",
    tokens: 41000,
    quality: 85,
    outcome: "Lightweight reasoning route was sufficient with human editing.",
    tags: ["research", "writing", "strategy"],
  },
  {
    title: "Fix TypeScript test suite",
    type: "debugging",
    tokens: 76000,
    quality: 89,
    outcome: "Codex-style route benefited from direct test execution.",
    tags: ["debugging", "tests", "typescript"],
  },
];

const SAMPLE_TASK =
  "Build a SaaS landing page with pricing, auth, and Stripe checkout. Use an existing React app, add tests, and recommend the best agent route for quality and developer effort.";

const TASK_PATTERNS = [
  {
    type: "frontend_fullstack",
    label: "Frontend full-stack",
    skills: ["frontend", "auth", "payments", "tests", "deployment", "fullstack"],
    keywords: ["landing", "website", "react", "frontend", "auth", "stripe", "pricing", "checkout"],
    complexity: 1.26,
    risk: "Integration, UI polish, and deployment risk",
  },
  {
    type: "architecture",
    label: "Architecture and reasoning",
    skills: ["architecture", "reasoning", "review", "strategy"],
    keywords: ["architecture", "system design", "design", "reasoning", "tradeoff", "strategy", "plan"],
    complexity: 1.08,
    risk: "Ambiguous constraints and long-term design tradeoffs",
  },
  {
    type: "debugging",
    label: "Debugging",
    skills: ["debugging", "tests", "code search", "root cause"],
    keywords: ["bug", "fix", "failing", "error", "debug", "test suite", "typescript"],
    complexity: 0.96,
    risk: "Unknown failure source",
  },
  {
    type: "product_research",
    label: "Product research",
    skills: ["research", "writing", "strategy", "synthesis"],
    keywords: ["research", "spec", "proposal", "market", "customer", "launch", "brief"],
    complexity: 0.78,
    risk: "Ambiguous success criteria",
  },
  {
    type: "data_analysis",
    label: "Data analysis",
    skills: ["data", "statistics", "visualization", "insights"],
    keywords: ["csv", "data", "analysis", "dashboard", "chart", "forecast", "metrics"],
    complexity: 0.9,
    risk: "Data quality and interpretation risk",
  },
  {
    type: "security_review",
    label: "Security and privacy",
    skills: ["security", "backend", "policy", "review", "privacy"],
    keywords: ["security", "vulnerability", "privacy", "secret", "api key", "compliance"],
    complexity: 1.12,
    risk: "Sensitive data and false negatives",
  },
];

const GOAL_LABELS = {
  best: "Best outcome",
  balanced: "Balanced",
  fast: "Fastest reliable",
  privacy: "Privacy-first",
  efficient: "Most token-efficient",
};

const form = document.querySelector("#quoteForm");
const sampleButton = document.querySelector("#sampleTask");

function money(value) {
  return `$${value.toFixed(2)}`;
}

function compactTokens(value) {
  return `${Math.round(value / 1000)}k`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function profileTask(task) {
  const text = task.toLowerCase();
  const ranked = TASK_PATTERNS.map((pattern) => {
    const hits = pattern.keywords.filter((keyword) => text.includes(keyword)).length;
    return { ...pattern, hits };
  }).sort((a, b) => b.hits - a.hits);

  const best = ranked[0].hits ? ranked[0] : TASK_PATTERNS[0];
  const ambiguity = clamp(72 - best.hits * 8 + Math.max(0, 90 - task.length) / 3, 18, 84);
  return {
    ...best,
    ambiguity,
    summary: buildTaskSummary(best, ambiguity),
  };
}

function buildTaskSummary(profile) {
  if (profile.type === "frontend_fullstack") {
    return "UI implementation plus integration work. Favor routes with coding reliability, test execution, and low developer handoff effort.";
  }
  if (profile.type === "architecture") {
    return "Reasoning quality and design tradeoffs matter most. A stronger architecture agent can win even when token use is higher.";
  }
  if (profile.type === "debugging") {
    return "Needs file narrowing, test evidence, and reliable iteration. Direct tool use can matter more than the lowest token count.";
  }
  if (profile.type === "product_research") {
    return "Mostly synthesis and writing. Lightweight or open routes can work when a human can review the final structure.";
  }
  if (profile.type === "data_analysis") {
    return "Data inspection and chart logic matter more than raw model strength. Keep execution bounded and verifiable.";
  }
  if (profile.type === "security_review") {
    return "Privacy, conservative review, and escalation control are central. Local profiling is valuable before external analysis.";
  }
  return "Use a scoped plan first, then select the strongest route for the parts that affect final outcome quality.";
}

function repoMultiplier(repoSize) {
  return { small: 0.72, medium: 1, large: 1.42 }[repoSize] || 1;
}

function estimateBaseTokens(task, profile, repoSize) {
  const textFactor = clamp(task.length / 260, 0.65, 1.35);
  return Math.round(84000 * profile.complexity * repoMultiplier(repoSize) * textFactor);
}

function estimateCost(model, tokens, outputRatio = 0.32) {
  const output = tokens * outputRatio;
  const input = tokens - output;
  return (input / 1_000_000) * model.inputCost + (output / 1_000_000) * model.outputCost;
}

function similarBenchmarks(profile) {
  return BENCHMARKS.map((benchmark) => {
    const typeScore = benchmark.type === profile.type ? 4 : 0;
    const skillScore = benchmark.tags.filter((tag) => profile.skills.includes(tag)).length;
    return { ...benchmark, score: typeScore + skillScore };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function skillFit(model, profile) {
  return model.strengths.filter((strength) => profile.skills.includes(strength)).length;
}

function tokensPerQuality(route) {
  return Math.round(route.tokens / Math.max(route.quality, 1));
}

function tokenEfficiency(route) {
  const valueScore = 100 - (tokensPerQuality(route) - 650) / 13;
  const costNudge = 100 - route.cost * 2.3;
  return Math.round(clamp(valueScore * 0.72 + costNudge * 0.28, 38, 98));
}

function effortScore(route) {
  return Math.round(clamp(100 - route.developerEffort, 32, 96));
}

function effortLabel(value) {
  if (value <= 28) return "Low";
  if (value <= 44) return "Medium";
  return "High";
}

function reliabilityLabel(value) {
  if (value >= 86) return "High";
  if (value >= 75) return "Medium";
  return "Needs review";
}

function singleModelRoutes(baseTokens, profile) {
  return MODELS.filter((model) => model.id !== "local").map((model) => {
    const fit = skillFit(model, profile);
    const architectureBoost = profile.type === "architecture" && model.id === "claude" ? 5 : 0;
    const codingBoost = ["frontend_fullstack", "debugging"].includes(profile.type) && model.id === "codex" ? 4 : 0;
    const tokens =
      baseTokens *
      (model.id === "claude" ? 1.16 : model.id === "qwen" ? 1.18 : model.id === "deepseek" ? 1.08 : 1);
    const quality = clamp(
      model.quality + fit * 1.8 + architectureBoost + codingBoost - profile.ambiguity / 12,
      54,
      97,
    );

    return {
      id: model.id,
      name: `${model.name} only`,
      provider: model.provider,
      tokens: Math.round(tokens),
      cost: estimateCost(model, tokens),
      quality: Math.round(quality),
      speed: model.speed,
      easeOfUse: model.easeOfUse,
      reliability: clamp(model.reliability + fit * 1.3 + codingBoost / 2, 52, 96),
      privacy: model.privacy,
      developerEffort: clamp(model.reviewNeed - fit * 2 - model.easeOfUse / 12, 16, 66),
      bestFor: model.id === "claude" ? "Architecture and reasoning" : model.id === "codex" ? "Implementation with tools" : "Scoped drafts and reviewable code",
      tradeoff:
        model.id === "claude"
          ? "Higher token use, stronger design judgment"
          : model.id === "codex"
            ? "Strong convenience, external provider dependency"
            : "Efficient but needs review",
      why:
        model.id === "claude"
          ? "This route prioritizes reasoning depth and design quality."
          : model.id === "codex"
            ? "This route favors direct implementation reliability and a smoother developer workflow."
            : "This route keeps usage efficient when the task can tolerate a review pass.",
      fail:
        model.id === "claude"
          ? "It can over-invest in analysis if implementation details are already clear."
          : model.id === "codex"
            ? "It may use more tokens than an open-model planning pass on broad or vague tasks."
            : "It may miss edge cases without a stronger implementation or validation step.",
      switch:
        model.id === "claude"
          ? "Switch to Codex when the task becomes mostly code edits, tests, and integration."
          : model.id === "codex"
            ? "Switch to Claude when architecture ambiguity dominates, or local-first when sensitive data is involved."
            : "Switch to a stronger route when the task touches production code or has low review tolerance.",
    };
  });
}

function comboRoutes(baseTokens, profile) {
  const qwen = MODELS.find((model) => model.id === "qwen");
  const codex = MODELS.find((model) => model.id === "codex");
  const claude = MODELS.find((model) => model.id === "claude");
  const deepseek = MODELS.find((model) => model.id === "deepseek");
  const local = MODELS.find((model) => model.id === "local");

  const codexComboQuality = clamp(89 + skillFit(codex, profile) * 1.4 - profile.ambiguity / 18, 74, 94);
  const claudeComboQuality = clamp(92 + (profile.type === "architecture" ? 3 : 0) - profile.ambiguity / 20, 78, 96);
  const localFirstQuality = clamp(82 + (profile.type === "security_review" ? 4 : 0) - profile.ambiguity / 16, 66, 89);

  return [
    {
      id: "scope-codex-validate",
      name: "Lightweight scope + Codex implementation + review model",
      provider: "Routed",
      tokens: Math.round(baseTokens * 0.92),
      cost:
        estimateCost(qwen, baseTokens * 0.18) +
        estimateCost(codex, baseTokens * 0.58) +
        estimateCost(deepseek, baseTokens * 0.16),
      quality: Math.round(codexComboQuality),
      speed: 78,
      easeOfUse: 88,
      reliability: 89,
      privacy: 68,
      developerEffort: 24,
      bestFor: "Production coding with balanced oversight",
      tradeoff: "More orchestration, better control",
      why: "It uses a lightweight model to scope the task, Codex for high-leverage implementation, and a review model to catch gaps.",
      fail: "The handoff can add friction if the task is tiny or already perfectly specified.",
      switch: "Use Codex only when convenience matters most, or Claude review when architecture risk is the main concern.",
    },
    {
      id: "codex-direct",
      name: "Codex direct implementation",
      provider: "OpenAI",
      tokens: Math.round(baseTokens * 1.03),
      cost: estimateCost(codex, baseTokens * 1.03),
      quality: Math.round(clamp(90 + skillFit(codex, profile) * 1.2 - profile.ambiguity / 16, 74, 95)),
      speed: 86,
      easeOfUse: 94,
      reliability: 90,
      privacy: 61,
      developerEffort: 18,
      bestFor: "Fast implementation and low setup effort",
      tradeoff: "Higher usage can be worth it for flow",
      why: "Codex wins when the fastest path to a reliable code change is more valuable than route orchestration.",
      fail: "It can spend extra context on planning if the task is vague or very large.",
      switch: "Use a scoped combo for broad tasks, or local-first when private code cannot leave the environment.",
    },
    {
      id: "codex-claude-review",
      name: "Codex implementation + Claude architecture review",
      provider: "Routed",
      tokens: Math.round(baseTokens * 1.08),
      cost: estimateCost(codex, baseTokens * 0.64) + estimateCost(claude, baseTokens * 0.44),
      quality: Math.round(claudeComboQuality),
      speed: 70,
      easeOfUse: 82,
      reliability: 91,
      privacy: 58,
      developerEffort: 27,
      bestFor: "Architecture-heavy product work",
      tradeoff: "Highest confidence, higher usage",
      why: "This route combines implementation strength with a second-pass design review for higher quality decisions.",
      fail: "It can be too heavy for simple UI copy, CRUD edits, or tasks with clear acceptance criteria.",
      switch: "Use Codex direct for straightforward implementation, or a lightweight route when human review is available.",
    },
    {
      id: "local-first",
      name: "Local profile + open-model draft + targeted escalation",
      provider: "Local-first routed",
      tokens: Math.round(baseTokens * 0.78),
      cost:
        estimateCost(local, baseTokens * 0.24) +
        estimateCost(qwen, baseTokens * 0.32) +
        estimateCost(codex, baseTokens * 0.22),
      quality: Math.round(localFirstQuality),
      speed: 76,
      easeOfUse: 64,
      reliability: 78,
      privacy: 94,
      developerEffort: 42,
      bestFor: "Private code and reviewable drafts",
      tradeoff: "Efficient but needs review",
      why: "It keeps early profiling and drafting local or open, then escalates only the highest-value implementation slices.",
      fail: "It needs more developer review and can underperform on polished production implementation.",
      switch: "Use Codex direct when convenience and quality matter more than local control.",
    },
  ];
}

function scoreRoute(route, preferences) {
  const dimensions = {
    quality: route.quality,
    tokenEfficiency: tokenEfficiency(route),
    developerEffort: effortScore(route),
    reliability: route.reliability,
    privacy: route.privacy,
    speed: route.speed,
    easeOfUse: route.easeOfUse,
  };

  const weightsByGoal = {
    best: {
      quality: 0.34,
      reliability: 0.22,
      easeOfUse: 0.18,
      developerEffort: 0.12,
      tokenEfficiency: 0.08,
      privacy: 0.06,
    },
    balanced: {
      quality: 0.24,
      reliability: 0.2,
      easeOfUse: 0.15,
      developerEffort: 0.15,
      tokenEfficiency: 0.16,
      privacy: 0.1,
    },
    fast: {
      speed: 0.33,
      reliability: 0.24,
      quality: 0.2,
      easeOfUse: 0.13,
      developerEffort: 0.1,
    },
    privacy: {
      privacy: 0.38,
      reliability: 0.2,
      quality: 0.18,
      tokenEfficiency: 0.14,
      developerEffort: 0.1,
    },
    efficient: {
      tokenEfficiency: 0.38,
      quality: 0.22,
      reliability: 0.18,
      developerEffort: 0.12,
      easeOfUse: 0.1,
    },
  };

  const weights = weightsByGoal[preferences.goal] || weightsByGoal.best;
  let score = Object.entries(weights).reduce((sum, [dimension, weight]) => {
    return sum + (dimensions[dimension] || 0) * weight;
  }, 0);

  const priorityBonus = {
    quality: dimensions.quality * 0.07,
    speed: dimensions.speed * 0.07,
    efficiency: dimensions.tokenEfficiency * 0.07,
    privacy: dimensions.privacy * 0.07,
  }[preferences.priority];
  score += priorityBonus || 0;

  const reviewPenalty = {
    low: route.developerEffort * 0.12,
    medium: route.developerEffort * 0.06,
    high: route.developerEffort * 0.02,
  }[preferences.reviewTolerance];
  score -= reviewPenalty || 0;

  if (preferences.goal === "efficient") {
    if (["qwen", "deepseek", "local-first"].includes(route.id)) {
      score += preferences.reviewTolerance === "high" ? 9 : 5;
    }
    if (["claude", "codex-claude-review"].includes(route.id)) {
      score -= 6;
    }
  }

  if (preferences.priority === "efficiency" && route.tradeoff.includes("needs review")) {
    score += preferences.reviewTolerance === "high" ? 4 : 1;
  }

  return Math.round(score);
}

function buildRoutes(task, profile, repoSize, preferences) {
  const baseTokens = estimateBaseTokens(task, profile, repoSize);
  const routes = [...singleModelRoutes(baseTokens, profile), ...comboRoutes(baseTokens, profile)];
  return routes
    .map((route) => ({
      ...route,
      tokenEfficiency: tokenEfficiency(route),
      tokensPerQuality: tokensPerQuality(route),
      score: scoreRoute(route, preferences),
    }))
    .sort((a, b) => b.score - a.score);
}

function buildPlan(route) {
  const phasesByRoute = {
    "scope-codex-validate": [
      ["Scope the task", "Lightweight model", "Identify files, acceptance criteria, and risky assumptions.", 0.18],
      ["Implement with best-fit agent", "Codex-style agent", "Use strong tool access for code edits, tests, and integration.", 0.58],
      ["Validate and tighten", "Review model", "Check likely bugs, missing tests, reasoning gaps, and route drift.", 0.16],
      ["Approval checkpoint", "AgentQuote Guard", "Pause before external APIs, secrets, or production credentials.", 0.08],
    ],
    "codex-direct": [
      ["Scope the task", "Codex-style agent", "Read the project, decide the implementation path, and start from the highest-value files.", 0.22],
      ["Implement with best-fit agent", "Codex-style agent", "Make edits, run checks, and iterate in the same tool loop.", 0.62],
      ["Validate and tighten", "Codex-style agent", "Review diffs, tests, and edge cases before handoff.", 0.16],
    ],
    "codex-claude-review": [
      ["Scope the task", "Codex-style agent", "Collect implementation context and isolate architectural decisions.", 0.2],
      ["Implement with best-fit agent", "Codex-style agent", "Build the working version and preserve test evidence.", 0.48],
      ["Validate and tighten", "Claude Code", "Review architecture, reasoning, maintainability, and product tradeoffs.", 0.32],
    ],
    "local-first": [
      ["Scope the task", "Local model", "Classify files and sensitive context before anything external is shared.", 0.24],
      ["Implement with best-fit agent", "Open coding model", "Draft bounded changes and summarize uncertainty for review.", 0.32],
      ["Validate and tighten", "Codex-style escalation", "Use a stronger agent only for the highest-risk implementation slices.", 0.22],
      ["Approval checkpoint", "AgentQuote Guard", "Require approval before external model calls touch private context.", 0.22],
    ],
  };

  const fallback = [
    ["Scope the task", route.name.replace(" only", ""), "Clarify files, success criteria, and uncertainty.", 0.22],
    ["Implement with best-fit agent", route.name.replace(" only", ""), "Run the core task with the selected agent.", 0.58],
    ["Validate and tighten", "Review pass", "Check quality, tests, and handoff notes.", 0.2],
  ];

  const phases = phasesByRoute[route.id] || fallback;
  return phases.map(([title, agent, description, share]) => ({
    title,
    agent,
    description,
    tokens: Math.round(route.tokens * share),
  }));
}

function collectPreferences(formData) {
  return {
    repoSize: formData.get("repoSize"),
    goal: formData.get("goal"),
    priority: formData.get("priority"),
    reviewTolerance: formData.get("reviewTolerance"),
  };
}

function updateQuote() {
  const formData = new FormData(form);
  const task =
    formData.get("task").trim() ||
    "Build a SaaS landing page with auth, pricing, checkout, tests, and deployment polish.";
  const preferences = collectPreferences(formData);
  const profile = profileTask(task);
  const routes = buildRoutes(task, profile, preferences.repoSize, preferences);
  const bestRoute = routes[0];
  const benchmarks = similarBenchmarks(profile);

  renderSummary(bestRoute, preferences);
  renderPlan(bestRoute);
  renderComparison(routes, bestRoute);
  renderInsights(profile, benchmarks, bestRoute);
  renderRationale(bestRoute);
}

function renderSummary(route, preferences) {
  document.querySelector("#routeTitle").textContent = route.name;
  document.querySelector("#goalBadge").textContent = GOAL_LABELS[preferences.goal] || "Best outcome";
  document.querySelector("#qualityScore").textContent = route.quality;
  document.querySelector("#efficiencyScore").textContent = route.tokenEfficiency;
  document.querySelector("#costDetail").textContent =
    `${(route.tokensPerQuality / 1000).toFixed(1)}k tokens / quality pt · ${money(route.cost)} est.`;
  document.querySelector("#effortScore").textContent = effortLabel(route.developerEffort);
  document.querySelector("#reliabilityScore").textContent = reliabilityLabel(route.reliability);
  document.querySelector("#confidenceBadge").textContent =
    route.reliability >= 86 ? "High confidence" : "Review advised";
}

function renderPlan(route) {
  const timeline = document.querySelector("#routeTimeline");
  timeline.innerHTML = "";
  buildPlan(route).forEach((step, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span class="step-number">${index + 1}</span>
      <div>
        <strong>${step.title}</strong>
        <span>${step.agent}</span>
        <p>${step.description}</p>
        <small>${compactTokens(step.tokens)}</small>
      </div>
    `;
    timeline.appendChild(item);
  });
}

function renderComparison(routes, bestRoute) {
  const rows = document.querySelector("#comparisonRows");
  rows.innerHTML = "";
  routes.forEach((route) => {
    const row = document.createElement("tr");
    if (route.id === bestRoute.id) {
      row.classList.add("selected-row");
    }
    row.innerHTML = `
      <td>
        <strong>${route.name}</strong>
        <span>${route.provider}${route.id === bestRoute.id ? " · Selected" : ""}</span>
      </td>
      <td>${route.bestFor}</td>
      <td>${route.quality}</td>
      <td>
        <strong>${route.tokenEfficiency}</strong>
        <span>${compactTokens(route.tokens)} · ${money(route.cost)}</span>
      </td>
      <td>${effortLabel(route.developerEffort)}</td>
      <td>${route.tradeoff}</td>
    `;
    rows.appendChild(row);
  });
}

function renderInsights(profile, benchmarks, route) {
  document.querySelector("#taskType").textContent = profile.label;
  document.querySelector("#taskSummary").textContent = profile.summary;

  const tags = document.querySelector("#skillTags");
  tags.innerHTML = "";
  profile.skills.slice(0, 5).forEach((skill) => {
    const span = document.createElement("span");
    span.textContent = skill;
    tags.appendChild(span);
  });

  const benchmarkList = document.querySelector("#benchmarkList");
  benchmarkList.innerHTML = "";
  benchmarks.forEach((benchmark) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${benchmark.title}</strong>
      <span>${compactTokens(benchmark.tokens)} · quality ${benchmark.quality}</span>
      <p>${benchmark.outcome}</p>
    `;
    benchmarkList.appendChild(item);
  });

  const sensitive = profile.type === "security_review" || route.privacy >= 90;
  document.querySelector("#policyVerdict").textContent = sensitive
    ? "Privacy-first route active"
    : "Approval before sensitive context";
  document.querySelector("#policyNote").textContent = sensitive
    ? "Keep early profiling local, redact secrets, and require approval before external model escalation."
    : "Require approval before sending repository context, customer data, secrets, or production credentials to external providers.";
}

function renderRationale(route) {
  document.querySelector("#whyRoute").textContent = route.why;
  document.querySelector("#failRoute").textContent = route.fail;
  document.querySelector("#switchRoute").textContent = route.switch;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateQuote();
});

["input", "change"].forEach((eventName) => {
  form.addEventListener(eventName, () => updateQuote());
});

sampleButton.addEventListener("click", () => {
  form.elements.task.value = SAMPLE_TASK;
  form.elements.repoSize.value = "medium";
  form.elements.goal.value = "best";
  form.elements.priority.value = "quality";
  form.elements.reviewTolerance.value = "low";
  updateQuote();
});

updateQuote();
