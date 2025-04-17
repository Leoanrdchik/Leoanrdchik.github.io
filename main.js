

//этот код отвечает за кнопку добавить
let recipe = [];

document.querySelector('.add_btn').addEventListener('click', function(){
    let name = document.querySelector('.item_name');
    let count = document.querySelector('.item_count');
    let type = document.querySelector('.item_type');

    if(!name.value) {
        alert('введите название ингредиента')
        return false
    }

    recipe.push({
        "name": name.value,
        "count": +count.value,
        "type": type.value
    })

    let result
    if(+count.value === 0) {
        result = `${name.value} - по вкусу`
    } else {
        result = `${name.value} - ${count.value} ${type.value}`
    }

    let div = document.createElement('div')
    div.innerHTML = `
    <div class="d-flex space_beetwen">
    <div>${result}</div>
    <button class ="remove_btn" data-name="${name.value}">&times;<button>  
    </div>
    `

    document.querySelector('.recipe').append(div)
    name.value = ''
    name.count = ''
});




//изменить название рецепта

document.querySelector('.recipe_name').addEventListener('click', function() {
    let name = prompt("введите название рецепта");
    if (name) {
        document.querySelector('.recipe_name').textContent = name
    }
})

//кнопка копирования

const copyButton = document.getElementById('copy_btn');

copyButton.addEventListener('click',  () => { 
    const textToCopy = document.querySelector('.result_new_recipe').innerHTML;
    
    navigator.clipboard.writeText(textToCopy)    
        .then(() => {
            alert("текст успешно скопирован!")
        })
        .catch(err => {
            console.log('не удалось скопировать текст:', err)
        });
});

//кнопка удаления

document.querySelector('.recipe').addEventListener('click', function(e) {
    if (!e.target.dataset.name) {
        return false;
    }
    e.target.closest('.d-flex').remove()

    for(let i=0; i < recipe.length; i++) {
        if (recipe[i]["name"] == e.target.dataset.name) {
            recipe.splice(i, 1)
        }
    }
})

// кнопка вычислить
document.querySelector('.button_result').addEventListener('click', function (){
    document.querySelector('.result_new_recipe').innerHTML = ''
    let ratio_type = +document.querySelector('.item_ratio_type').value
    let ratio = +document.querySelector('.item_ratio').value
    
    if(!ratio) {
        alert('введите число кроме нуля');
        return false;
    }

    let new_recipe = []
    if (ratio_type === 1) {
        for(let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                "name": recipe[i]["name"],
                "count": (+recipe[i]["count"]/ratio.toFixed(3)),
                "type": recipe[i]["type"]
            })
        }
    }

    if (ratio_type === 2) {
        for(let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                "name": recipe[i]["name"],
                "count": (+recipe[i]["count"]*ratio),
                "type": recipe[i]["type"]
            })
        }
    }
    
    for(let i=0; i<new_recipe.length; i++) {
        let result
        if(+new_recipe[i]["count"] == 0) {
            result = "по вкусу"
        } else {
            result = `${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`
        }
        
        let div = document.createElement('div')
        div.innerHTML = `
        <div class="d-flex">
        <div>${new_recipe[i]["name"]} - ${result}</div>
        </div>
        `

        document.querySelector('.result_new_recipe').append(div)
    }
})

//КНОПКИ ПЛЮС МИНУС
const buttonMinus = document.getElementById('minus');
const buttonPlus = document.getElementById('plus');

function minusFontSize () {
    let nowFontSize = parseInt(window.getComputedStyle(document.body).fontSize);

    if (nowFontSize > 8) {
        document.body.style.fontSize = `${nowFontSize - 1}px`;
    }
}

function plusFontSize() {
    let nowFontSize = parseInt(window.getComputedStyle(document.body).fontSize);

    if (nowFontSize < 22) {
        document.body.style.fontSize = `${nowFontSize + 1}px`;
    }
}

buttonMinus.addEventListener('click', minusFontSize); 
buttonPlus.addEventListener('click', plusFontSize); 


