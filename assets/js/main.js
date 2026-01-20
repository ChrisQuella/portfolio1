document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initCarousel();
  initWorksTabs();
  initGalleryFilters();
  initLightbox();
  initContactForm();
  
  // 渲染内容
  renderProjects();
  renderGallery();
  renderVideos();
  renderOthers();
  renderCarousel();
});

// ================= 主题切换 =================
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const htmlEl = document.documentElement;

  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ================= 平滑滚动 =================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ================= 轮播图 =================
let currentSlide = 0;
const carouselData = [
  {
    img: "assets/images/Portfolio-01.png",
    title: "编程项目展示",
    desc: "使用现代技术栈开发的Web应用"
  },
  {
    img: "assets/images/Portfolio-02.png",
    title: "AI绘画作品",
    desc: "使用Stable Diffusion创作的艺术作品"
  },
  {
    img: "assets/images/Portfolio-03.png",
    title: "AI视频创作",
    desc: "结合AI技术制作的创意视频"
  }
];

function renderCarousel() {
  const track = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!track || !dotsContainer) return;
  
  track.innerHTML = carouselData.map((item, index) => `
    <div class="carousel-slide">
      <img src="${item.img}" alt="${item.title}">
      <div class="slide-info">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
  
  dotsContainer.innerHTML = carouselData.map((_, index) => `
    <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
  `).join('');
}

function initCarousel() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel(1));
  
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        goToSlide(parseInt(e.target.dataset.index));
      }
    });
  }
  
  // 自动轮播
  setInterval(() => moveCarousel(1), 5000);
}

function moveCarousel(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = carouselData.length - 1;
  if (currentSlide >= carouselData.length) currentSlide = 0;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// ================= 作品标签切换 =================
function initWorksTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.works-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
    });
  });
}

// ================= 编程项目 =================
const projectsData = [
  {
    img: "assets/images/club-system-login.png",
    title: "社团管理系统",
    desc: "基于Spring Boot + Vue的高校社团管理系统，支持社团管理、活动发布、成员管理等功能",
    tech: ["Java", "Spring Boot", "Vue.js", "MySQL"],
    github: "https://github.com/ChrisQuella",
    demo: "pages/projects/project-club.html"
  },
  {
    img: "assets/images/md2word-cover.png",
    title: "Markdown转Word工具",
    desc: "功能丰富的Markdown转Word文档工具，提供学术版、开发者版、办公版三个专业版本",
    tech: ["JavaScript", "Electron", "marked.js", "docx.js"],
    github: "https://github.com/ChrisQuella",
    demo: "pages/projects/project-md2word.html"
  },
  {
    img: "assets/images/image-compress.png",
    title: "在线图片压缩工具",
    desc: "简单易用的在线证件照压缩工具，智能压缩至1M以下，保持原有尺寸",
    tech: ["HTML5", "Canvas API", "JavaScript"],
    github: "https://github.com/ChrisQuella",
    demo: "pages/projects/project-image-compress.html"
  },
  {
    img: "assets/images/writing-assistant.png",
    title: "智能写作助手",
    desc: "基于智谱AI的智能写作辅助工具，支持6种写作模式和流式输出，提供历史记录管理",
    tech: ["JavaScript", "AI API", "Markdown", "Tailwind CSS"],
    github: "https://github.com/ChrisQuella",
    demo: "pages/projects/project-writing-assistant.html"
  }
];

function renderProjects() {
  const grid = document.querySelector('#programming .projects-grid');
  if (!grid) return;
  
  grid.innerHTML = projectsData.map(project => `
    <div class="project-card">
      <img src="${project.img}" alt="${project.title}">
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="tech-stack">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="card-links">
          <a href="${project.github}" target="_blank" class="card-link">
            <i class="fab fa-github"></i> 代码
          </a>
          <a href="${project.demo}" class="card-link">
            <i class="fas fa-external-link-alt"></i> 演示
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ================= AI绘画画廊 =================
const galleryData = [
  { img: "assets/images/Portfolio-01.png", title: "作品1", category: "portrait" },
  { img: "assets/images/Portfolio-02.png", title: "作品2", category: "landscape" },
  { img: "assets/images/Portfolio-03.png", title: "作品3", category: "abstract" },
  { img: "assets/images/Portfolio-01-1.png", title: "作品4", category: "anime" },
  { img: "assets/images/Portfolio-01-2.png", title: "作品5", category: "portrait" },
  { img: "assets/images/Portfolio-02-1.png", title: "作品6", category: "landscape" }
];

function renderGallery(filter = 'all') {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;
  
  const filtered = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-image"></i>
        <p>暂无该分类的作品</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(item => `
    <div class="gallery-item" data-category="${item.category}">
      <img src="${item.img}" alt="${item.title}">
      <div class="overlay">
        <span>${item.title}</span>
      </div>
    </div>
  `).join('');
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
}

// ================= 视频作品 =================
const videosData = [
  {
    title: "AI视频创作演示",
    desc: "使用Runway Gen-2制作的创意短片",
    // 这里可以替换为实际的视频嵌入链接
    embedUrl: ""
  },
  {
    title: "动态图像生成",
    desc: "将AI绘画作品转化为动态视频",
    embedUrl: ""
  }
];

function renderVideos() {
  const grid = document.querySelector('.video-grid');
  if (!grid) return;
  
  if (videosData.length === 0 || !videosData[0].embedUrl) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-video"></i>
        <p>视频作品正在准备中，敬请期待...</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = videosData.map(video => `
    <div class="video-card">
      <div class="video-wrapper">
        <iframe src="${video.embedUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.desc}</p>
      </div>
    </div>
  `).join('');
}

// ================= 其他创作 =================
const othersData = [
  {
    icon: "fas fa-pen-fancy",
    title: "技术博客",
    desc: "分享编程学习心得和技术文章"
  },
  {
    icon: "fas fa-camera",
    title: "摄影作品",
    desc: "记录生活中的美好瞬间"
  },
  {
    icon: "fas fa-music",
    title: "AI音乐",
    desc: "探索AI音乐创作的可能性"
  }
];

function renderOthers() {
  const grid = document.querySelector('.others-grid');
  if (!grid) return;
  
  grid.innerHTML = othersData.map(item => `
    <div class="other-card">
      <div class="card-icon">
        <i class="${item.icon}"></i>
      </div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');
}

// ================= 图片灯箱 =================
function initLightbox() {
  // 创建灯箱元素
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close"><i class="fas fa-times"></i></button>
    <img src="" alt="预览图片">
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  
  // 点击画廊图片打开灯箱
  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
      const img = galleryItem.querySelector('img');
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    }
  });
  
  // 关闭灯箱
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
  
  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}

// ================= 联系表单 =================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // 如果使用Formspree，表单会自动提交
  // 添加提交状态提示
  form.addEventListener('submit', (e) => {
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    submitBtn.disabled = true;
  });
}


// ================= 复制功能 =================
document.addEventListener('click', (e) => {
  const copyBtn = e.target.closest('.copy-btn');
  if (!copyBtn) return;
  
  const text = copyBtn.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
  });
});
