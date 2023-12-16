document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById("button");
    const dayInput = document.querySelector(".day-block");
    const monthInput = document.querySelector(".month-block");
    const yearInput = document.querySelector(".year-block");

    function userInput(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const dayBlock = dayInput.querySelector(".days");
        const monthBlock = monthInput.querySelector(".months");
        const yearBlock = yearInput.querySelector(".years");
        
        const dateInput = [yearBlock, monthBlock, dayBlock];
        checkEmptyInputs(dateInput);
        validateDate(yearBlock, monthBlock, dayBlock);
    }
    
    submitButton.addEventListener("click", userInput);
    
    function checkEmptyInputs(inputs){
        inputs.forEach(input => {
            const error = input.parentElement.querySelector('.error-message');
            const label = input.parentElement.querySelector("label");
            
            if(input.value === ""){
                input.style.border = "1px solid red";
                error.textContent = "Please fill in this field";
                label.style.color = "var(--Light-red)";
            } else{
                input.style.border = "";
                error.textContent = "";
                label.style.color = "";
            }
        });
    }
    
    function validateDate(year, month, day){
        yearProvided = year.value;
        monthProvided = month.value;
        dayProvided = day.value;

        errorMessage = monthInput.querySelector(".error-message");
        monthBox = monthInput.querySelector("input");
        monthLabel = monthInput.querySelector("label");
        
        const dateString = `${yearProvided}-${monthProvided.padStart(2, '0')}-${dayProvided.padStart(2, '0')}`;
        const date = new Date(dateString);
        
        if (!(date instanceof Date) || isNaN(date)){
            if(monthProvided < 1 || monthProvided > 12){
                errorMessage.textContent = "Incorrect month";
                monthBox.style.border = "1px solid var(--Light-red)";
                monthLabel.style.color = "var(--Light-red)";
            };
        }
    }
});
