    //Inputs
    const dayInput = document.querySelector(".day-block .days");
    const monthInput = document.querySelector(".month-block .months");
    const yearInput = document.querySelector(".year-block .years");
    
    //Outputs
    const dayOutput = document.querySelector(".output .days span");
    const monthOutput = document.querySelector(".output .months span");
    const yearOutput = document.querySelector(".output .years span");
    
    // User button
    const submitButton = document.getElementById("button");
  
    // Event Trigger
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      validate(dayInput, monthInput, yearInput);
  
    });

    // Validation function
  
    function validate(day, month, year) {
  
      const inputs = [year, month, day]
      const isDateInMonth = new Date(year.value, month.value, 0).getDate();
      const isYearInFuture = new Date().getFullYear();

      // Checks for inputted values first
  
      let initialCheck = false;
  
  
      inputs.forEach(input => {
        const allInputsFilled = inputs.every(input => input.value);

        if (!input.value) {
            handleValidationError(input, "This field is required");
          } else if (input.value < 1){
                handleValidationError(input, "Enter a valid figure")
            } else{
                  resetValidation(input);
              }
        
  
        if (allInputsFilled) {
          initialCheck = true;          
        } else{
            initialCheck = false;
        }
      });
  
      // Checks if the values entered are valid
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

        // Runs age calculator if the whole date is valid
  
        if (dayCheck && monthCheck && yearCheck) {
          calculateAge(day, month, year);
        }
      }
    };
  

   // Error response
    function handleValidationError(result, message) {
      const error = result.parentElement.querySelector('.error-message');
      const label = result.parentElement.querySelector("label");
  
      result.style.border = "1px solid var(--Light-red)";
      error.textContent = message;
      label.style.color = "var(--Light-red)";
    }
    // Valid input response
    function resetValidation(result) {
  
      const error = result.parentElement.querySelector('.error-message');
      const label = result.parentElement.querySelector("label");
  
      result.style.border = "";
      error.textContent = "";
      label.style.color = "";
    }
  
    // Age caluclation with animation 
    function calculateAge(day, month, year) {
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

      function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let currentValue = start;
        const timer = setInterval(() => {
          currentValue += increment;
          element.innerHTML = currentValue;
          if ((increment > 0 && currentValue >= end) || (increment < 0 && currentValue <= end)) {
            currentValue = end; 
            element.innerHTML = currentValue; 
            clearInterval(timer);
          }
        }, stepTime);
      }
  
      animateValue(dayOutput, 0, ageDays, 1000);
      animateValue(monthOutput, 0, ageMonths, 1000);
      animateValue(yearOutput, 0, ageYears, 1000);
    }
  
  
