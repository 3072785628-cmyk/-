/* ============================================================
   诚心的心 · 交互
   ★ 老师可改的配置都在 CONFIG 里
   ============================================================ */
const CONFIG = {
  password: "0224",                 // 网页密码
  successText: "诚心的心已开启",      // 输入成功出现
  hint: "两个人都记得的那一天 · 四位数字", // 密码提示（可改成你们的暗号）
  // 背景音乐：把 mp3 放进 assets/bgm/ 文件夹，文件名对上即可
  bgm: [
    { title: "爱人", src: "assets/bgm/爱人.mp3" },
  ]
};

/* ---------- 软门禁：没解锁就退回密码门 ---------- */
function guard(){
  try{
    if(sessionStorage.getItem("cx_open") !== "1"){
      location.replace("index.html");
    }
  }catch(e){/* 无存储环境则放行 */}
}

/* ---------- 涂黑档案：点一下揭开 ---------- */
function initSlots(){
  document.querySelectorAll(".slot").forEach(s=>{
    s.addEventListener("click",()=>s.classList.toggle("open"));
  });
}

/* ---------- BGM 播放器 ---------- */
function initBgm(){
  const bar = document.querySelector(".bgm");
  if(!bar) return;
  let i = 0;
  const audio = new Audio();
  audio.loop = false;
  const titleEl = bar.querySelector(".title");
  const load = ()=>{ audio.src = CONFIG.bgm[i].src; titleEl.textContent = CONFIG.bgm[i].title; };
  load();
  audio.addEventListener("ended",()=>{ i=(i+1)%CONFIG.bgm.length; load(); audio.play().catch(()=>{}); });
  const btn = bar.querySelector(".toggle");
  btn.addEventListener("click",()=>{
    if(audio.paused){ audio.play().then(()=>bar.classList.remove("paused")).catch(()=>{}); }
    else { audio.pause(); bar.classList.add("paused"); }
  });
  bar.querySelector(".next")?.addEventListener("click",()=>{
    i=(i+1)%CONFIG.bgm.length; load();
    if(!audio.paused) audio.play().catch(()=>{});
  });
  bar.classList.add("paused"); // 浏览器默认禁止自动播放，需老师点一下
}

document.addEventListener("DOMContentLoaded",()=>{
  if(document.body.dataset.guard === "1") guard();
  initSlots();
  initBgm();
});
