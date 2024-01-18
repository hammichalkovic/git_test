// sm:tracking-[0.15em]   - for digits in result field in default state
// sm:-mr-6 - for digits in result field in default state

let desktopArrow = document.getElementById('arrow1'),
    mobileArrow = document.getElementById('arrow2'),
    dayVar = document.getElementById('day'),
    monthVar = document.getElementById('month'),
    yearVar = document.getElementById('year'),
    daysDiv = document.getElementById('daysdiv'),
    monthsDiv = document.getElementById('monthsdiv'),
    yearsDiv = document.getElementById('yearsdiv'),
    daysLabel = document.getElementById('dayslabel'),
    monthsLabel = document.getElementById('monthslabel'),
    yearsLabel = document.getElementById('yearslabel'),
    resultYears = document.getElementById('result-years'),
    resultMonths = document.getElementById('result-months'),
    resultDays = document.getElementById('result-days'),
    fullCurrentDate = new Date(),
    currentDate = fullCurrentDate.getDate(),
    currentMonth = fullCurrentDate.getMonth() + 1,
    currentYear = fullCurrentDate.getFullYear(),
    submitBtn = document.getElementById('submit'),
    spans = document.querySelectorAll('span'),
    spanDaysErr = document.getElementById('dayserror'),
    spanMonthsErr = document.getElementById('monthserror'),
    spanYearsErr = document.getElementById('yearserror'),
    errorNotificationArr = [[daysLabel, dayVar, spanDaysErr], [monthsLabel, monthVar, spanMonthsErr], [yearsLabel, yearVar, spanYearsErr]];
    


if (window.matchMedia('(max-width: 450px)').matches) {
    desktopArrow.classList.remove('hidden');
} else {
    mobileArrow.classList.remove('hidden');
};

function toDisplayWhileInputsEmpty() {
    if (yearVar.value == '' || monthVar.value == '' || dayVar.value == '') {
        spans.forEach(span => {
            span.textContent == '--';
        })
    } else if (!yearVar.value == '' && !monthVar.value == '' && !dayVar.value == '') {
        resultDays.classList.remove('sm:tracking-[0.15em]');
        resultMonths.classList.remove('sm:tracking-[0.15em]');
        resultYears.classList.remove('sm:tracking-[0.15em]');
    }
}

function toNotifyError(inputPlace, errorText) {
    errorNotificationArr[inputPlace][0].classList.remove('text-smokeygrey');
    errorNotificationArr[inputPlace][0].classList.add('text-lightred');
    errorNotificationArr[inputPlace][1].classList.remove('border-lightgrey');
    errorNotificationArr[inputPlace][1].classList.add('border-lightred');
    errorNotificationArr[inputPlace][2].textContent = errorText;
}

function toHideErrorNotify(inputPlace, textToWrite) {
    errorNotificationArr[inputPlace][0].classList.remove('text-lightred');
    errorNotificationArr[inputPlace][0].classList.add('text-smokeygrey');
    errorNotificationArr[inputPlace][1].classList.remove('border-lightred');
    errorNotificationArr[inputPlace][1].classList.add('border-lightgrey');
    errorNotificationArr[inputPlace][2].textContent = textToWrite;
}

function toCheckErrNotfArr() {
    for (i = 0; i < errorNotificationArr.length; i++) {
        if (errorNotificationArr[i][1].value == '') {
        
            toNotifyError(i, 'This field is required');
            setTimeout(() => {
                toHideErrorNotify(0, '');
            }, 3000)
        }
    }
    
}

function toCheckMonthsNumber() {
    let checkMonthPromise = new Promise((resolve, reject) => {
        let monthVal = errorNotificationArr[1][1].value * 1;
    
        if (monthVal < 13 || typeof monthVal === typeof Number) {
            resolve('resolve!');
        } else {
            reject('reject!');
        }
    });
    
    checkMonthPromise.then(() => {
        toGetDates();
    })

    .catch(() => {
        toNotifyError(1, 'Must be a valid month');
    })

    .finally(() => {
        setTimeout(() => {

            toHideErrorNotify(1, '');

        }, 3000)
    })
}

function toCheckYearsNumber() {
    let checkYearPromise = new Promise((resolve,reject) => {
        let yearVal = errorNotificationArr[2][1].value * 1;

        if (yearVal < currentYear + 1 || typeof yearVal === typeof Number) {
            resolve('resolve!');
        } else {
            reject('reject!');
        }   
    });

    checkYearPromise.then(() => {
        toGetDates();
    })

    .catch(() => {
        toNotifyError(2, 'Must be in the past')
    })

    .finally(() => {
        setTimeout(() => {

            toHideErrorNotify(2, '');

        }, 3000)
    })
}

function getLastDayOfMonth(year, month) {
    year = yearVar.value * 1;
    month = monthVar.value * 1;
    return new Date(year, month, 0);
    
}

