var names = ["Адам","Тарас","Гермоген","Гордей","Демид","Тихон","Фрол","Афанасий","Аксён","Андроник","Аполлон","Викентий","Виссарион","Влас","Гавриил","Генрих","Герасим","Демьян","Донат","Елисей","Ерофей","Ефим","Ефрем","Игнат","Илларион","Иннокентий","Иосиф","Капитон","Карл","Кир","Клим","Кондратий","Корней","Лаврентий","Лазарь","Леонтий","Лука","Макар","Милан","Мирон","Нестор","Никодим","Остап","Платон","Варлаам","Варсонофий","Аким","Рудольф","Савва","Юлий",]  //Источник: https://materinstvo.ru/art/17169 Materinstvo.ru];
var money = [131.66, 675.2, 753.64, 874.47, 170.28, 409.22, 506.86, 239.53, 751.95, 202.81, 222.2, 650.74, 964.68, 858.45, 66.08, 965.66, 443.49, 645.35, 254.65, 877.89, 597.97, 925.67, 223.31, 199.42, 656.09, 493.66, 829.01, 36.93, 949.08, 441.84, 101.16, 950.41, 272.87, 473.84, 324.36, 682.62, 995.77, 638.6, 693.07, 211.27, 575.78, 290.66, 477.16, 673.53, 562.27, 727.74, 597.49, 230.37, 86.46, 22.69];
var age = [37, 38, 31, 49, 38, 41, 28, 48, 36, 18, 26, 32, 40, 22, 39, 54, 61, 33, 51, 27, 47, 47, 60, 43, 44, 43, 25, 42, 64, 48, 62, 46, 41, 35, 33, 46, 61, 39, 27, 48, 36, 29, 32, 58, 51, 54, 15, 16, 63, 28];
var onPage = 20;
var sizeOfNav;
var arrPerPage = [];
var allInfo = [names,money,age];
var notOriginalArray = arrPerPage.slice();

function joiner(arr) {
    let tempArray = [];
    for (let q = 0; q < arr[0].length; q++) {
        tempArray[q] = new Array;
    }
    for (let j = 0; j < arr[0].length ; j++) {
        tempArray[j][0] = j +1;
        for (let i = 1; i <= arr.length; i++) {
            tempArray[j][i] = arr[i-1][j];
        }
    }
    return tempArray;
}
var justArr = joiner(allInfo);

sizeOfNav = Math.ceil( justArr.length / onPage) ;

function chunkArr(arr) {
    var tempArray = [];
    for (index = 0; index < arr.length; index += onPage) {
        tempArray.push(arr.slice(index, index+onPage));
    }
    return tempArray;
}
function unChunkArr(arr) {
    let tempArray = [];
    let length = 0;
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr[j].length; i++) {
            tempArray[i+length] = arr[j][i];
        }
        length += arr[j].length;
    }
    return tempArray;
}

arrPerPage = chunkArr(justArr);
notOriginalArray = arrPerPage.slice();




function slider(number){
    let myNode = document.querySelector('.nav');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    var div = [];
    for (let i = 0; i < number; i++) {
        div[i] = document.createElement('div');
        div[i].className = "nav-elm pg-"+i;
        div[i].innerHTML=i + 1;
        div[i].id= i ;
        div[i].setAttribute("style","width: 20px; border-radius:5px");
        div[i].onclick = function () {
            let x = +(div[i].id);
            let permission = true;
            for (let j = 0; j < 4; j++) {
                if(document.querySelector('.col-' + j).classList.contains('sorted') || document.querySelector('.col-' + j).classList.contains('rev-sorted')) permission = false;
            }
            if(document.querySelector('.col-1').classList.contains('search' ))  permission = false; 
            if( permission ){
                fillContent(x,arrPerPage[x]);
            } else {
                fillContent(x,notOriginalArray[x]);
            }
        };
    }
    var parentElem = document.querySelector('.nav');
    for (let i = 0; i < number; i++) {
        parentElem.appendChild(div[i]);
    }
}

function fillContent(page,arrPage){
    var el,ell;
    for (let i = 0; i < arrPage.length; i++) {
        el = document.querySelector('.row-'+ i);
        for (let j = 0; j <= 3; j++) {
            ell = el.querySelector('.col-'+ j);
            ell.innerHTML = arrPage[i][j];
        }
    }
    if (arrPage.length < 19 ) {
        for (let i = arrPage.length; i < 20; i++) {
            el = document.querySelector('.row-'+ i);
            for (let j = 0; j <= 3; j++) {
                ell = el.querySelector('.col-'+ j);
                ell.innerHTML = '';
            }
        }
    }
    history.pushState('','','?page'+(page + 1));
    changeIcon();
}

