document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Капча
    const captchaText = document.getElementById('captchaText');
    const refreshCaptcha = document.getElementById('refreshCaptcha');
    let captchaSolution = '';
    
    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        captchaSolution = '';
        for (let i = 0; i < 6; i++) {
            captchaSolution += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText.textContent = captchaSolution;
    }
    
    generateCaptcha();
    
    refreshCaptcha.addEventListener('click', generateCaptcha);
    
    // Отправка формы в Telegram
    const tourForm = document.getElementById('tourForm');
    
    tourForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка капчи
        const userCaptcha = document.getElementById('captcha').value;
        if (userCaptcha !== captchaSolution) {
            alert('Неверный код с картинки. Пожалуйста, попробуйте еще раз.');
            generateCaptcha();
            return;
        }
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const tour = document.getElementById('tour').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value;
        
        // Здесь нужно указать ваш Telegram бот токен и chat_id
        const botToken = '7792748054:AAGS_tKBpNyZq49mfwp0mmflWBl-z_8MhOo';
        const chatId = '6437889683';
        
        const text = `Новая заявка на тур!\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || 'не указан'}\nТур: ${tour || 'не выбран'}\nДаты: ${date || 'не указаны'}\nСообщение: ${message || 'нет'}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            tourForm.reset();
            generateCaptcha();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.');
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            navLinks.classList.remove('active');
        });
    });
});