// Função para animação de scroll suave
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.area-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header transparente/sólido baseado no scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        // Esconder/mostrar header baseado na direção do scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Adicionar classe ativa ao link do menu baseado na seção atual
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Efeito de hover nos cards das áreas de atuação
    const areaCards = document.querySelectorAll('.area-card');
    
    areaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contador de anos de experiência (animação)
    const experienceText = document.querySelector('.subtitle');
    if (experienceText) {
        const originalText = experienceText.textContent;
        const years = '12';
        
        // Animar o número de anos
        let currentYear = 0;
        const targetYear = parseInt(years);
        const duration = 2000; // 2 segundos
        const increment = targetYear / (duration / 16); // 60fps
        
        const animateYears = () => {
            currentYear += increment;
            if (currentYear < targetYear) {
                experienceText.textContent = `Atuando na área há ${Math.floor(currentYear)} anos com dedicação e excelência`;
                requestAnimationFrame(animateYears);
            } else {
                experienceText.textContent = originalText;
            }
        };
        
        // Iniciar animação quando a seção estiver visível
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateYears, 500);
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        heroObserver.observe(document.querySelector('.hero'));
    }

    // Adicionar efeito de loading para o WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adicionar efeito de loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
            this.style.pointerEvents = 'none';
            
            // Restaurar após um breve delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });

    // Preloader simples
    window.addEventListener('load', function() {
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--preto);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        preloader.innerHTML = `
            <div style="text-align: center; color: var(--dourado);">
                <i class="fas fa-balance-scale" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p style="font-family: 'Playfair Display', serif; font-size: 1.5rem;">Czeck Advogados</p>
            </div>
        `;
        
        document.body.appendChild(preloader);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
});

// Função para validar formulário (caso seja adicionado no futuro)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Email inválido');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    return errors;
}

// Função para enviar dados do formulário (caso seja adicionado no futuro)
function submitForm(formData) {
    // Aqui você pode implementar a lógica para enviar os dados
    // Por exemplo, usando fetch para uma API ou EmailJS
    console.log('Dados do formulário:', formData);
    
    // Simular envio
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Mensagem enviada com sucesso!' });
        }, 1000);
    });
} 