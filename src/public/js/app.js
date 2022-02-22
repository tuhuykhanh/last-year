//header scroll 
var lastscrolltop  = 0;
var header = document.querySelector('.header .top')

window.addEventListener('scroll', function(){
    let scrolltop = window.pageYOffset 

    if(scrolltop > lastscrolltop)
    {
        header.style.top = "-10rem";
    }else
    {   
        header.style.top = '1rem'; 
    }
    lastscrolltop = scrolltop
})

        
 //// HANDLE CLICK EVENT ////

//barsbtn  click 

const barsbtn = document.querySelector('.btn-bars');
const  navbar  = document.querySelector('.top .navbar')
barsbtn.onclick =()=>
{
    navbar.classList.toggle('active');
}

//line slide
const navbtn  = document.querySelectorAll('.top .navbar a')
const line = document.querySelector('.top .navbar .line')
navbtn.forEach(  item =>{
    item.onmousemove =(e)=>{
 
        e.preventDefault()
        line.style.left = item.offsetLeft + 'px';
        line.style.width = item.offsetWidth + 'px';
    }
})

//search click
const searchBtn = document.querySelector('.top .control .search-btn')
const formSearch = document.querySelector('.top .search-form')
const closeBtnSearch = document.querySelector('.top .search-form .container-form .fa-times')
const inputSearch = document.querySelector('.top .search-form .container-form form input')


///test

searchBtn.onclick = () =>
{
    formSearch.classList.add('active');
    searchBtn.classList.add('active');
    inputSearch.focus();
}
closeBtnSearch.onclick = ()=>
{
    formSearch.classList.remove('active')
    searchBtn.classList.remove('active');

}

window.onscroll =()=>
{
    formSearch.classList.remove('active')
}


//theme control

const darkBtn = document.querySelector('.top .control .interface .control .dark')
const lightBtn = document.querySelector('.top .control .interface .control .light')
const defaultBtn = document.querySelector('.top .control .interface .control .default')
const activeBtn = document.querySelectorAll('.top .control .interface .control .themeBtn.active')

lightBtn.onclick = () =>{
    
    document.querySelector('.top .control .interface .control .themeBtn.active').classList.remove('active')
    lightBtn.classList.add('active')

    document.body.setAttribute('class', '')
    document.body.classList.add('light-mode');

  

}
defaultBtn.onclick = () =>{
    
    document.querySelector('.top .control .interface .control .themeBtn.active').classList.remove('active')
    defaultBtn.classList.add('active')

    document.body.setAttribute('class', '')


}
darkBtn.onclick = () =>{
    
    document.querySelector('.top .control .interface .control .themeBtn.active').classList.remove('active')

    document.body.setAttribute('class', '')
    document.body.classList.add('dark-mode');

    darkBtn.classList.add('active')
    
}


///toast message
function clickclick({ title = '', message = '', type = 'info', duration = 2000 }) {
    const main = document.querySelector('#toast')
    if (main) {

        const toast = document.createElement('div');
        const show = duration+1000;
    
       //auto remove toast
       const autoremoveID =  setTimeout(function(){
            main.removeChild(toast);
        },show)
       
        //click remove toast
       
        toast.onclick=(e)=>
        {
            if(e.target.closest('.container__close'))
            {
                main.removeChild(toast);
                clearTimeout(autoremoveID);
            }
        }
        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',
        }

        const icon = icons[type]
        const delay = (duration/1000).toFixed(2)

        toast.classList.add('container-toast', `container--${type}`);
        toast.style.animation = ` slideleft .3s linear,fadeout 1s linear forwards ${delay}s`;
        toast.innerHTML = `<div class="container__icon">
            <i class=" ${icon}"></i>
        </div>
        <div class="container__content">
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
        <div class="container__close">
            <i class="fas fa-times"></i>
        </div>`;
        main.appendChild(toast);
    }
}
function success() {

    clickclick(
        {
            title: 'success',
            message: 'here is notification ',
            type: 'success',
            duration: 2000
        }
    )
}
function warning() {

    clickclick(
        {
            title: 'warning',
            message: 'here is warning ',
            type: 'warning',
            duration: 2000
        }
    )
}
function error(){
   
    clickclick(
        {
            title: 'error',
            message: 'here is error ',
            type: 'error',
            duration: 2000
        }
    )
}




//varlidation form register
// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else { 
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'please enter this field'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'this field must be email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Please enter at least ${min} characters`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'password confirm incorrectly';
        }
    }
}


///load animation 

// const loadbox = document.getElementById('load')
// window.onload =()=>{
//     loadbox.style.display =  'none' ;
// }

/////slick///
// $(document).ready(function(){
//     $('.container-home .home-page .background-header-slider .container-bg-im').slick({
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         arrows: false
//     });
//   });
