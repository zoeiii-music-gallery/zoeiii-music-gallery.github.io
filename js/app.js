(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}` : "--:--");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const tracks = (window.TRACKS || []).map((t, i) => ({
    title: (t.title || "").trim() || `第 ${pad(i + 1)} 首`,
    videoUrl: (t.videoUrl || "").trim(),
    thumbnail: (t.thumbnail || "").trim(),
    duration: (t.duration || "").trim(),
    note: (t.note || "").trim(),
  }));

  /** "file" = 本地/直链视频，"embed" = iframe 嵌入，"none" = 还没有视频 */
  const kindOf = (url) => {
    if (!url) return "none";
    return /\.(mp4|m4v|webm|mov|ogv)(\?|#|$)/i.test(url) ? "file" : "embed";
  };

  /* ---------------- 曲目卡片 ---------------- */
  const TILTS = ["-1.2deg", "0.8deg", "-0.4deg", "1.3deg", "-0.9deg", "0.5deg"];
  const list = $("#track-list");

  tracks.forEach((t, i) => {
    const kind = kindOf(t.videoUrl);
    const cover = t.thumbnail
      ? `<img src="${esc(t.thumbnail)}" alt="${esc(t.title)} 的封面" loading="lazy">`
      : `<span class="sleeve sleeve--${i % 4}"><span class="sleeve-disc"></span><span class="sleeve-no">${pad(i + 1)}</span></span>`;
    const li = document.createElement("li");
    li.className = "track";
    li.style.setProperty("--tilt", TILTS[i % TILTS.length]);
    li.innerHTML = `
      <button class="track-card${kind === "none" ? " is-empty" : ""}" type="button" data-index="${i}"
              aria-label="第 ${i + 1} 首：${esc(t.title)}${kind === "none" ? "（视频待添加）" : "，点击播放"}">
        <span class="track-cover">${cover}</span>
        <span class="track-meta">
          <span class="track-no">No. ${pad(i + 1)}</span>
          <span class="track-title">${esc(t.title)}</span>
          ${t.note ? `<span class="track-note">${esc(t.note)}</span>` : ""}
          <span class="track-dur">${kind === "none" ? "视频待添加" : esc(t.duration || "--:--")}</span>
        </span>
        <span class="track-play" aria-hidden="true">
          <svg class="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>
          <span class="eq"><i></i><i></i><i></i></span>
        </span>
      </button>`;
    list.appendChild(li);
  });

  /* ---------------- 播放器 ---------------- */
  const player = $("#player");
  const video = $("#video");
  const embed = $("#embed");
  const msg = $("#screen-msg");
  const msgText = $("#screen-msg-text");
  const retryBtn = $("#retry-btn");
  const hint = $("#next-hint");
  const hintText = $("#next-hint-text");
  const hintBtn = $("#next-hint-btn");
  const mini = $("#mini");
  const seek = $("#mini-seek");
  const curEl = $("#mini-cur");
  const durEl = $("#mini-dur");

  let current = -1;
  let seeking = false;

  const setPlaying = (on) => {
    document.body.classList.toggle("is-playing", on);
    $$('[data-action="toggle"]').forEach((b) => b.setAttribute("aria-label", on ? "暂停" : "播放"));
    $$(".track-card").forEach((c) => c.classList.toggle("is-playing", on && +c.dataset.index === current));
  };

  const showMsg = (text, canRetry) => {
    msgText.textContent = text;
    retryBtn.hidden = !canRetry;
    msg.hidden = false;
  };

  const stopAll = () => {
    video.pause();
    if (video.hasAttribute("src")) {
      video.removeAttribute("src");
      video.load();
    }
    embed.removeAttribute("src");
    setPlaying(false);
  };

  const flip = (el) => {
    if (!el || reduceMotion.matches) return;
    el.classList.remove("flip");
    void el.offsetWidth; // 重新触发动画
    el.classList.add("flip");
  };

  function load(i, autoplay) {
    if (i < 0 || i >= tracks.length) return;
    stopAll();
    current = i;
    const t = tracks[i];
    const kind = kindOf(t.videoUrl);

    $("#player-no").textContent = `No. ${pad(i + 1)}`;
    $("#player-title").textContent = t.title;
    $("#player-note").textContent = t.note;
    $("#player-note").hidden = !t.note;
    $("#mini-no").textContent = `No. ${pad(i + 1)}`;
    $("#mini-title").textContent = t.title;
    $$(".track-card").forEach((c) => {
      if (+c.dataset.index === i) c.setAttribute("aria-current", "true");
      else c.removeAttribute("aria-current");
    });
    $$('[data-action="prev"]').forEach((b) => (b.disabled = i === 0));
    $$('[data-action="next"]').forEach((b) => (b.disabled = i === tracks.length - 1));

    hint.hidden = true;
    msg.hidden = true;
    seek.value = 0;
    curEl.textContent = "0:00";
    durEl.textContent = t.duration || "--:--";
    document.body.dataset.kind = kind;
    mini.hidden = false;
    document.body.classList.add("has-mini");
    flip($(".player-card"));
    flip($(".mini-disc"));

    video.hidden = kind !== "file";
    embed.hidden = kind !== "embed";

    if (kind === "file") {
      video.poster = t.thumbnail || "";
      video.src = t.videoUrl;
      video.load();
      if (autoplay) video.play().catch(() => {}); // 浏览器不允许时就等她自己点播放
    } else if (kind === "embed") {
      embed.src = t.videoUrl;
    } else {
      showMsg("这一首的视频还在路上，视频待添加～", false);
    }
  }

  function openTrack(i, autoplay = true) {
    if (i !== current) load(i, autoplay);
    else if (autoplay && kindOf(tracks[i].videoUrl) === "file" && video.paused) video.play().catch(() => {});
    if (!player.open) player.showModal();
  }

  const go = (delta) => {
    const next = current + delta;
    if (next < 0 || next >= tracks.length) return;
    load(next, true);
  };

  const toggle = () => {
    if (current < 0) return openTrack(0);
    if (kindOf(tracks[current].videoUrl) !== "file") return player.open || player.showModal();
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    video.muted = !video.muted;
  };

  // 统一处理所有 data-action 按钮
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === "prev") go(-1);
    else if (action === "next") go(1);
    else if (action === "toggle") toggle();
    else if (action === "mute") toggleMute();
  });

  list.addEventListener("click", (e) => {
    const card = e.target.closest(".track-card");
    if (card) openTrack(+card.dataset.index);
  });

  $("#player-close").addEventListener("click", () => player.close());
  // 点面板外的遮罩也能收起；收起后音乐继续，在底部迷你播放器里控制
  player.addEventListener("click", (e) => {
    if (e.target === player) player.close();
  });
  $("#mini-open").addEventListener("click", () => current >= 0 && player.showModal());
  retryBtn.addEventListener("click", () => load(current, true));

  // 视频事件
  video.addEventListener("play", () => setPlaying(true));
  video.addEventListener("pause", () => setPlaying(false));
  video.addEventListener("loadedmetadata", () => {
    seek.max = video.duration || 100;
    durEl.textContent = fmt(video.duration);
    // 没填时长的话，顺手补到卡片上
    const t = tracks[current];
    if (t && !t.duration) {
      t.duration = fmt(video.duration);
      const d = $(`.track-card[data-index="${current}"] .track-dur`);
      if (d) d.textContent = t.duration;
    }
  });
  video.addEventListener("timeupdate", () => {
    if (seeking) return;
    seek.value = video.currentTime;
    curEl.textContent = fmt(video.currentTime);
    seek.style.setProperty("--p", `${(video.currentTime / (video.duration || 1)) * 100}%`);
  });
  video.addEventListener("volumechange", () => {
    document.body.classList.toggle("is-muted", video.muted);
    $$('[data-action="mute"]').forEach((b) => {
      b.setAttribute("aria-pressed", String(video.muted));
      b.setAttribute("aria-label", video.muted ? "取消静音" : "静音");
    });
  });
  video.addEventListener("ended", () => {
    setPlaying(false);
    const last = current === tracks.length - 1;
    hintText.textContent = last ? "全部听完啦，谢谢你 🐙" : "下一首也准备好啦";
    hintBtn.hidden = last;
    hint.hidden = false;
  });
  video.addEventListener("error", () => {
    if (!video.getAttribute("src")) return;
    setPlaying(false);
    showMsg("这段视频暂时打不开，可能是网络有点慢。", true);
  });

  // 进度条拖动
  seek.addEventListener("input", () => {
    seeking = true;
    curEl.textContent = fmt(+seek.value);
    seek.style.setProperty("--p", `${(seek.value / (seek.max || 1)) * 100}%`);
  });
  seek.addEventListener("change", () => {
    if (Number.isFinite(video.duration)) video.currentTime = +seek.value;
    seeking = false;
  });

  // 开始按钮：滚到歌单，并打开第一首有视频的歌
  $("#start-btn").addEventListener("click", () => {
    $("#playlist").scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
    const first = tracks.findIndex((t) => kindOf(t.videoUrl) !== "none");
    if (first >= 0) openTrack(first);
  });

  // 键盘：空格/方向键（面板打开或焦点不在输入控件上时）
  document.addEventListener("keydown", (e) => {
    if (current < 0 || e.target.closest("input, textarea, video, iframe")) return;
    if (e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
    if (e.key === " ") { e.preventDefault(); toggle(); }
    else if (e.key === "ArrowRight" && e.shiftKey) go(1);
    else if (e.key === "ArrowLeft" && e.shiftKey) go(-1);
  });

  /* ---------------- 章鱼 & 贴纸彩蛋 ---------------- */
  const STICKERS = {
    octo: `<svg viewBox="0 0 64 64"><g stroke="#292522" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M20 40c-3 8-6 10-3 14M28 44c-1 7-2 10 1 13M36 44c1 7 2 10-1 13M44 40c3 8 6 10 3 14" stroke="#D9A6A4" stroke-width="6"/></g><ellipse cx="32" cy="28" rx="20" ry="18" fill="#D9A6A4" stroke="#292522" stroke-width="2.5"/><path d="M22 28q3-4 6 0M36 28q3-4 6 0" stroke="#292522" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="34" rx="4" ry="2.5" fill="#B5545F" opacity=".7"/><ellipse cx="44" cy="34" rx="4" ry="2.5" fill="#B5545F" opacity=".7"/><path d="M50 10c2 2 2 4 0 6M54 7c3 3 3 9 0 12" stroke="#7A3544" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  };
  // Zoeiii 的小表情（media/stickers/01.png ~ 14.png，已抠图加白边）
  const PICS = Array.from({ length: 14 }, (_, i) => `media/stickers/${String(i + 1).padStart(2, "0")}.png`);
  PICS.forEach((src) => { new Image().src = src; }); // 预加载，点击时立刻出现
  const STICKER_KEYS = PICS.map((_, i) => `pic${i}`);
  const MAX_STICKERS = 4;
  const layer = $("#sticker-layer");
  let lastKey = "";

  function dropSticker(x, y, key) {
    if (layer.childElementCount >= MAX_STICKERS) return;
    if (!key) {
      do key = STICKER_KEYS[Math.floor(Math.random() * STICKER_KEYS.length)];
      while (key === lastKey);
    }
    lastKey = key;
    const el = document.createElement("span");
    el.className = "sticker";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--r", `${Math.round(Math.random() * 30 - 15)}deg`);
    el.style.setProperty("--dx", `${Math.round(Math.random() * 40 - 20)}px`);
    el.innerHTML = STICKERS[key] || `<img src="${PICS[+key.slice(3)]}" alt="">`;
    layer.appendChild(el);
    const remove = () => el.remove();
    el.addEventListener("animationend", remove, { once: true });
    setTimeout(remove, 2000); // 兜底
  }

  const SAYINGS = ["被你发现啦", "这首也很好听", "下一首也不错哦", "章鱼也在认真听", "八只脚一起打拍子", "听累了记得喝口水"];
  const octoBtn = $(".octo-btn");
  const say = $(".octo-say");
  let sayIdx = 0;
  let shyTimer;
  let sayTimer;

  function octoReact() {
    octoBtn.classList.add("is-shy");
    clearTimeout(shyTimer);
    shyTimer = setTimeout(() => octoBtn.classList.remove("is-shy"), 1300);
    // 大约一半的时候才说话，留点惊喜
    if (Math.random() < 0.5) {
      say.textContent = SAYINGS[sayIdx++ % SAYINGS.length];
      say.classList.add("show");
      clearTimeout(sayTimer);
      sayTimer = setTimeout(() => say.classList.remove("show"), 2200);
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".octo-btn")) {
      octoReact();
      const r = octoBtn.getBoundingClientRect();
      // 键盘触发时没有坐标，就从章鱼头顶冒出来
      const x = e.clientX || r.left + r.width / 2;
      const y = e.clientY || r.top + r.height * 0.3;
      dropSticker(x, y, Math.random() < 0.4 ? "octo" : undefined);
      return;
    }
    if (e.target.closest("button, a, input, video, iframe, dialog, .mini, label, select, textarea")) return;
    dropSticker(e.clientX, e.clientY);
  });
})();