function sortNum(col){
    let tempArray = [];
    let page = whichPage();
    tempArray = unChunkArr(notOriginalArray).slice();
    tempArray.sort(function(a,b) {
            return a[col]-b[col]
    });

    if(document.getElementById(col).classList.contains('sorted')){
        tempArray = tempArray.reverse();
        removeAddedClass();
        document.getElementById(col).classList.add('rev-sorted');
    }else {
        removeAddedClass();
        document.getElementById(col).classList.remove('rev-sorted');
        document.getElementById(col).classList.add('sorted');
    }
    notOriginalArray = chunkArr(tempArray);
    console.log(notOriginalArray);
    
    fillContent(page , notOriginalArray[page]);
    slider(notOriginalArray.length);
}

function sortText(col){
    console.log(1212);
    let page = whichPage();
    let tempArray = [];
    tempArray = unChunkArr(notOriginalArray);

    tempArray.sort(function(a,b) {
        
        if (a[col] == b[col])   return 0;
        if (a[col] > b[col])   return 1;
        if (a[col] < b[col])   return -1;

    });
    if(document.getElementById(col).classList.contains('sorted')){
        tempArray = tempArray.reverse();
        removeAddedClass();
        document.getElementById(col).classList.add('rev-sorted');
    }else {
        removeAddedClass();
        document.getElementById(col).classList.remove('rev-sorted');
        document.getElementById(col).classList.add('sorted');
    }
    notOriginalArray = chunkArr(tempArray);
    fillContent(page,notOriginalArray[page]);
    
}

function changeIcon(){
    for (let i = 0; i < 4; i++) {
        let el = document.getElementById(i);
        if(el.classList.contains('sorted')){
            let ell = el.getElementsByTagName("img");
            ell[0].setAttribute('src','3.png');
        }
        if(el.classList.contains('rev-sorted')){
            let ell = el.getElementsByTagName("img");
            ell[0].setAttribute('src','2.png');
        }
        if(!el.classList.contains('sorted') && !el.classList.contains('rev-sorted')){
            let ell = el.getElementsByTagName("img");
            ell[0].setAttribute('src','1.png');
        }
    }
    
}

function search( ){
        let element = document.getElementById('input');
        let text = element.value;
        let tempArray = [];
        let page = whichPage();
        
        let x = 0;
        for (let i = 0; i < justArr.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (j === 1) {
                    if(justArr[i][j].toLowerCase().includes(text.toLowerCase())){
                        tempArray[x] = justArr [i];
                        x++;
                        break;
                    }
                } else {
                    if(String(justArr[i][j]).includes(text)){
                        tempArray[x] = justArr [i];
                        x++;
                        break;
                    }
                }
                
            }
        }
        document.getElementById('input').value = '';
        notOriginalArray = chunkArr(tempArray);
        if (notOriginalArray.length === 0) {
            alert("Не найдено!")
        }else {
            fillContent(0, notOriginalArray[0]);
            document.querySelector('.col-1').classList.add('search' );
            slider(notOriginalArray.length);
        } 
        removeAddedClass();
}

// // get current page

var urlNUM = whichPage();
if(urlNUM>=1 && urlNUM<=sizeOfNav) {
    fillContent(urlNUM,arrPerPage[urlNUM]);
    slider(sizeOfNav)
}
else {
    fillContent(0,arrPerPage[0]);
    slider(sizeOfNav);
}

// Additional functions

function removeAddedClass() {

    document.getElementById(0).classList.remove('sorted');
    document.getElementById(1).classList.remove('sorted');
    document.getElementById(2).classList.remove('sorted');
    document.getElementById(3).classList.remove('sorted');
    
    document.getElementById(0).classList.remove('rev-sorted');
    document.getElementById(1).classList.remove('rev-sorted');
    document.getElementById(2).classList.remove('rev-sorted');
    document.getElementById(3).classList.remove('rev-sorted');
    changeIcon();
}

function whichPage(){
    let url = window.location.href;
    return (+url[url.length-1])- 1;
}






