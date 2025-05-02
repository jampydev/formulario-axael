


document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('registrationForm');
    const loadingModal = document.getElementById('loadingModal');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const validationModal = document.getElementById('validationModal');
    const helpModal = document.getElementById('helpModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const helpFab = document.getElementById('helpFab');
    
    // Configuración de FormSubmit
    const formAction = form.getAttribute('action');
    const nextPage = form.querySelector('[name="_next"]').value;
    
    // Efecto de etiquetas flotantes
    const floatingLabels = document.querySelectorAll('.floating-label');
    floatingLabels.forEach(label => {
        const input = label.previousElementSibling;
        if (input.value) {
            label.classList.add('active');
        }
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value) {
                this.nextElementSibling.classList.add('active');
            } else {
                this.nextElementSibling.classList.remove('active');
            }
            
            // Validación básica
            if (this.checkValidity()) {
                this.style.borderColor = '#e9ecef';
            } else {
                this.style.borderColor = 'var(--error-color)';
            }
        });
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!form.checkValidity()) {
            // Mostrar modal de validación
            const invalidFields = Array.from(form.elements).filter(el => !el.checkValidity() && el.id);
            let message = 'Los siguientes campos son requeridos o no son válidos:<br><br>';
            
            invalidFields.forEach((field, index) => {
                const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || field.name || 'Campo';
                message += `${index + 1}. ${label}<br>`;
            });
            
            document.getElementById('validationMessage').innerHTML = message;
            validationModal.classList.add('show');
            return;
        }
        
        // Mostrar modal de carga
        loadingModal.classList.add('show');
        
        // Obtener el nombre del usuario para el mensaje personalizado
        const firstName = document.getElementById('firstName').value;
        document.getElementById('userName').textContent = firstName || 'usuario';
        
        // Mostrar modal de éxito después de 2 segundos (simulando envío)
        setTimeout(() => {
            loadingModal.classList.remove('show');
            successModal.classList.add('show');
            
            // Enviar el formulario realmente después de mostrar el modal de éxito
            setTimeout(() => {
                // Crear un formulario temporal para el envío
                const tempForm = document.createElement('form');
                tempForm.action = formAction;
                tempForm.method = 'POST';
                tempForm.style.display = 'none';
                
                // Copiar todos los campos del formulario original
                Array.from(form.elements).forEach(element => {
                    if (element.name && element.type !== 'submit') {
                        const newElement = document.createElement('input');
                        newElement.type = 'hidden';
                        newElement.name = element.name;
                        newElement.value = element.value;
                        tempForm.appendChild(newElement);
                    }
                });
                
                // Agregar el formulario temporal al documento y enviarlo
                document.body.appendChild(tempForm);
                tempForm.submit();
            }, 2000);
        }, 10000);
    });
    
    // Cerrar modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('show');
            });
        });
    });
    
    // Cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
    
    // Botón de ayuda flotante
    helpFab.addEventListener('click', function() {
        helpModal.classList.add('show');
    });
    
    // Animación al hacer hover en los botones de radio y checkbox
    const interactiveElements = document.querySelectorAll('.checkbox-label, .radio-label, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto de onda al hacer clic en botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});
