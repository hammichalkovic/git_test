let marks = document.querySelectorAll('.mark'),
    submit = document.querySelector('.submit'),
    main = document.querySelector('.main'),
    thanks = document.querySelector('.thanks'),
    selection = document.querySelector('.selection'),
    result = '',
    id = 0,
    inputs = document.querySelectorAll('input'),
    input = document.querySelector('input');


let marksArr = Array.from(marks);




inputs.forEach((input) => {
    input.addEventListener('click', (e) => {
        for (let i = 1; i <= 5; i++) {


            if (i.toString() === e.target.id && document.getElementById(i.toString()).checked === true) {
                document.getElementById(i.toString()).checked = true;
                marksArr[i-1].classList.add('markclicked');
            } else {
                document.getElementById(i.toString()).checked = false;
            };
        };
    });
});




marks.forEach((mark, index) => {
    mark.addEventListener('mouseenter', (e) => {
        e.target.classList.add('onmouseover');
        
    });

    mark.addEventListener('mouseout', (e) => {
        mark.classList.remove('onmouseover');
    });

    mark.addEventListener('click', (e) => {
        // mark.classList.add('markclicked');
        result = e.target.textContent;

        if (mark.textContent === result) {
            mark.classList.add('markclicked');
        } 
            mark.classList.remove('markclicked');
        

    });

});


submit.addEventListener('click', (e) => {
    main.classList.add('nodisplay');
    thanks.classList.remove('nodisplay');  
    selection.textContent = `You selected ${result} out of 5`;
    
});

// ІДЭАЛЬНЫ СКРЫПТ ДЛЯ МАБІЛЬНАЙ ВЕРСІІ

// marks.forEach((mark, index) => {
//     mark.addEventListener('mouseenter', (e) => {
//         e.target.classList.add('onmouseover');
//         e.target.classList.add('markclicked');
//     });

//     mark.addEventListener('mouseout', (e) => {
//         mark.classList.remove('onmouseover');
//         mark.classList.remove('markclicked');
//     });

//     mark.addEventListener('click', (e) => {
//         result = e.target.textContent;
//     });

// });

