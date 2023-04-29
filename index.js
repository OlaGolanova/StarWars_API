'use strict'


document.addEventListener("DOMContentLoaded", function(event){

const selectInput = document.getElementById('select'),
        numberInput = document.getElementById('number'),
        btn = document.getElementById('btn'),
        response = document.querySelector('.response'),
        responseTitle =  document.querySelector('.response-title'),
        errorMessage = document.querySelector('.error-message'),
        loader = document.querySelector('.loader'),
        //Объект, в который завожу данные из значений выбранных в инпутах
        setData = {
            select: '0',
            number: ''
            };

    selectInput.addEventListener('input', function(){
        setData.select = selectInput.value;
        clearResponse();

    });

    numberInput.addEventListener('input',function(){
        setData.number = numberInput.value;
        clearResponse();
    })

// Очистка инпутов и полей ввода
    function clearResponse() {
        errorMessage.textContent = '';
        response.textContent = '';
        responseTitle.textContent = '';
    };

    function clearInput() {
        numberInput.value = '';
        selectInput.value = select.options[0].value;
        setData.select = '0';
        setData.number = '';
    };
    
//Реализация лоадера при загрузке данных
    function addLoading(){
        loader.classList.remove("hidden");
    };
    function removeLoading(){
        loader.classList.add("hidden");
    };
   
    btn.addEventListener('click', function(event){
        event.preventDefault;
        clearResponse();
        fetch( `https://swapi.nomoreparties.co/${setData.select}/${setData.number}`, addLoading())   
        .then(response => {
            removeLoading();
            if (!response.ok) {
                throw  new Error(response.status  + `. Введены некорректные данные. Объект пустой `);
            }
            return response.json()
        })
               
        .then(object  => {
                let values = Object.values(object); // Создаю массив из значений объекта object
                let keys = Object.keys(object);// Создаю массив из ключей объекта object
                let n = 6;
                for ( let i = 0; i < n; i++) {
                    response.innerHTML += `<span class="keys"> ${keys[i]}:</span> ${values[i]} <br>`; 
                }
                let key = document.querySelectorAll('.keys');
                key.forEach((item) => item.style.color = 'gold' );

                responseTitle.textContent = setData.select;
                responseTitle.style.color = 'gold';
                clearInput();

             //Если инпут ввода номера будет пустой, то выведется весь перечень имен/названий из данной категории
                if(object.results) {
                    response.textContent = '';
                    try {
                        if(!object.results[0].name){
                            
                            throw new Error('В этом объекте нет results.name')
                        }
                        object.results.forEach((item, i) => response.innerHTML += ` ${i+1}. ${item.name} <br>`); 
                    } catch(error) {
                        object.results.forEach((item, i) => response.innerHTML += ` ${i+1}. ${item.title} <br>`); 
                    } finally {
                        clearInput();
                    }   
                }

            })
           
        .catch(error => {
            console.log(error);
            errorMessage.textContent = error;
            response.textContent = ``; 
            responseTitle.textContent = '';
            clearInput();
        });
    })

})
