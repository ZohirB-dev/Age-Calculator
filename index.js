document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById("button");
    const dayInput = document.querySelector(".day-block .days");
    const monthInput = document.querySelector(".month-block .months");
    const yearInput = document.querySelector(".year-block .years");

    // function userInput(event) {
    //     event.preventDefault(); // Prevent the default form submission
    //     validate(dayInput, monthInput, yearInput);
    // }

    submitButton.addEventListener("click", (e)=>{
        e.preventDefault(); // Prevent the default form submission
        validate(dayInput, monthInput, yearInput);
    });

    function validate(day, month, year){

        const inputs = [year, month, day]
        const isDateInMonth = new Date(year.value, month.value, 0).getDate();
        const isYearInFuture = new Date().getFullYear();
        
        inputs.forEach(input => {
            
            if(!input.value){
                handleValidationError(input, "Please fill in this field");
            } else if(month.value > 12){
                handleValidationError(month, "Must be a valid month");
            } else if(day.value < 1 || day.value > isDateInMonth){
                handleValidationError(day, "Must be a valid day");
            } else if(year.value > isYearInFuture){
                handleValidationError(year,"Must be in the past day");
            } else {
                input.parentElement.querySelector(".error-message").textContent = "";
                input.style.border = "";
                input.parentElement.querySelector("label").style.color = "";
            } 
        });
    };
    
    function handleValidationError(result, message) {
        const error = result.parentElement.querySelector('.error-message');
        const label = result.parentElement.querySelector("label");

        result.style.border = "1px solid var(--Light-red)";
        error.textContent = message;
        label.style.color = "var(--Light-red)";
    }

    // function resetValidation(result, error, label) {
    //     result.style.border = "";
    //     error.textContent = "";
    //     label.style.color = "";
    // }
});


/* 
I need a variable to count as false and give situations to set it to false
rather than the if the date is invalid 

If the year in invalid then say enter a correct date, if not check the date is valid if not 
specify if the day is what is incorrect or the month or both
*/