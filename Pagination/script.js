var names = ["Адам","Аким","Аксён","Андроник","Аполлон","Афанасий","Варлаам","Варсонофий","Викентий","Виссарион","Влас","Гавриил","Генрих","Герасим","Гермоген","Гордей","Демид","Демьян","Донат","Елисей","Ерофей","Ефим","Ефрем","Игнат","Илларион","Иннокентий","Иосиф","Капитон","Карл","Кир","Клим","Кондратий","Корней","Лаврентий","Лазарь","Леонтий","Лука","Макар","Милан","Мирон","Нестор","Никодим","Остап","Платон","Рудольф","Савва","Тарас","Тихон","Фрол","Юлий",]  //Источник: https://materinstvo.ru/art/17169 Materinstvo.ru];
var money = [131.66, 675.2, 753.64, 874.47, 170.28, 409.22, 506.86, 239.53, 751.95, 202.81, 222.2, 650.74, 964.68, 858.45, 66.08, 965.66, 443.49, 645.35, 254.65, 877.89, 597.97, 925.67, 223.31, 199.42, 656.09, 493.66, 829.01, 36.93, 949.08, 441.84, 101.16, 950.41, 272.87, 473.84, 324.36, 682.62, 995.77, 638.6, 693.07, 211.27, 575.78, 290.66, 477.16, 673.53, 562.27, 727.74, 597.49, 230.37, 86.46, 22.69];
var age = [37, 38, 31, 49, 38, 41, 28, 48, 36, 18, 26, 32, 40, 22, 39, 54, 61, 33, 51, 27, 47, 47, 60, 43, 44, 43, 25, 42, 64, 48, 62, 46, 41, 35, 33, 46, 61, 39, 27, 48, 36, 29, 32, 58, 51, 54, 15, 16, 63, 28];
var onPage = 20;
var sizeOfNav;


// function moneyMaker(nameArr){
//     var tempArray = [];
//     for (let i = 0; i < nameArr.length; i++) {
//         tempArray[i] = +(Math.random() * 1000).toFixed(2); + 200;
//     }
//     return tempArray;
// }
// function ageMaker(nameArr) {
//     var tempArray = [];
//     for (let i = 0; i < nameArr.length; i++) {
//         tempArray[i] = Math.floor(Math.random() * 50) + 15;
//     }
//     return tempArray;
// }
// money = moneyMaker(names);
// age = ageMaker(names);


var allInfo = [names,money,age];

function joiner(arr) {
    var tempArray = [];
    for (let q = 0; q < arr[0].length; q++) {
        tempArray[q] = new Array;
    }
    for (let j = 0; j < arr[0].length; j++) {
        for (let i = 0; i < arr.length; i++) {
            tempArray[j][i] = arr[i][j];
        }
    }
    return tempArray;
}
var justArr = joiner(allInfo);
// console.log(names);
// console.log(money);
// console.log(age);
// console.log(justArr);

sizeOfNav = Math.ceil( justArr.length / onPage) ;

function chunkArr(arr) {
    var tempArray = [];
    for (index = 0; index < arr.length; index += onPage) {
        tempArray.push(arr.slice(index, index+onPage));
    }
    return tempArray;
}
var arrPerPage = chunkArr(justArr);
// console.log(arrPerPage);


var div = [];

for (let i = 0; i < sizeOfNav; i++) {
    div[i] = document.createElement('div');
    div[i].className = "nav-elm pg-"+i;
    div[i].innerHTML=i + 1;
    div[i].id= i ;
    div[i].setAttribute("style","width: 20px");
    div[i].onclick = function () {
        var x = +(div[i].id);
        fillContent(x,arrPerPage[x]);
    };

}
var parentElem = document.querySelector('.nav');
for (let i = 0; i < sizeOfNav; i++) {
    parentElem.appendChild(div[i]);
}



function fillContent(page,arrPage){
    var el,ell;
    for (let i = 0; i < arrPage.length; i++) {
        el = document.querySelector('.row-'+ i);
        for (let j = 1; j <= 3; j++) {
            ell = el.querySelector('.col-'+ j);
            ell.innerHTML = arrPage[i][j-1];
        }
    }
    if (arrPage.length < 19 ) {
        for (let i = arrPage.length; i < 20; i++) {
            el = document.querySelector('.row-'+ i);
            for (let j = 1; j <= 3; j++) {
                ell = el.querySelector('.col-'+ j);
                ell.innerHTML = '';
            }
        }
    }
    history.pushState('','','?page'+(page + 1));
}

function sortColumn(col){
    var tempArray = [];
    var url = window.location.href;
    var pg = (+url[url.length-1])- 1;
    tempArray = arrPerPage[pg].slice();
    tempArray.sort(function(a,b) {
            return a[col]-b[col]
    });
    if(document.getElementById(col).classList.contains('sorted')){
        tempArray = tempArray.reverse();
        document.getElementById(col).classList.remove('sorted');
    }else document.getElementById(col).classList.add('sorted');
    fillContent(pg,tempArray);
}

// // get current page

var url = window.location.href;
var urlNUM = (+url[url.length-1])- 1;
if(urlNUM>=1 && urlNUM<=sizeOfNav) fillContent(urlNUM,arrPerPage[urlNUM]);
else fillContent(0,arrPerPage[0]);










