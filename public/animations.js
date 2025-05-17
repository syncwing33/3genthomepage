// 萤火虫动画
const canvas = document.getElementById('fireflies');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 发光效果
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        if (particle.size <= 0.2) {
            particles[index] = new Particle();
        }
    });

    requestAnimationFrame(animate);
}

init();
animate();

// 标题动画
function animateTitle() {
    const timeline = anime.timeline({
        easing: 'easeOutExpo'
    });

    // 设置初始状态
    anime.set(['.letter-build', '.letter-something', '.letter-amazing'], {
        opacity: 0,
        translateY: 20
    });

    anime.set('.title-line', {
        width: 0
    });

    // 动画序列
    timeline
        .add({
            targets: ['.letter-build', '.letter-something', '.letter-amazing'],
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1200,
            delay: anime.stagger(200),
            easing: 'easeOutElastic(1, .8)'
        })
        .add({
            targets: '.title-line',
            width: ['0%', '100%'],
            duration: 1200,
            easing: 'easeInOutQuart'
        }, '-=800');
}

// 页面加载时启动动画
document.addEventListener('DOMContentLoaded', () => {
    animateTitle();
});

// 响应窗口大小变化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 光标跟随动画
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    // 平滑跟随效果
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    
    // 应用变换
    cursorFollower.style.transform = `translate(${currentX - 12}px, ${currentY - 12}px)`;
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// 交互效果
const interactiveElements = document.querySelectorAll('a, textarea, button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// 在文档范围内隐藏默认光标
document.body.style.cursor = 'none';

// 在可交互元素上显示默认光标
interactiveElements.forEach(el => {
    el.style.cursor = 'pointer';
});

// 设计提示词列表
const designPrompts = [
    {
        prompt: "为我的咖啡店设计一个简约现代的Logo...",
        preview: `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">☕</div>
                <div style="font-family: 'Helvetica Neue'; font-size: 32px; color: #fff;">BREW</div>
                <div style="color: rgba(255,255,255,0.7); margin-top: 10px;">ARTISAN COFFEE</div>
            </div>
        `
    },
    {
        prompt: "设计一个科技感十足的手机App界面...",
        preview: `
            <div style="display: flex; gap: 20px;">
                <div style="width: 120px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 15px;">
                    <div style="width: 100%; height: 100px; background: rgba(74,158,255,0.3); border-radius: 10px; margin-bottom: 10px;"></div>
                    <div style="width: 80%; height: 20px; background: rgba(255,255,255,0.2); border-radius: 5px; margin-bottom: 10px;"></div>
                    <div style="width: 60%; height: 20px; background: rgba(255,255,255,0.2); border-radius: 5px;"></div>
                </div>
                <div style="width: 120px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 15px;">
                    <div style="width: 100%; height: 100px; background: rgba(158,74,255,0.3); border-radius: 10px; margin-bottom: 10px;"></div>
                    <div style="width: 80%; height: 20px; background: rgba(255,255,255,0.2); border-radius: 5px; margin-bottom: 10px;"></div>
                    <div style="width: 60%; height: 20px; background: rgba(255,255,255,0.2); border-radius: 5px;"></div>
                </div>
            </div>
        `
    },
    {
        prompt: "为我的电子音乐专辑创作一个充满未来感的封面...",
        preview: `
            <div style="width: 300px; height: 300px; background: linear-gradient(45deg, #4a9eff, #9e4aff); border-radius: 20px; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden;">
                <div style="position: absolute; width: 200px; height: 200px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; animation: rotate 10s linear infinite;"></div>
                <div style="position: absolute; width: 150px; height: 150px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; animation: rotate 7s linear infinite reverse;"></div>
                <div style="font-size: 24px; color: #fff; text-align: center; text-transform: uppercase; letter-spacing: 4px;">SYNTH<br>WAVE</div>
            </div>
        `
    },
    {
        prompt: "设计一个极简主义风格的社交媒体图标...",
        preview: `
            <div style="display: flex; gap: 30px; justify-content: center; align-items: center;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #FF6B6B, #FF8E8E); border-radius: 20px; display: flex; justify-content: center; align-items: center;">
                    <div style="width: 40px; height: 40px; border: 3px solid #fff; border-radius: 12px;"></div>
                </div>
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4ECDC4, #45B7AF); border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                    <div style="width: 40px; height: 40px; border: 3px solid #fff; border-radius: 50%;"></div>
                </div>
            </div>
        `
    },
    {
        prompt: "为一个高端餐厅设计优雅的菜单布局...",
        preview: `
            <div style="width: 300px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-family: 'Playfair Display', serif; font-size: 24px; color: #fff;">MENU</div>
                    <div style="width: 40px; height: 2px; background: rgba(255,255,255,0.5); margin: 10px auto;"></div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <div style="color: #fff;">精选前菜</div>
                        <div style="color: rgba(255,255,255,0.7);">¥128</div>
                    </div>
                    <div style="color: rgba(255,255,255,0.5); font-size: 14px;">时令食材 | 主厨推荐</div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <div style="color: #fff;">主厨特制</div>
                        <div style="color: rgba(255,255,255,0.7);">¥328</div>
                    </div>
                    <div style="color: rgba(255,255,255,0.5); font-size: 14px;">限量供应 | 预约专享</div>
                </div>
            </div>
        `
    }
];

let currentPromptIndex = 0;
const promptContainer = document.getElementById('promptSuggestions');
const previewContent = document.querySelector('.preview-content');
const designPromptInput = document.getElementById('designPrompt');

// 更新提示词和预览
function updatePromptAndPreview() {
    const currentPrompt = designPrompts[currentPromptIndex];
    
    // 更新提示词
    const suggestionSpan = document.createElement('span');
    suggestionSpan.className = 'suggestion';
    suggestionSpan.textContent = currentPrompt.prompt;
    
    // 优化提示词过渡动画
    anime.timeline({
        easing: 'easeOutExpo'
    }).add({
        targets: '.suggestion',
        opacity: 0,
        translateY: -20,
        duration: 600,
        complete: () => {
            promptContainer.innerHTML = '';
            promptContainer.appendChild(suggestionSpan);
        }
    }).add({
        targets: suggestionSpan,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 100
    });

    // 优化预览内容过渡
    anime.timeline({
        easing: 'easeOutExpo'
    }).add({
        targets: '.preview-content',
        opacity: 0,
        scale: 0.95,
        duration: 400,
        complete: () => {
            previewContent.innerHTML = currentPrompt.preview;
        }
    }).add({
        targets: '.preview-content',
        opacity: 1,
        scale: 1,
        duration: 600,
        delay: 100
    });
}

// 自动切换提示词
setInterval(() => {
    currentPromptIndex = (currentPromptIndex + 1) % designPrompts.length;
    updatePromptAndPreview();
}, 5000);

// 输入框焦点特效
designPromptInput.addEventListener('focus', () => {
    anime({
        targets: '.prompt-container',
        scale: 1.02,
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    });
    
    // 添加光晕效果
    document.querySelector('.prompt-container').classList.add('focused');
});

designPromptInput.addEventListener('blur', () => {
    anime({
        targets: '.prompt-container',
        scale: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
    });
    
    // 移除光晕效果
    document.querySelector('.prompt-container').classList.remove('focused');
});

// 添加旋转动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;