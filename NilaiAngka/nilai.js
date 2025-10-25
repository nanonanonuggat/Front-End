// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.querySelector('.submit-btn');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const togglePasswordBtn = document.querySelector('.toggle-password');
const usernameInput = document.getElementById('username');
const usernameStatus = document.getElementById('usernameStatus');

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    
    this.innerHTML = type === 'password' ? '<i class="bx bx-hide"></i>' : '<i class="bx bx-show"></i>';
});

// Password Strength Checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    
    strengthFill.style.width = strength.percentage + '%';
    strengthFill.style.background = strength.color;
    strengthText.textContent = strength.text;
    strengthText.style.color = strength.color;
});

function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengthLevels = [
        { percentage: 25, color: '#ef4444', text: 'Weak' },
        { percentage: 50, color: '#f59e0b', text: 'Fair' },
        { percentage: 75, color: '#06b6d4', text: 'Good' },
        { percentage: 100, color: '#10b981', text: 'Strong' }
    ];
    
    return strengthLevels[Math.min(score, strengthLevels.length - 1)];
}

// Username Availability Check (Simulated)
usernameInput.addEventListener('input', function() {
    const username = this.value;
    
    if (username.length < 3) {
        usernameStatus.textContent = '';
        usernameStatus.className = 'username-available';
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        const takenUsernames = ['admin', 'user', 'test', 'keycraze'];
        const isAvailable = !takenUsernames.includes(username.toLowerCase());
        
        if (isAvailable) {
            usernameStatus.textContent = '✓ Available';
            usernameStatus.className = 'username-available available';
        } else {
            usernameStatus.textContent = '✗ Taken';
            usernameStatus.className = 'username-available taken';
        }
    }, 500);
});

// Form Validation
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
        showError('Password tidak cocok!');
        submitBtn.classList.remove('loading');
        return;
    }
    
    // Validate password strength
    if (checkPasswordStrength(data.password).percentage < 50) {
        showError('Password terlalu lemah! Pilih password yang lebih kuat.');
        submitBtn.classList.remove('loading');
        return;
    }
    
    // Validasi Section Baru: Nilai Angka
    if (!data.customerRating) {
        showError('Harap pilih nilai angka untuk kepuasan pelanggan!');
        submitBtn.classList.remove('loading');
        return;
    }
    
    // Validasi Section Baru: Nilai Huruf
    if (!data.productGrade) {
        showError('Harap pilih nilai huruf untuk penilaian produk!');
        submitBtn.classList.remove('loading');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Update summary data
        document.getElementById('summary-fullname').textContent = 
            data.firstName + ' ' + data.lastName;
        document.getElementById('summary-username').textContent = data.username;
        document.getElementById('summary-email').textContent = data.email;
        document.getElementById('summary-phone').textContent = data.phone;
        
        // Update data section baru
        document.getElementById('summary-rating').textContent = 
            data.customerRating ? data.customerRating + '/5' : '-';
        document.getElementById('summary-grade').textContent = 
            data.productGrade ? data.productGrade : '-';
        
        // Show success message
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset loading state
        submitBtn.classList.remove('loading');
        
        // Log data sesuai instruksi tugas
        console.log('Nama Lengkap : ' + data.firstName + ' ' + data.lastName);
        console.log('Rating Kepuasan Pelanggan: ' + data.customerRating + '/5');
        console.log('Grade Penilaian Produk: ' + data.productGrade);
        console.log('Data lengkap registrasi:', data);
    }, 2000);
});

// Fungsi Lanjut Order
function continueOrder() {
    alert('🎉 Selamat! Anda akan diarahkan ke halaman order...');
    // Redirect ke halaman order
    // window.location.href = '/order.html';
}

// Fungsi Reset Form
function resetForm() {
    registrationForm.reset();
    registrationForm.style.display = 'block';
    successMessage.style.display = 'none';
    strengthFill.style.width = '0%';
    strengthText.textContent = 'Weak';
    usernameStatus.textContent = '';
    
    // Reset radio buttons untuk section baru
    const ratingRadios = document.querySelectorAll('input[name="customerRating"]');
    const gradeRadios = document.querySelectorAll('input[name="productGrade"]');
    
    ratingRadios.forEach(radio => radio.checked = false);
    gradeRadios.forEach(radio => radio.checked = false);
    
    // Reset summary data section baru
    document.getElementById('summary-rating').textContent = '-';
    document.getElementById('summary-grade').textContent = '-';
}

// Helper Functions
function showError(message) {
    // You can implement a proper error display system here
    alert(message);
}

// Real-time Password Confirmation Check
confirmPasswordInput.addEventListener('input', function() {
    if (this.value && passwordInput.value !== this.value) {
        this.style.borderColor = 'var(--accent-red)';
    } else {
        this.style.borderColor = 'var(--bg-surface)';
    }
});

// SECTION BARU: Event Listeners untuk Rating
document.querySelectorAll('input[name="customerRating"]').forEach(radio => {
    radio.addEventListener('change', function() {
        console.log('Rating Kepuasan Pelanggan dipilih:', this.value);
    });
});

// SECTION BARU: Event Listeners untuk Grade
document.querySelectorAll('input[name="productGrade"]').forEach(radio => {
    radio.addEventListener('change', function() {
        console.log('Grade Penilaian Produk dipilih:', this.value);
    });
});

// Auto-focus pertama kali
window.addEventListener('load', function() {
    document.getElementById('firstName').focus();
});