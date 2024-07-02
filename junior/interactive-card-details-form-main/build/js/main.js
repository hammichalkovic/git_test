let form = document.getElementById('form'),
    fieldset = document.getElementById('fieldset'),
    cardholderNameInput = document.getElementById('cardholder'),
    cardNumberInput = document.getElementById('number'),
    expMonthInput = document.getElementById('month'),
    expYearInput = document.getElementById('year'),
    cvcInput = document.getElementById('cvc'),
    confirmBtn = document.getElementById('submit'),
    cardholderNameDisp = document.getElementsByClassName('cardholder_name_place'),
    cardNumberDisp = document.getElementsByClassName('number_place'),
    expMonthDisp = document.getElementById('exp_month_place'),
    expYearDisp = document.getElementById('exp_year_place'),
    cvcDisp = document.getElementById('cvc_place'),
    cardholderErrNotif = document.getElementById('cardholder_err'),
    numberErrNotif = document.getElementById('number_err'),
    expErrNotif = document.getElementById('exp_err'),
    cvcErrNotif = document.getElementById('cvc_err'),
    successCnfrm = document.getElementById('success_confirmation'),
    continueBtn = document.getElementById('continue_btn'),
    cardholderInfo = document.getElementById('cardholder_info'),
    numberInfo = document.getElementById('number_info'),
    expDateInfo = document.getElementById('exp_date_info'),
    cvcInfo = document.getElementById('cvc_info'),
    whitespacePattern = ' ',
    cardNumberString = '',
    cardholderArr = '',
    currentDate = new Date(),
    currentMonth = currentDate.getMonth() + 1,
    currentYear = currentDate.getFullYear(),
    inputsArr = [cardholderNameInput, cardNumberInput, expMonthInput, expYearInput, cvcInput],
    focusInCountingArr = [cardholderNameInput, cardNumberInput, [expMonthInput, expYearInput], cvcInput],
    errNotifNumberFormatArr = [numberErrNotif, expErrNotif, cvcErrNotif],
    infoArr = [cardholderInfo, numberInfo, expDateInfo, cvcInfo],
    cardholderClcksNmbr = 0,
    numberClcksNmbr = 0,
    expClcksNmbr = 0,
    cvcClcksNmbr = 0
    clicksArr = [cardholderClcksNmbr, numberClcksNmbr, expClcksNmbr, cvcClcksNmbr];

    window.addEventListener('click', (e) => {
        
    })
    

    focusInCountingArr[0].addEventListener('focusin', () => clicksArr[1]++);
    focusInCountingArr[1].addEventListener('focusin', () => clicksArr[1]++);
    focusInCountingArr[2][0].addEventListener('focusin', () => clicksArr[3]++);
    focusInCountingArr[2][1].addEventListener('focusin', () => clicksArr[3]++);
    focusInCountingArr[3].addEventListener('focusin', () => clicksArr[4]++);




    function errFocusOut(item) {
        item.classList.remove('border-light-grayish-violet-brd');
        item.classList.add('border-err-red');
        item.setAttribute('aria-invalid', 'true');
        console.log('Err Focus Out!');
    }

    function toTypeErrorText(item, pseudop, val) {
        item.style.setProperty(pseudop, val);
        item.classList.remove('after:hidden');

    }

    function toChangeFieldsetHeight(val) {
        fieldset.style.setProperty('--fieldset-height', val);
    }

    function okFocusOut(item) {
        item.classList.remove('border-err-red');
        item.classList.add('border-light-grayish-violet-brd');
        item.setAttribute('aria-invalid', 'false');
        console.log('OK Focus Out!');
        
    }

   

    infoArr.forEach(item => {
        item.addEventListener('focusin', () => {
            item.classList.add('after:hidden');
        })
    })

  

    cardNumberInput.addEventListener('input', () => {

        cardNumberString = cardNumberInput.value;
        cardNumberString = cardNumberString.split(' ');
        cardNumberString = cardNumberString.join('');
        console.log(cardNumberString);

        if ( cardNumberInput.value.length == 4 ||
             cardNumberInput.value.length == 9 ||
             cardNumberInput.value.length == 14 ) {
                cardNumberInput.value = cardNumberInput.value + ' ';
            }
    })

    cardholderNameInput.addEventListener('input', () => {
        cardholderArr = cardholderNameInput.value;
        cardholderArr = cardholderArr.split(' ');
        console.log(cardholderArr);
    });

    cardholderNameInput.addEventListener('keydown', (e) => {
        if (e.key  === ' ' && cardholderNameInput.value == '') {
            e.preventDefault();
        }
    })

    cardNumberInput.addEventListener('keydown', (e) => {
        if (e.key  === ' ' ) {
            e.preventDefault();

        } else if (e.key === 'Backspace' && cardNumberInput.value.length == 15 ||
                   e.key === 'Backspace' && cardNumberInput.value.length == 10 ||
                   e.key === 'Backspace' && cardNumberInput.value.length == 5
        ) {
            cardNumberInput.value = cardNumberInput.value.slice(0, -1);
        }
    
    });

    expMonthInput.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    });

    expYearInput.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    });

    expYearInput.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    });

    cvcInput.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    });

    cardholderNameInput.addEventListener('focusout', () => {

        

        if (cardholderNameInput.value == '' ) {
            errFocusOut(cardholderNameInput);
            toTypeErrorText(cardholderInfo, '--cardholder-err-text', '"Can\'t be blank"');
            console.log("Can't be blank");
        } else if (cardholderNameInput.value.match('[0-9]')) {
            errFocusOut(cardholderNameInput);
            toTypeErrorText(cardholderInfo, '--cardholder-err-text', '"Wrong format, letters only"');
            console.log("Wrong format, letters only");
        } else if (!cardholderNameInput.value.match(' ') ||
                    cardholderNameInput.value.match(' ') && cardholderArr[1] == '') {
            errFocusOut(cardholderNameInput);
            toTypeErrorText(cardholderInfo, '--cardholder-err-text', '"Last name is required"');
            console.log('Last name is required');
        } else if (cardholderArr[1] != '' && cardholderNameInput.value.length > 26) {
            errFocusOut(cardholderNameInput);
            toTypeErrorText(cardholderInfo, '--cardholder-err-text', '"The maximum length of this field is 26 characters"');
            console.log('The maximum length of this field is 26 characters');
        } else if (cardholderArr[1] != '' && cardholderNameInput.value.length <= 26 ) {
                okFocusOut(cardholderNameInput);
                console.log('Cardholder name is right!')
        }

        if (cardholderNameInput.value == '') {

        } else {
            cardholderNameDisp[0].innerHTML = cardholderNameInput.value.substring(0, 26);
        }
        
        
    });
         

    cardNumberInput.addEventListener('focusout', () => {

        if (cardNumberString.length < 5) {
            cardNumberInput.value = cardNumberString;
        } else if (4 < cardNumberString.length &&
                       cardNumberString.length < 9) {
            cardNumberInput.value = cardNumberString.slice(0, 4) + ' ' + cardNumberString.slice(4);
        } else if ( 8 < cardNumberString.length &&
                        cardNumberString.length < 13
        ) {
            cardNumberInput.value = cardNumberString.slice(0, 4) + ' ' + cardNumberString.slice(4, 8) + ' ' + cardNumberString.slice(8);
        } else if (cardNumberString.length > 12) {
            cardNumberInput.value = cardNumberString.slice(0, 4) + ' ' + cardNumberString.slice(4, 8) + ' ' + cardNumberString.slice(8, 12) + ' ' + cardNumberString.slice(12);
        };
        

        if ( cardNumberString == '') {
            errFocusOut(cardNumberInput);
            toTypeErrorText(numberInfo, '--cardnumber-err-text','"Can\'t be blank"');
            console.log("Can't be blank");
        } else if ( isNaN(cardNumberString) === true || cardNumberString.match(' ')) {
            errFocusOut(cardNumberInput);
            toTypeErrorText(numberInfo, '--cardnumber-err-text','"Wrong format, numbers only"');
            console.log("Wrong format, numbers only");
        } else if (!isNaN(cardNumberString) && cardNumberString.value != '') {
            if (cardNumberString.length > 16) {
                errFocusOut(cardNumberInput);
                toTypeErrorText(numberInfo, '--cardnumber-err-text','"Number has more than 16 digits"');
                console.log('Number has more than 16 digits');
            } else if (cardNumberString.length < 16) {
                errFocusOut(cardNumberInput);
                toTypeErrorText(numberInfo, '--cardnumber-err-text','"Number has less than 16 digits"');
                console.log('Number has less than 16 digits');
            } else if (cardNumberString.length == 16) {
                okFocusOut(cardNumberInput);
                console.log('Card number is right!')
            }
        }

        if (cardNumberInput.value == '') {
            
        } else {
            cardNumberDisp[0].innerHTML = cardNumberInput.value.substring(0, 21);
        }
        
    });

 
    expMonthInput.addEventListener('focusout', () => {
        let currentYearFrmd = currentYear.toString().slice(2);

        if ( expMonthInput.value == '' ) {
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Can\'t be blank"');
            console.log("Can't be blank");
        } else if (!expMonthInput.value.match('[0-9]')) {
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Wrong format, numbers only"');
            console.log("Wrong format, numbers only");
        } else if (expMonthInput.value.length != 2) {
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Exp month must be 2 digits"');
            console.log('Exp month must be 2 digits');
        } else if (expMonthInput.value < 1 || expMonthInput.value > 12) {
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Month should be 1 to 12"');
            console.log("Month should be 1 to 12");
        } else if (0 < expMonthInput.value < 13 && expYearInput.value == '') {
            okFocusOut(expMonthInput);
            console.log("Exp month is right!");
        } else if (currentYearFrmd == expYearInput.value && expMonthInput.value < currentMonth ||
            currentYearFrmd > expYearInput.value ) {
            errFocusOut(expYearInput);
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Expired card"');
            console.log('Expired card');
        } else {
            okFocusOut(expYearInput);
            okFocusOut(expMonthInput);
            console.log("Exp month is right!");
        }


        if (expMonthInput.value == '') {
            
        } else {
            expMonthDisp.innerHTML = expMonthInput.value;
        }

        
    });    
  
    expYearInput.addEventListener('focusout', () => {
        let currentYearFrmd = currentYear.toString().slice(2);

        console.log(currentYearFrmd);
        console.log(currentMonth);

        if (expYearInput.value == '') {
            errFocusOut(expYearInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Can\'t be blank"');
            console.log("Can't be blank");
        } else if (!expYearInput.value.match('[0-9]')) {
            errFocusOut(expYearInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Wrong format, numbers only"');
            console.log('Wrong format, numbers only');
        } else if (expYearInput.value.length != 2) {
            errFocusOut(expYearInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Exp year must be 2 digits"');
            console.log('Exp year must be 2 digits');
        } else if (expYearInput.value < 0 || expYearInput.value > 99) {
            errFocusOut(expYearInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Year should be 00 to 99"');
            console.log('Year should be 00 to 99');
        } else if (currentYearFrmd == expYearInput.value && expMonthInput.value < currentMonth ||
            currentYearFrmd > expYearInput.value ) {
            errFocusOut(expYearInput);
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Expired card"');
            console.log('Expired card');
        } else if (currentYearFrmd == expYearInput.value && expMonthInput.value >= currentMonth && expMonthInput.value.length != 2 || currentYearFrmd <= expYearInput.value && expMonthInput.value.length != 2) {
            okFocusOut(expYearInput);
            errFocusOut(expMonthInput);
            toTypeErrorText(expDateInfo, '--expdate-err-text', '"Exp year must be 2 digits"');
            console.log('Exp year must be 2 digits');
        } else {
            okFocusOut(expYearInput);
            okFocusOut(expMonthInput);
            console.log("Exp year is right!");
        }

        if (expYearInput.value == '') {
            
        } else {
            expYearDisp.innerHTML = expYearInput.value;
        }
       
    })

    cvcInput.addEventListener('focusout', () => {
        if (cvcInput.value == '') {
            errFocusOut(cvcInput);
            toTypeErrorText(cvcInfo, '--cvc-err-text', '"Can\'t be blank"');
            console.log("Can't be blank");
        } else if (!cvcInput.value.match('[0-9]')) {
            errFocusOut(cvcInput);
            toTypeErrorText(cvcInfo, '--cvc-err-text', '"Wrong format, numbers only"');
            console.log('Wrong format, numbers only');
        } else if (cvcInput.value.length < 3 || cvcInput.value.length > 4) {
            errFocusOut(cvcInput);
            toTypeErrorText(cvcInfo, '--cvc-err-text', '"CVC must be 3 or 4 digits"');
            console.log('CVC must be 3 or 4 digits');
        } else {
            okFocusOut(cvcInput);
            console.log('CVC is right!');
        }

        if (cvcInput.value == '') {
            
        } else {
            cvcDisp.innerHTML = cvcInput.value;
        }
    })


    confirmBtn.addEventListener('click', (e) => {
        
        let inputsAriaInvalidValsArr = [cardholderNameInput.attributes[0].value, cardNumberInput.attributes[0].value, expMonthInput.attributes[0].value, expYearInput.attributes[0].value, cvcInput.attributes[0].value];
            
        let ariaInvalidCheckArr = inputsAriaInvalidValsArr.filter(item => item == 'false')


        if (ariaInvalidCheckArr.length == 5) {
            form.classList.add('hidden');
            successCnfrm.classList.remove('hidden');
        } else {
            e.preventDefault();
        }
    });

    continueBtn.addEventListener('click', () => {
        location.reload();
    })



    inputsArr.forEach(item => {
        item.addEventListener('focusout', () => {
            console.log(infoArr.length);
            let checkArr = infoArr.filter(item => item.classList.contains('after:hidden'));
            console.log(checkArr.length);

            if (checkArr.length == 4) {
                toChangeFieldsetHeight('319px');
            }  else if (checkArr.length == 3) {
                toChangeFieldsetHeight('333px');
            } else if (checkArr.length == 2) {
                toChangeFieldsetHeight('347px');
            } else if (checkArr.length <= 1) {
                toChangeFieldsetHeight('384px');
            }
        })

        
    })
    
    inputsArr.forEach(item => {

        // inputsArr = [cardholderNameInput, cardNumberInput, expMonthInput, expYearInput, cvcInput],

        item.addEventListener('focusin', (e) => {

            let localCheckArr = [clicksArr[0], clicksArr[1], clicksArr[2], clicksArr[2], clicksArr[3]];

            
            let checkArr = infoArr.filter(item => item.classList.contains('after:hidden'));
            console.log(checkArr.length);

            

            if (checkArr.length == 4 ) {
                toChangeFieldsetHeight('319px');
            } else if (checkArr.length == 3 && localCheckArr.some(el => el > 1) == 1 ) {
                toChangeFieldsetHeight('333px');
            } else if (checkArr.length == 3 && localCheckArr.some(el => el > 1 == 0)) {
                toChangeFieldsetHeight('319px');
            } else if (checkArr.length == 2 ) {

            } else if (checkArr.length == 2 ) {
                toChangeFieldsetHeight('333px');
            } else if (checkArr.length <= 1) {
                toChangeFieldsetHeight('347px');
            }
        })
    
        
    })
    

    // sm:top-[18.6vh]