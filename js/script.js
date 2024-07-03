document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const phoneForm = document.getElementById('phoneForm');
    const otpForm = document.getElementById('otpForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const otpInputs = document.querySelectorAll('.otp-input');
    const phoneError = document.getElementById('phoneError');
    const otpError = document.getElementById('otpError');
    const loader = document.getElementById('loader');
    const storedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    phoneForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        const phoneNumber = phoneNumberInput.value;
        if (/^\d{10}$/.test(phoneNumber)) {
            localStorage.setItem('otp', storedOTP);
            container.style.display="none"
            Swal.fire({
                title: 'Your OTP',
                text: `Your OTP is ${storedOTP}`,
                icon: 'success',
                confirmButtonText: 'Proceed'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'otp.html';
                }else{
                    container.style.display = 'block';
                }
            });
        } else {
            phoneNumberInput.classList.add('is-invalid');
            phoneError.classList.add('visible');
        }
    });
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (!/^\d*$/.test(input.value)) {
                input.value = '';
            } else if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            otpError.classList.remove('visible');
            input.classList.remove('is-invalid');
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
    otpForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        let otp = '';
        otpInputs.forEach(input => otp += input.value);
        const storedOTP = localStorage.getItem('otp');
        if (/^\d{6}$/.test(otp)) {
            loader.style.display = 'block';
            setTimeout(() => {
                loader.style.display = 'none';
                if (otp === storedOTP) {
                    window.location.href = 'welcome.html';
                } else {
                    container.style.display="none"
                    Swal.fire('Invalid OTP', 'Please enter the correct OTP', 'error').then(()=>{
                        container.style.display = 'block';
                    });
                    otpInputs.forEach(input => input.classList.add('is-invalid'));
                }
            }, 1000);
        } else {
            otpError.textContent = 'Please enter a valid 6-digit OTP.';
            otpError.classList.add('visible');
        }
    });
});
