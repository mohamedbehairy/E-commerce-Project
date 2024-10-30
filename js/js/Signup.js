// Start SignUp Form JavaScript
const signupForm = document.getElementById('signupForm');
const messageBox = document.getElementById('messageBox');

if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById('inputName').value,
            email: document.getElementById('inputEmail').value,
            password: document.getElementById('inputPassword').value,
            rePassword: document.getElementById('inputRePassword').value,
            phone: document.getElementById('inputPhone').value,
        };

        const validationErrors = validateForm(formData);
        displayErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.ok ? response.json() : response.json().then(err => { throw new Error(err.message); }))
            .then(data => {
                localStorage.setItem('userData', JSON.stringify(data));
                messageBox.innerHTML = '<div class="alert alert-success"> Registration successful!</div>';
                setTimeout(() => window.location.href = 'signin.html', 2000);
            })
            .catch(error => {
                messageBox.innerHTML = '<div class="alert alert-danger"> An error occurred! ' + error.message + '</div>';
            });
        }
    });

    signupForm.addEventListener('input', function(event) {
        const fieldId = event.target.id;
        const formData = {
            name: document.getElementById('inputName').value,
            email: document.getElementById('inputEmail').value,
            password: document.getElementById('inputPassword').value,
            rePassword: document.getElementById('inputRePassword').value,
            phone: document.getElementById('inputPhone').value,
        };

        const validationErrors = validateForm(formData);
        displayErrors(validationErrors, fieldId);

        if (fieldId === 'inputRePassword') {
            if (formData.rePassword !== formData.password) {
                document.getElementById('rePasswordError').textContent = "Password does not match";
            } else {
                document.getElementById('rePasswordError').textContent = '';
            }
        }
    });
}

// Validation function
function validateForm(data) {
    const errors = {};

    // Validate name
    if (!data.name) {
    } else if (data.name.length < 3 || data.name.length > 10) {
        errors.name = "Name must be between 3 and 10 characters long";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Invalid email address";
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{6,}$/;
    if (!data.password) {
    } else if (!passwordRegex.test(data.password)) {
        errors.password = "Password must contain at least one uppercase letter, one number and one special character";
    }

    // Validate rePassword
    if (!data.rePassword) {
    } else if (data.rePassword !== data.password) {
        errors.rePassword = "Password does not match";
    }

    // Validate phone
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!data.phone) {
    } else if (!phoneRegex.test(data.phone)) {
        errors.phone = "The phone number is invalid, it must start with (010|011|012|015) and contain 11 digits";
    }

    return errors;
}

// Display errors
function displayErrors(errors, focusedField) {
    const errorElements = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
        rePassword: document.getElementById('rePasswordError'),
        phone: document.getElementById('phoneError'),
    };

    for (const key in errorElements) {
        if (errorElements[key]) {
            errorElements[key].textContent = '';
        }
    }

    if (focusedField) {
        const fieldKey = focusedField.replace('input', '').toLowerCase(); 
        if (errorElements[fieldKey]) {
            errorElements[fieldKey].textContent = errors[fieldKey] || '';
        }
    }
}
// End SignUp Form JavaScript
