 function dom (errors){
var ul = document.createElement('ul');
var li = document.createElement('li');
li.innerHTML = errors;
document.appendChild('li');
}