function toCheckDaysNumber() {
    let checkDayPromise = new Promise((resolve, reject) => {
        let dayVal = errorNotificationArr[0][1].value * 1;

        let lastDayTheMonth = getLastDayOfMonth();
            lastDayTheMonth = lastDayTheMonth.toDateString();
        let lastDayTheMonthArr = lastDayTheMonth.split(' ');
            lastDayTheMonth = lastDayTheMonthArr[2] * 1;


        if (dayVal > 31) {
            reject('rejected!');

        } else if (dayVal > lastDayTheMonth) {
            resolve('resolved!');

        }
    }); 

    checkDayPromise.then(() => {
        toNotifyError(1, '');
        toNotifyError(2, '');
        toNotifyError(0, 'Must be a valid date');
    })

    .catch(() => {
        toNotifyError(0, 'Must be a valid day');
    })

    .finally(() => {
        setTimeout(() => {
            toHideErrorNotify(0, '');
            toHideErrorNotify(1, '');
            toHideErrorNotify(2, '');
        }, 3000)
    })
}


submitBtn.addEventListener('click', () => {
    toDisplayWhileInputsEmpty();
    toCheckErrNotfArr();
    toCheckMonthsNumber();
    toCheckYearsNumber();
    toCheckDaysNumber()
})



let toGetDates = (localFullCurrentDate, typedDateOfBirth) => {
   
    
    localFullCurrentDate = new Date(),
    typedDateOfBirth = new Date();
 
    typedDateOfBirth.setDate(dayVar.value * 1);
    typedDateOfBirth.setMonth(monthVar.value * 1 - 1);
    typedDateOfBirth.setFullYear(yearVar.value * 1);
    typedDateOfBirth = typedDateOfBirth.toDateString();
    localFullCurrentDate = localFullCurrentDate.toDateString();

    let currDateArr = localFullCurrentDate.split(' '),
    typedDateArr = typedDateOfBirth.split(' ');


        switch (currDateArr[1]) {
            case 'Jan':
            currDateArr[1] = 1;
            break;
            
            case 'Feb':
            currDateArr[1] = 2;
            break;

            case 'Mar':
            currDateArr[1] = 3;
            break;

            case 'Apr':
            currDateArr[1] = 4;
            break;

            case 'May':
            currDateArr[1] = 5;
            break;

            case 'Jun':
            currDateArr[1] = 6;
            break;

            case 'Jul':
            currDateArr[1] = 7;
            break;

            case 'Aug':
            currDateArr[1] = 8;
            break;

            case 'Sep':
            currDateArr[1] = 9;
            break;

            case 'Oct':
            currDateArr[1] = 10;
            break;

            case 'Nov':
            currDateArr[1] = 11;
            break;

            case 'Dec':
            currDateArr[1] = 12;
            break;
        };

        switch (typedDateArr[1]) {
            case 'Jan':
            typedDateArr[1] = 1;
            break;
            
            case 'Feb':
            typedDateArr[1] = 2;
            break;

            case 'Mar':
            typedDateArr[1] = 3;
            break;

            case 'Apr':
            typedDateArr[1] = 4;
            break;

            case 'May':
            typedDateArr[1] = 5;
            break;

            case 'Jun':
            typedDateArr[1] = 6;
            break;

            case 'Jul':
            typedDateArr[1] = 7;
            break;

            case 'Aug':
            typedDateArr[1] = 8;
            break;

            case 'Sep':
            typedDateArr[1] = 9;
            break;

            case 'Oct':
            typedDateArr[1] = 10;
            break;

            case 'Nov':
            typedDateArr[1] = 11;
            break;

            case 'Dec':
            typedDateArr[1] = 12;
            break;
        }

        let calcPromise = new Promise((resolve, reject) => {
            let daysToAdd = 0,
                daysToSubtractFrom = 0,
                resultDaysCalc = 0;


            if (typedDateArr[2] > currDateArr[2]) {
                daysToAdd = getLastDayOfMonth(currDateArr[3], currDateArr[1]);
                daysToSubtractFrom = daysToAdd + currDateArr[2];
              let resultDaysCalc = daysToSubtractFrom - typedDateArr[2];
            } else {
                resultDaysCalc = currDateArr[2] - typedDateArr[2];
            }
        })

    // resultDays.textContent
    
    // resultMonths.textContent
    let resultMonthsCalc = currDateArr[1] - typedDateArr[1];
    // resultYears.textContent
    let resultYearsCalc = currDateArr[3] - typedDateArr[3];


    if (yearVar.value == '' || monthVar.value == '' || yearVar.value == '') {
        resultDays.textContent = '--';
        resultMonths.textContent = '--';
        resultYears.textContent = '--';
    }

    console.log(typedDateArr, currDateArr);
    console.log(resultDaysCalc);

};

// submitBtn.addEventListener('click', toGetDates);


