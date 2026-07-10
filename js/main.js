// =============================================================================
// WELLBEK PORTFOLIO - main.js
// Procedural ASCII dragon (Canvas 2D) that follows the cursor + career-journey
// timeline + contact-me pixelate/scramble + thumb placeholders + interactions.
// =============================================================================

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // ===========================================================================
  // PROCEDURAL ASCII DRAGON - follows the mouse smoothly
  // A serpentine body (rope spine + undulation) with stepping IK legs,
  // rasterized to a character grid via a distance field. The head eases toward
  // the cursor and gently orbits it when idle, so the body never stops flowing.
  // ===========================================================================

  const RAMP = ' .:;~=+*#%@'; // light -> dense
  const BODY_COLOR = '#b6ff3c';

  class DragonEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.cell = 14;            // logical px per char cell
      this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this.running = !reduceMotion;
      this.cols = 0; this.rows = 0;
      this.t = 0;

      // --- skeleton config ---
      this.segCount = 26;        // spine segments
      this.segLen = 13;          // distance between spine points
      this.spine = [];
      for (let i = 0; i < this.segCount; i++) this.spine.push({ x: -200 - i * this.segLen, y: 0 });
      this.trail = [];           // history of head positions for stable rope

      // head + cursor target
      this.head = { x: -220, y: 0 };
      this.mouse = { x: 0, y: 0, has: false };

      // legs: pairs along the spine (index into spine), stepping IK
      this.legs = [this.makeLeg(3), this.makeLeg(5), this.makeLeg(18), this.makeLeg(20)];
      this.legs[0].phase = 0; this.legs[1].phase = Math.PI;
      this.legs[2].phase = Math.PI; this.legs[3].phase = 0;
      // top-down: legs splay to both sides of the body (alternating)
      this.legs[0].side = -1; this.legs[1].side = 1;
      this.legs[2].side = -1; this.legs[3].side = 1;
      // feet spread along the body (front forward, back aft) for a walking stance
      this.legs[0].stance = 24; this.legs[1].stance = 10;
      this.legs[2].stance = -10; this.legs[3].stance = -24;
      this.reachSide = 42; this.legL = 34;

      this.resize();
      this.seed();
      window.addEventListener('resize', () => { this.resize(); this.seed(); });
      window.addEventListener('mousemove', (e) => this.onPointer(e.clientX, e.clientY), { passive: true });
      window.addEventListener('touchmove', (e) => {
        const p = e.touches[0]; if (p) this.onPointer(p.clientX, p.clientY);
      }, { passive: true });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { this.running = false; }
        else if (!reduceMotion) { this.running = true; this.loop(); }
      });
      if (this.running) this.loop();
    }

    onPointer(x, y) { this.mouse.x = x; this.mouse.y = y; this.mouse.has = true; }

    makeLeg(spineIdx) {
      return {
        spineIdx, foot: { x: 0, y: 0 }, target: { x: 0, y: 0 },
        phase: 0, stepping: false, stepT: 0, stride: 44, side: 1, stance: 0,
      };
    }

    // 2-bone IK: knee position for hip(a)->foot(c) with thigh/shin l1/l2,
    // bulging toward (bdx,bdy) so the bend follows the walk direction.
    ikKnee(ax, ay, cx, cy, l1, l2, bdx, bdy) {
      let dx = cx - ax, dy = cy - ay;
      let d = Math.hypot(dx, dy);
      const maxd = l1 + l2 - 0.5, mind = Math.abs(l1 - l2) + 0.5;
      if (d > maxd) { const s = maxd / (d || 1); dx *= s; dy *= s; d = maxd; }
      else if (d < mind) { const s = mind / (d || 1); dx *= s; dy *= s; d = mind; }
      const ux = dx / d, uy = dy / d;
      const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
      const A = Math.acos(Math.max(-1, Math.min(1, cosA)));
      const base = Math.atan2(uy, ux);
      const k1x = ax + Math.cos(base + A) * l1, k1y = ay + Math.sin(base + A) * l1;
      const k2x = ax + Math.cos(base - A) * l1, k2y = ay + Math.sin(base - A) * l1;
      const mx = (ax + cx) / 2, my = (ay + cy) / 2;
      const s1 = (k1x - mx) * bdx + (k1y - my) * bdy;
      const s2 = (k2x - mx) * bdx + (k2y - my) * bdy;
      return s1 >= s2 ? { x: k1x, y: k1y } : { x: k2x, y: k2y };
    }

    // place the dragon so it is already on screen, body trailing left at full length
    seed() {
      const sx = this.mouse.has ? this.mouse.x : this.W * 0.4;
      const sy = this.mouse.has ? this.mouse.y : this.H * 0.5;
      this.head.x = sx; this.head.y = sy;
      this.t = 0;
      // prefill a straight trail (leftward) long enough for the full body length
      this.trail = [];
      const step = this.segLen / 2;
      const need = Math.ceil((this.segCount * this.segLen) / step) + 4;
      for (let i = 0; i < need; i++) this.trail.push({ x: sx - i * step, y: sy });
      for (let i = 0; i < this.segCount; i++) { this.spine[i].x = sx - i * this.segLen; this.spine[i].y = sy; }
      for (const leg of this.legs) {
        const hip = this.spine[leg.spineIdx];
        leg.foot.x = hip.x + leg.stance; leg.foot.y = hip.y + leg.side * this.reachSide;
        leg.knee = this.ikKnee(hip.x, hip.y, leg.foot.x, leg.foot.y, this.legL, this.legL, 1, 0);
        leg.stepping = false; leg.stepT = 0;
      }
    }

    resize() {
      const w = window.innerWidth, h = window.innerHeight;
      this.W = w; this.H = h;
      this.canvas.width = Math.floor(w * this.dpr);
      this.canvas.height = Math.floor(h * this.dpr);
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.ctx.font = `${this.cell}px 'CommitMono', monospace`;
      this.ctx.textBaseline = 'top';
      this.cols = Math.ceil(w / this.cell) + 1;
      this.rows = Math.ceil(h / this.cell) + 1;
    }

    distToSeg(px, py, ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay;
      const len2 = dx * dx + dy * dy || 1;
      let t = ((px - ax) * dx + (py - ay) * dy) / len2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const cx = ax + t * dx, cy = ay + t * dy;
      return Math.hypot(px - cx, py - cy);
    }

    step() {
      const mx = this.mouse.has ? this.mouse.x : this.W * 0.5;
      const my = this.mouse.has ? this.mouse.y : this.H * 0.5;

      // clamp target inside the viewport so the full-size dragon stays on screen
      const m = 40;
      const tx = Math.max(m, Math.min(this.W - m, mx));
      const ty = Math.max(m, Math.min(this.H - m, my));

      const dx = tx - this.head.x, dy = ty - this.head.y;
      const dist = Math.hypot(dx, dy);
      const dead = 7;

      // head is touching the mouse - stop moving entirely (freeze in place)
      if (dist <= dead) { this.moving = false; return; }
      this.moving = true;
      this.t += 1;

      // ease the head toward the cursor; keep full size, never shrink
      const ease = Math.min(0.13, 0.05 + dist / 600);
      this.head.x += dx * ease;
      this.head.y += dy * ease;

      // record head into trail (capped by count)
      this.trail.push({ x: this.head.x, y: this.head.y });
      const maxTrail = 220;
      if (this.trail.length > maxTrail) this.trail.shift();

      // --- spine: walk the trail at FIXED spatial intervals so the body length
      //     is constant (independent of how fast the cursor moved) ---
      this.spine[0].x = this.head.x;
      this.spine[0].y = this.head.y;
      let segIdx = 1;
      let ti = this.trail.length - 1;
      let px = this.trail[ti].x, py = this.trail[ti].y;
      let acc = 0;
      for (let i = ti - 1; i >= 0 && segIdx < this.segCount; i--) {
        const nx = this.trail[i].x, ny = this.trail[i].y;
        let dx = px - nx, dy = py - ny;
        let segDist = Math.hypot(dx, dy) || 0.0001;
        while (acc + segDist >= this.segLen && segIdx < this.segCount) {
          const f = (this.segLen - acc) / segDist;
          const cx = px - dx * f, cy = py - dy * f;
          this.spine[segIdx].x = cx;
          this.spine[segIdx].y = cy;
          segIdx++;
          px = cx; py = cy;
          dx = px - nx; dy = py - ny;
          segDist = Math.hypot(dx, dy) || 0.0001;
          acc = 0;
        }
        acc += segDist;
        px = nx; py = ny;
      }
      // if the trail ran out, extend the remaining segments straight back so the
      // body still has full length
      while (segIdx < this.segCount) {
        const prev = this.spine[segIdx - 1];
        const back = this.spine[segIdx - 2] || prev;
        const ang = Math.atan2(prev.y - back.y, prev.x - back.x);
        this.spine[segIdx].x = prev.x + Math.cos(ang) * this.segLen;
        this.spine[segIdx].y = prev.y + Math.sin(ang) * this.segLen;
        segIdx++;
      }
      // serpentine wiggle
      for (let i = 0; i < this.segCount; i++) {
        this.spine[i].y += Math.sin(this.t * 0.07 - i * 0.5) * 8;
      }

      // --- legs: top-down, bent via 2-bone IK, feet placed along the walk direction ---
      const headVX = this.trail.length > 1 ? this.trail[this.trail.length - 1].x - this.trail[Math.max(0, this.trail.length - 4)].x : 0;
      const fwd = Math.max(-1, Math.min(1, headVX / 24));
      const reachSide = this.reachSide, L = this.legL;
      for (const leg of this.legs) {
        const hip = this.spine[leg.spineIdx];
        // body tangent + perpendicular normal at this hip
        const a = this.spine[Math.max(0, leg.spineIdx - 1)];
        const b = this.spine[Math.min(this.segCount - 1, leg.spineIdx + 1)];
        let tx = b.x - a.x, ty = b.y - a.y;
        const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
        const nx = -ty * leg.side, ny = tx * leg.side;
        // desired foot: out to the side + stance offset along the body
        const desiredFootX = hip.x + nx * reachSide + tx * leg.stance;
        const desiredFootY = hip.y + ny * reachSide + ty * leg.stance;
        const distToPlanted = Math.hypot(leg.foot.x - desiredFootX, leg.foot.y - desiredFootY);

        if (!leg.stepping && distToPlanted > leg.stride) {
          leg.stepping = true; leg.stepT = 0;
          leg.startFoot = { x: leg.foot.x, y: leg.foot.y };
          // step forward along the body in the direction of travel
          const step = 14 + fwd * 18;
          leg.target = { x: desiredFootX + tx * step, y: desiredFootY + ty * step };
        }
        if (leg.stepping) {
          leg.stepT += 0.1;
          const k = Math.min(leg.stepT, 1);
          const e = k * k * (3 - 2 * k);
          // ease toward the target, lifting the foot inward mid-step
          const lift = Math.sin(k * Math.PI) * 12;
          leg.foot.x = leg.startFoot.x + (leg.target.x - leg.startFoot.x) * e - nx * lift;
          leg.foot.y = leg.startFoot.y + (leg.target.y - leg.startFoot.y) * e - ny * lift;
          if (k >= 1) leg.stepping = false;
        }
        // bent knee via 2-bone IK, bulging forward along the travel direction
        leg.knee = this.ikKnee(hip.x, hip.y, leg.foot.x, leg.foot.y, L, L, tx, ty);
      }
    }

    radiusAt(i) {
      const t = i / (this.segCount - 1); // 0 = head .. 1 = tail
      return 9 + 20 * Math.pow(1 - t, 0.8);
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);
      ctx.fillStyle = BODY_COLOR;

      const bones = [];
      for (let i = 0; i < this.segCount - 1; i++) {
        bones.push({ a: this.spine[i], b: this.spine[i + 1], r: (this.radiusAt(i) + this.radiusAt(i + 1)) / 2 });
      }
      for (const leg of this.legs) {
        const hip = this.spine[leg.spineIdx];
        bones.push({ a: hip, b: leg.knee, r: 6 });
        bones.push({ a: leg.knee, b: leg.foot, r: 5 });
      }

      const cell = this.cell, half = cell / 2;
      for (let ry = 0; ry < this.rows; ry++) {
        for (let rx = 0; rx < this.cols; rx++) {
          const px = rx * cell + half, py = ry * cell + half;
          let best = Infinity;
          for (let b = 0; b < bones.length; b++) {
            const d = this.distToSeg(px, py, bones[b].a.x, bones[b].a.y, bones[b].b.x, bones[b].b.y) - bones[b].r;
            if (d < best) best = d;
            if (best < -6) break;
          }
          let idx;
          if (best < -4) idx = RAMP.length - 1;
          else if (best < 4) idx = RAMP.length - 2 - Math.floor((best + 4) / 8 * (RAMP.length - 2));
          else if (best < 11) idx = 1 + Math.floor((11 - best) / 7 * 2);
          else continue;
          if (idx < 1) continue;
          if (idx >= RAMP.length) idx = RAMP.length - 1;
          ctx.globalAlpha = idx <= 2 ? 0.25 : 0.9;
          ctx.fillText(RAMP[idx], rx * cell, ry * cell);
        }
      }
      ctx.globalAlpha = 1;
    }

    loop() {
      if (!this.running) return;
      this.step();
      this.render();
      this.raf = requestAnimationFrame(() => this.loop());
    }
  }

  // skip the dragon on touch / small screens (no cursor to follow, saves battery)
  const isMobile = window.matchMedia('(pointer: coarse), (max-width: 980px)').matches;
  const dragonCanvas = $('#dragon-canvas');
  if (dragonCanvas && !reduceMotion && !isMobile) {
    window.addEventListener('load', () => new DragonEngine(dragonCanvas));
  }

  // ===========================================================================
  // CAREER JOURNEY TIMELINE
  // ===========================================================================

  const dy = (y, m = 1) => y + (m - 1) / 12;

  const JOURNEY = [
    {
      id: 'gym', lane: 0, kind: 'work-amber', label: 'Robotics President · Goethe-Gym.',
      start: dy(2019, 7), end: dy(2021, 7),
      role: 'Robotics Club President', company: 'Goethe-Gymnasium Ibbenbüren', location: 'Ibbenbüren, DE',
      period: 'Jul 2019 - Jul 2021',
      bullets: [
        'Led weekly robotics sessions for up to 20 students, teaching programming and engineering fundamentals up to autonomous robotic systems.',
        'Coordinated national-scale robotics competitions involving schools across Germany.',
      ],
      tags: ['Robotics', 'Teaching', 'Leadership'],
    },
    {
      id: 'bsc', lane: 1, kind: 'edu', label: 'B.Sc. Computer Science · RWTH',
      start: dy(2021, 10), end: dy(2025, 9),
      role: 'B.Sc. Computer Science', company: 'RWTH Aachen University', location: 'Aachen, DE',
      period: 'Oct 2021 - Sep 2025',
      bullets: [
        'Focus on software engineering, machine learning, and human-computer interaction.',
        'Research assistant and teaching assistant in the Learning Technologies Research Group.',
      ],
      tags: ['CS', 'RWTH', 'ML', 'HCI'],
    },
    {
      id: 'ta', lane: 2, kind: 'work-cyan', label: 'Data Science TA · RWTH',
      start: dy(2024, 10), end: dy(2025, 4),
      role: 'Data Science Teaching Assistant', company: 'RWTH Aachen · Learning Technologies', location: 'Aachen, DE',
      period: 'Oct 2024 - Apr 2025',
      bullets: [
        'Instructed and mentored highly international groups of up to 40 multidisciplinary students multiple times per week.',
        'Led programming lessons in Python with a focus on data-driven applications and large-scale data analysis with Pandas.',
        'Provided individualized guidance, code reviews, and assignment feedback.',
      ],
      tags: ['Python', 'Pandas', 'Teaching', 'Data Science'],
    },
    {
      id: 'ra', lane: 2, kind: 'work-cyan', label: 'Data Eng. RA · RWTH',
      start: dy(2025, 2), end: dy(2025, 5),
      role: 'Data Engineering Research Assistant', company: 'RWTH Aachen · Learning Technologies', location: 'Aachen, DE',
      period: 'Feb 2025 - May 2025',
      bullets: [
        'Designed and deployed containerized analytic engines and RESTful APIs (Python/Flask + Docker) for real-time analysis of large student data across multiple German universities.',
        'Refactored the analysis pipeline with multiprocessing-based load balancing, making data processing up to 5× faster.',
      ],
      tags: ['Python', 'Flask', 'Docker', 'REST', 'Multiprocessing'],
    },
    {
      id: 'oelmuehle', lane: 3, kind: 'work-mag', label: 'Fullstack Dev · Ölmühle',
      start: dy(2025, 4), end: dy(2025, 5),
      role: 'Fullstack Developer', company: 'Teutoburger Ölmühle GmbH', location: 'Ibbenbüren, DE',
      period: 'Apr 2025 - May 2025',
      bullets: [
        'Fully redesigned and rebuilt the company intranet from scratch using Angular and FastAPI, after analyzing the legacy PHP multi-page-application codebase.',
        'Refactored the data pipeline to integrate directly with Microsoft NAV databases, enabling real-time data feedback.',
        'Introduced GitHub for version control and stood up a CI/CD pipeline via GitHub Actions.',
      ],
      tags: ['Angular', 'FastAPI', 'MS NAV', 'CI/CD', 'GitHub Actions'],
    },
    {
      id: 'gcf', lane: 3, kind: 'work-acid', label: 'Technical Business Partner · GCF',
      start: dy(2025, 7), end: dy(2026, 7),
      role: 'Technical Business Partner', company: 'Green Climate Fund (GCF) · under UNFCCC', location: 'Songdo, KR',
      period: 'Jul 2025 - Jul 2026',
      bullets: [
        'Led management of 18+ cross-departmental IT initiatives, translating organizational needs into technical requirements aligned with international IT standards (e.g. ISO 16326).',
        'End-to-end planning and execution of GCF\'s first-ever Tech & AI Exhibition at Board 44: 4+ months, 8 departments, 4 booths, 16+ initiatives.',
        'Built data pipelines and analytical models for climate forecasting and country vulnerability assessments (Microsoft Fabric, Kerchunk/NetCDF indexing, NLP).',
        'Designed an AI-assisted longlisting solution improving process efficiency 3× while maintaining evaluation quality.',
        'Developed enterprise Finance and HR platforms (Next.js, TypeScript, PostgreSQL, Azure, SAML/SCIM), including a multi-year budgeting platform with approval workflows, SSO and DocuSign integration.',
      ],
      tags: ['Microsoft Fabric', 'NetCDF', 'NLP', 'Next.js', 'Azure', 'SAML/SCIM', 'DocuSign', 'Project Management'],
      featured: true,
    },
    {
      id: 'hackseoul', lane: 4, kind: 'point', label: 'Hack Seoul 2025 win',
      start: dy(2025, 5), end: dy(2025, 5),
      role: '1st Place - Hack Seoul 2025', company: 'Coupang, Seoul', location: 'Seoul, KR',
      period: 'May 2025',
      bullets: ['Won "AI for Real-World Impact & Future Ventures" with GreenLenseAPI, an agentic AI microservice orchestra.'],
      tags: ['Agentic AI', 'Microservices', 'Hackathon'],
      image: 'assets/images/hackseoul2025.png',
    },
    {
      id: 'kaist', lane: 4, kind: 'edu', label: 'M.S. Data Science · KAIST',
      start: dy(2026, 9), end: dy(2028, 8),
      role: 'M.S. Data Science', company: 'KAIST · Graduate School of Data Science', location: 'Seoul, KR',
      period: 'Sep 2026 - Aug 2028',
      bullets: ['Pursuing graduate study in data science, deepening work at the intersection of industrial data systems and applied machine learning.'],
      tags: ['Data Science', 'KAIST', 'Graduate'],
    },
  ];

  // timeline span: earliest start .. (latest end year + 1), so nothing is cut off
  const RANGE_START = Math.floor(Math.min(...JOURNEY.map((e) => e.start)));
  const RANGE_END = Math.floor(Math.max(...JOURNEY.map((e) => e.end))) + 1;
  const SPAN = RANGE_END - RANGE_START;
  const pct = (v) => ((v - RANGE_START) / SPAN) * 100;

  function buildTimeline() {
    const lanesEl = $('[data-js-hook="journeyLanes"]');
    const axisEl = $('[data-js-hook="journeyAxis"]');
    if (!lanesEl || !axisEl) return;

    // vertical year axis (most recent at top, earliest at bottom)
    let axisHtml = '';
    for (let y = RANGE_START; y <= RANGE_END; y++) axisHtml += `<span class="journey__year" style="top:${100 - pct(y)}%;">'${String(y).slice(2)}</span>`;
    axisEl.innerHTML = axisHtml;

    const laneCount = 5;
    const lanes = Array.from({ length: laneCount }, () => []);
    JOURNEY.forEach((e) => { if (lanes[e.lane]) lanes[e.lane].push(e); });

    const SHORT = { gym: 'Robotics', bsc: 'B.Sc.', ta: 'DS TA', ra: 'DataEng RA', oelmuehle: 'Ölmühle', gcf: 'GCF', hackseoul: 'Hack Seoul', kaist: 'M.S.' };

    let html = '';
    lanes.forEach((items) => {
      html += '<div class="journey__lane">';
      items.forEach((e) => {
        if (e.kind === 'point') {
          const top = 100 - pct(e.start);
          html += `<button class="j-bar j-bar--point" data-id="${e.id}" style="top:${top}%;" aria-label="${e.label}"><span class="j-bar__lbl">${SHORT[e.id] || e.label}</span></button>`;
        } else {
          const top = 100 - pct(e.end);
          const h = Math.max(pct(e.end) - pct(e.start), 1.4);
          html += `<button class="j-bar j-bar--${e.kind}" data-id="${e.id}" style="top:${top}%;height:${h}%;" aria-label="${e.label}">${SHORT[e.id] || e.label}</button>`;
        }
      });
      html += '</div>';
    });
    lanesEl.innerHTML = html;

    const detail = $('[data-js-hook="journeyDetail"]');
    const detailInner = $('[data-js-hook="detailInner"]');
    const detailClose = $('[data-js-hook="detailClose"]');

    const open = (id) => {
      const e = JOURNEY.find((x) => x.id === id);
      if (!e || !detail) return;
      $$('.j-bar.is-active').forEach((b) => b.classList.remove('is-active'));
      const btn = $(`.j-bar[data-id="${id}"]`);
      if (btn) btn.classList.add('is-active');

      const media = e.image
        ? `<img src="${e.image}" alt="${e.company}">`
        : `<div class="detail__placeholder">// no preview attached<br>${e.company}</div>`;

      detailInner.innerHTML = `
        <div>
          <div class="detail__meta">${e.period} · ${e.location}</div>
          <h3 class="detail__role">${e.role}</h3>
          <p class="detail__co">${e.company}</p>
          <ul class="detail__bullets">${e.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          <div class="detail__tags">${e.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        </div>
        <div class="detail__media">${media}</div>`;
      detail.hidden = false;
      // wire the media thumb placeholder
      const mImg = $('img', detailInner);
      if (mImg && e.image) {
        mImg.addEventListener('error', () => {
          const wrap = mImg.parentElement;
          if (wrap) wrap.innerHTML = `<div class="detail__placeholder">// add image<br>${e.image}</div>`;
        });
      }
    };

    const close = () => {
      if (!detail) return;
      detail.hidden = true;
      $$('.j-bar.is-active').forEach((b) => b.classList.remove('is-active'));
    };

    $$('.j-bar', lanesEl).forEach((bar) => bar.addEventListener('click', () => open(bar.dataset.id)));
    detailClose?.addEventListener('click', close);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') close(); });
  }

  buildTimeline();

  // ===========================================================================
  // THUMB PLACEHOLDERS - swap to "// add image" when the image is missing
  // ===========================================================================
  $$('.thumb').forEach((t) => {
    const img = $('img', t);
    if (!img) { t.classList.add('is-missing'); return; }
    const mark = () => t.classList.add('is-missing');
    const clear = () => { if (img.naturalWidth > 0) t.classList.remove('is-missing'); };
    img.addEventListener('error', mark);
    img.addEventListener('load', clear);
    if (img.complete) { if (img.naturalWidth === 0) mark(); else clear(); }
  });

  // ===========================================================================
  // CONTACT-ME - hover scrambles/pixelates into "copy email (...)", click copies
  // ===========================================================================
  // CONTACT-ME - on hover the text pixelates (canvas) and resolves into the
  // email copy prompt; click copies the address. Canvas approach is used
  // because CSS/SVG filters on live text are unreliable across browsers.
  const contactBtn = $('[data-js-hook="contactMe"]');
  const contactText = $('[data-js-hook="contactText"]');
  const contactPx = $('[data-js-hook="contactPx"]');
  if (contactBtn && contactText && contactPx) {
    const pxctx = contactPx.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = null;
    const FONT = `11px 'CommitMono', ui-monospace, monospace`;
    const H = 16;

    // render `text` to the canvas at pixel-block size p (p=1 => crisp)
    const paint = (text, p) => {
      pxctx.setTransform(1, 0, 0, 1, 0, 0);
      pxctx.font = FONT;
      const w = Math.ceil(pxctx.measureText(text).width) + 2;
      contactPx.style.width = w + 'px';
      contactPx.style.height = H + 'px';
      contactPx.width = Math.floor(w * dpr);
      contactPx.height = Math.floor(H * dpr);
      // crisp offscreen render
      const off = document.createElement('canvas');
      off.width = contactPx.width; off.height = contactPx.height;
      const octx = off.getContext('2d');
      octx.scale(dpr, dpr);
      octx.font = FONT;
      octx.textBaseline = 'middle';
      octx.fillStyle = '#0a0a0b';
      octx.fillText(text, 1, H / 2);
      // downsample to a tiny grid, then upscale without smoothing => pixelated
      const tw = Math.max(1, Math.floor(contactPx.width / p));
      const th = Math.max(1, Math.floor(contactPx.height / p));
      const tiny = document.createElement('canvas');
      tiny.width = tw; tiny.height = th;
      const tctx = tiny.getContext('2d');
      tctx.imageSmoothingEnabled = true;
      tctx.drawImage(off, 0, 0, tw, th);
      pxctx.imageSmoothingEnabled = false;
      pxctx.clearRect(0, 0, contactPx.width, contactPx.height);
      pxctx.drawImage(tiny, 0, 0, contactPx.width, contactPx.height);
    };

    const animatePixelate = (text, fromP, toP, dur) => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - start) / dur);
        const p = fromP + (toP - fromP) * k;
        paint(text, Math.max(1, p));
        if (k < 1) raf = requestAnimationFrame(tick);
        else paint(text, 1);
      };
      raf = requestAnimationFrame(tick);
    };

    const copyEmail = async () => {
      const email = contactBtn.dataset.email || '';
      try { await navigator.clipboard.writeText(email); }
      catch {
        const ta = document.createElement('textarea');
        ta.value = email; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch {}
        ta.remove();
      }
      const hint = contactBtn.querySelector('.contact-me__hint');
      contactBtn.classList.add('copied');
      if (hint) hint.textContent = '[copied]';
      setTimeout(() => { contactBtn.classList.remove('copied'); if (hint) hint.textContent = '[click]'; }, 1600);
    };

    contactBtn.addEventListener('mouseenter', () => animatePixelate(contactBtn.dataset.hover, 9, 1, 320));
    contactBtn.addEventListener('mouseleave', () => cancelAnimationFrame(raf));
    contactBtn.addEventListener('click', copyEmail);
  }

  // ===========================================================================
  // HEADER SCROLL + ACTIVE NAV + MOBILE MENU
  // ===========================================================================
  const header = $('[data-js-hook="siteHeader"]');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navLinks = $$('.nav__link');
  const cols = $$('section.col[id]');
  const deck = $('.deck');
  const arrowLeft = $('[data-js-hook="deckLeft"]');
  const arrowRight = $('[data-js-hook="deckRight"]');
  const setActive = (id) => {
    navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  };
  const updateArrows = () => {
    if (!deck) return;
    const max = deck.scrollWidth - deck.clientWidth - 2;
    if (arrowLeft) arrowLeft.disabled = deck.scrollLeft <= 2;
    if (arrowRight) arrowRight.disabled = deck.scrollLeft >= max;
  };
  // distance between two column left edges = one column + gap (works with margins/gaps)
  const colStep = () => cols.length > 1 ? (cols[1].offsetLeft - cols[0].offsetLeft) : (deck ? deck.clientWidth / 4 : 0);
  // active nav = the column at the deck's left edge
  const activeFromScroll = () => {
    if (!deck) return;
    const step = colStep() || 1;
    const idx = Math.round(deck.scrollLeft / step);
    const col = cols[idx] || cols[0];
    if (col) setActive(col.id);
    updateArrows();
  };
  const pageBy = (dir) => {
    if (!deck) return;
    deck.scrollBy({ left: dir * colStep(), behavior: 'smooth' });
  };
  navLinks.forEach((l) => {
    l.addEventListener('click', (ev) => {
      const id = l.getAttribute('href').slice(1);
      const col = document.getElementById(id);
      if (!col) return;
      ev.preventDefault();
      col.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      setActive(id);
    });
  });
  arrowLeft?.addEventListener('click', () => pageBy(-1));
  arrowRight?.addEventListener('click', () => pageBy(1));
  if (deck) deck.addEventListener('scroll', activeFromScroll, { passive: true });
  activeFromScroll();

  const toggle = $('#nav-toggle');
  toggle?.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__link').forEach((l) => l.addEventListener('click', () => {
    header?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  // ===========================================================================
  // SCROLL REVEAL
  // ===========================================================================
  if (!reduceMotion) {
    const revealEls = $$('.proj, .pub, .cert, .mini, .fact');
    revealEls.forEach((el) => el.setAttribute('data-reveal', ''));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  // ===========================================================================
  // FOOTER YEAR
  // ===========================================================================
  const fy = $('[data-js-hook="footerYear"]');
  if (fy) fy.textContent = new Date().getFullYear();

  console.log('%c// portfolio online - dragon chasing cursor', 'color:#b6ff3c');
})();
