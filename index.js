document.addEventListener('DOMContentLoaded', function() {

    // Inputs 
    const submitButton = document.getElementById("button");
    const dayInput = document.querySelector(".day-block .days");
    const monthInput = document.querySelector(".month-block .months");
    const yearInput = document.querySelector(".year-block .years");

    // Outputs
    const dayOutput = document.querySelector(".output .days span");
    const monthOutput = document.querySelector(".output .months span");
    const yearOutput = document.querySelector(".output .years span");




    submitButton.addEventListener("click", (e)=>{
        e.preventDefault(); // Prevent the default form submission
        validate(dayInput, monthInput, yearInput);

    });

    function validate(day, month, year){

        const inputs = [year, month, day]
        const isDateInMonth = new Date(year.value, month.value, 0).getDate();
        const isYearInFuture = new Date().getFullYear();

        let initialCheck = false;

        
        inputs.forEach(input => {
            const allInputsFilled = inputs.every(input => input.value);

            if(!input.value){
                handleValidationError(input, "Please fill in this field");
            } else {
                resetValidation(input)
            } 
            
            if (allInputsFilled) {
                initialCheck = true; // Set initialCheck to true if all inputs have values
            } else {
                initialCheck = false; // Keep initialCheck as false if some inputs are empty
            }
        });
        
        
        if (initialCheck) {
            let dayCheck = false;
            let monthCheck = false;
            let yearCheck = false;

            if (day.value < 1 || day.value > isDateInMonth) {
                handleValidationError(day, "Must be a valid day");
                dayCheck = false;
            } else {
                resetValidation(day);
                dayCheck = true;
            }

            if (month.value > 12) {
                handleValidationError(month, "Must be a valid month");
                monthCheck = false;
            } else {
                resetValidation(month);
                monthCheck = true;
            }

            if (year.value > isYearInFuture) {
                handleValidationError(year, "Must be in the past day");
                yearCheck = false;
            } else {
                resetValidation(year);
                yearCheck = true;
            }

            if(dayCheck && monthCheck && yearCheck){
                calculateAge(day, month, year);
            }
        }

    


    };

    // For every input, check whether it has one, if not run error function
    // Making the checks run seperate of one another while
    
    function handleValidationError(result, message) {
        const error = result.parentElement.querySelector('.error-message');
        const label = result.parentElement.querySelector("label");

        result.style.border = "1px solid var(--Light-red)";
        error.textContent = message;
        label.style.color = "var(--Light-red)";
    }

    function resetValidation(result) {

        const error = result.parentElement.querySelector('.error-message');
        const label = result.parentElement.querySelector("label");

        result.style.border = "";
        error.textContent = "";
        label.style.color = "";
    }

    function calculateAge(day, month, year){
        let today = new Date();
        let birthDay = new Date(year.value, month.value - 1, day.value); 

        console.log(day.value, month.value, year.value);

        let ageYears = today.getFullYear() - birthDay.getFullYear();
        let ageMonths = today.getMonth() - birthDay.getMonth();
        let ageDays = today.getDate() - birthDay.getDate();

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths += 12;
        }

        if (ageDays < 0) {
                ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }


        dayOutput.innerHTML = ageDays;
        monthOutput.innerHTML = ageMonths;
        yearOutput.innerHTML = ageYears;

        console.log(`The days are ${ageDays}, the months are ${ageMonths} and the years are ${ageYears}`);


    }

    
   
});


/* 
I need a variable to count as false and give situations to set it to false
rather than the if the date is invalid 

If the year in invalid then say enter a correct date, if not check the date is valid if not 
specify if the day is what is incorrect or the month or both
*/