document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initParticles();
    initCharacterEffects();
    initMagicButton();
    initTypingEffect();
    
    // 粒子系統
    function initParticles() {
        const particlesContainer = document.querySelector('.particles');
        
        // 創建浮動粒子
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.opacity = Math.random() * 0.8 + 0.2;
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            particlesContainer.appendChild(particle);
            
            // 動畫
            const duration = Math.random() * 3000 + 2000;
            const drift = (Math.random() - 0.5) * 200;
            
            particle.animate([
                { 
                    transform: 'translateY(0px) translateX(0px) rotate(0deg)',
                    opacity: particle.style.opacity 
                },
                { 
                    transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(360deg)`,
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'linear'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
        
        // 定期創建粒子
        setInterval(createParticle, 200);
    }
    
    // 字符特效
    function initCharacterEffects() {
        const chars = document.querySelectorAll('.char');
        
        chars.forEach((char, index) => {
            // 滑鼠懸停效果
            char.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                createSparkles(this);
            });
            
            char.addEventListener('mouseleave', function() {
                this.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`;
            });
            
            // 點擊效果
            char.addEventListener('click', function() {
                createExplosion(this);
                this.style.transform = 'scale(1.5) rotate(720deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 800);
            });
        });
    }
    
    // 創建火花效果
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = `hsl(${Math.random() * 60 + 20}, 100%, 70%)`;
            sparkle.style.borderRadius = '50%';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}`;
            
            document.body.appendChild(sparkle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            sparkle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`,
                    opacity: 0 
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(sparkle);
            };
        }
    }
    
    // 創建爆炸效果
    function createExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            const fragment = document.createElement('div');
            fragment.style.position = 'fixed';
            fragment.style.width = Math.random() * 8 + 4 + 'px';
            fragment.style.height = fragment.style.width;
            fragment.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
            fragment.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            fragment.style.left = centerX + 'px';
            fragment.style.top = centerY + 'px';
            fragment.style.pointerEvents = 'none';
            fragment.style.zIndex = '1000';
            fragment.style.boxShadow = `0 0 15px ${fragment.style.background}`;
            
            document.body.appendChild(fragment);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance + Math.random() * 50;
            
            fragment.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0) rotate(720deg)`,
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                if (fragment.parentNode) {
                    document.body.removeChild(fragment);
                }
            };
        }
    }
    
    // 魔法按鈕效果
    function initMagicButton() {
        const magicBtn = document.getElementById('magicBtn');
        const heartContainer = document.getElementById('heartContainer');
        
        magicBtn.addEventListener('click', function() {
            // 按鈕動畫
            this.style.animation = 'none';
            this.style.transform = 'scale(0.8)';
            this.textContent = '✨ 魔法施展中... ✨';
            
            setTimeout(() => {
                this.style.transform = '';
                this.textContent = '點擊施展魔法 ✨';
            }, 1000);
            
            // 創建煙火效果
            createFireworks();
            
            // 全屏閃爍效果
            createScreenFlash();
            
            // 改變背景顏色
            changeBackgroundColors();
        });
    }
    
    // 煙火效果
    function createFireworks() {
        const heartContainer = document.getElementById('heartContainer');
        const colors = ['#f39c12', '#e74c3c', '#74b9ff', '#00cec9', '#fdcb6e', '#e17055'];
        
        // 創建多個煙火爆炸點
        for (let firework = 0; firework < 3; firework++) {
            setTimeout(() => {
                // 隨機位置發射煙火
                const centerX = Math.random() * 80 + 10; // 10% 到 90% 的位置
                const centerY = Math.random() * 50 + 20; // 相對容器的位置
                
                // 創建煙火爆炸效果
                for (let i = 0; i < 15; i++) {
                    const spark = document.createElement('div');
                    const sparkColor = colors[Math.floor(Math.random() * colors.length)];
                    
                    // 隨機選擇星星或圓點
                    const isStarShape = Math.random() > 0.5;
                    if (isStarShape) {
                        spark.innerHTML = '✨';
                        spark.style.fontSize = Math.random() * 15 + 10 + 'px';
                    } else {
                        spark.style.width = Math.random() * 8 + 4 + 'px';
                        spark.style.height = spark.style.width;
                        spark.style.borderRadius = '50%';
                        spark.style.background = sparkColor;
                    }
                    
                    spark.style.position = 'absolute';
                    spark.style.left = centerX + '%';
                    spark.style.top = centerY + '%';
                    spark.style.color = sparkColor;
                    spark.style.boxShadow = `0 0 15px ${sparkColor}`;
                    spark.style.pointerEvents = 'none';
                    spark.style.zIndex = '100';
                    
                    heartContainer.appendChild(spark);
                    
                    // 計算爆炸方向
                    const angle = (i / 15) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
                    const distance = Math.random() * 100 + 50;
                    const endX = Math.cos(angle) * distance;
                    const endY = Math.sin(angle) * distance;
                    
                    // 煙火粒子動畫
                    spark.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(0)',
                            opacity: 1 
                        },
                        { 
                            transform: `translate(${endX}px, ${endY}px) scale(1)`,
                            opacity: 1 
                        },
                        { 
                            transform: `translate(${endX * 1.5}px, ${endY * 1.5 + 30}px) scale(0.3)`,
                            opacity: 0 
                        }
                    ], {
                        duration: 1500 + Math.random() * 500,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }).onfinish = () => {
                        if (spark.parentNode) {
                            spark.parentNode.removeChild(spark);
                        }
                    };
                }
                
                // 創建煙火爆炸的中心光效
                const centerFlash = document.createElement('div');
                centerFlash.style.position = 'absolute';
                centerFlash.style.left = centerX + '%';
                centerFlash.style.top = centerY + '%';
                centerFlash.style.width = '20px';
                centerFlash.style.height = '20px';
                centerFlash.style.borderRadius = '50%';
                centerFlash.style.background = 'rgba(255, 255, 255, 0.8)';
                centerFlash.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
                centerFlash.style.pointerEvents = 'none';
                centerFlash.style.zIndex = '99';
                
                heartContainer.appendChild(centerFlash);
                
                centerFlash.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(0)',
                        opacity: 1 
                    },
                    { 
                        transform: 'translate(-50%, -50%) scale(3)',
                        opacity: 0 
                    }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                }).onfinish = () => {
                    if (centerFlash.parentNode) {
                        centerFlash.parentNode.removeChild(centerFlash);
                    }
                };
                
            }, firework * 600); // 每個煙火間隔600ms
        }
    }
    
    // 全屏閃爍效果
    function createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'rgba(255, 255, 255, 0.8)';
        flash.style.zIndex = '9999';
        flash.style.pointerEvents = 'none';
        
        document.body.appendChild(flash);
        
        flash.animate([
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 300,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(flash);
        };
    }
    
    // 改變背景顏色
    function changeBackgroundColors() {
        const body = document.body;
        const originalBackground = body.style.background;
        
        body.style.background = 'linear-gradient(45deg, #ff0066, #6600ff, #00ffff, #ffff00, #ff6600, #ff0066)';
        body.style.backgroundSize = '600% 600%';
        body.style.animation = 'gradientShift 0.5s ease infinite';
        
        setTimeout(() => {
            body.style.background = '';
            body.style.animation = '';
        }, 3000);
    }
    
    // 打字機效果（可選）
    function initTypingEffect() {
        const subtitle = document.querySelector('.subtitle');
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
    
    // 滑鼠移動粒子跟隨效果
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        if (mouseTrail.length > 10) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '6px';
        trail.style.height = '6px';
        trail.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        trail.style.borderRadius = '50%';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '1000';
        trail.style.boxShadow = `0 0 10px ${trail.style.background}`;
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        trail.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8 
            },
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        };
    });
    
    // 鍵盤快捷鍵
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            document.getElementById('magicBtn').click();
        }
    });
});