class Pair{
    constructor(index, value){
        this.index = index;
        this.value = value;
    }
}
let a = [];
let n = 100;
let max = -1;
// ########################Generate Array#############################
let generateArray = ()=>{
    return new Promise((resolve, reject)=>{
        for(let i = 0; i < n; i++){
        a[i] = new Pair(Math.floor(Math.random() * 100 + 1), (i + 1));
      max = Math.max(a[i].index, max);
    }
    resolve(10)});
    
}

// ########################################Display##########################################
let display = ()=>{
    return new Promise((resolve, reject)=>{
    let width = window.screen.width;
    width /= n;
    let html = "";
    for(i = 0; i < n; i++){
        html += `<div id="${a[i].value}"style="background-color:white; width:${width}px; height: ${(500 * a[i].index)/max}px;"></div>\n`
    }
    let count = 1;
       let interval = setInterval(() => {
        document.getElementById('container').innerHTML = html;
        count--;
        if(count == 0) clearInterval(interval); 
       }, 1000);
    resolve(10);
    });
    }

generateArray();
display();
let selectEl = document.getElementById('input');
selectEl.addEventListener('change', async (event) => {
    n = selectEl.value;
    await generateArray();
    await display();
  });
// ################################Change color from white to green############################
let changeWTG = ()=>{
    return new Promise((resolve, reject) =>{
    for(let i = 0; i < n; i++){
        let count = 1;
    let interval = setInterval(()=>{
        try{
        document.getElementById(a[i].value).style.background= "linear-gradient(to bottom, #233329 0%, #63d471 100%)";
    }
        catch(e){
            console.log("Not found");
        }
        count--;
        if(count == 0) clearInterval(interval);
    }, 1000);
 }
 resolve(10);});
}
// ############################White to red color###############################
let changeWTR = (index)=>{
    return new Promise((resolve, reject) =>{
        let count = 1;
    let interval = setInterval(()=>{
        try{
        document.getElementById(a[index].value).style.background= "red";
    }
        catch(e){
            console.log("Not found");
        }
        count--;
        if(count == 0) {
            // document.getElementById(a[index].value).style.background= "white";
            clearInterval(interval);
        }
    }, 1000);
 resolve(10);});
}

// ############################White to blue color###############################
let changeWTB = (index)=>{
    return new Promise((resolve, reject) =>{
        let count = 1;
    let interval = setInterval(()=>{
        try{
        document.getElementById(a[index].value).style.background= "blue";
    }
        catch(e){
            console.log("Not found");
        }
        count--;
        if(count == 0) {
            // document.getElementById(a[index].value).style.background= "white";
            clearInterval(interval);
        }
    }, 1000);
 resolve(10);});
}


// ################################Bubble sort##############################
let bubbleSort = async ()=>{
  for(let i = 0; i < n - 1; i++){
      for(let j = 0; j < n - 1 - i; j++){
        
        if(a[j].index > a[j + 1].index){
            await changeWTR(j + 1);
            await changeWTB(j);
            let temp = a[j];
            a[j] = a[j + 1];
            a[j + 1] = temp;
        }
        await display();
      }
  }
  await display();
  await changeWTG();
}
// bubbleSort();
// ##########################Merge Sort#################################
let merge = async (l, mid, r)=>{
        let i = l;
        let j = mid + 1;
        let brr = [];
        while(i <= mid && j <= r){
            if(a[i].index <= a[j].index) {
                await changeWTR(i);
                brr.push(a[i++]);
                }
            else {
                await changeWTB(j);
                brr.push(a[j++]);
            }
        }
        while(i <= mid) {
            await await changeWTR(i);
            brr.push(a[i++]);
        }
        while(j <= r) {
            await changeWTB(j);
            brr.push(a[j++]);
        }
        for(let k = l; k <= r; k++) a[k]=brr[k - l];
        return new Promise((resolve, reject)=>{resolve(10);});
}
let mergeSort = async (l, r)=>{
    if(l >= r) return; 
   let mid = parseInt((l + r) / 2);
   await changeWTR(l);
   await changeWTB(r);
   await changeWTR(mid);
    await mergeSort(l, mid);
    await mergeSort(mid + 1, r);
   await merge(l, mid, r);
   await display();
}
let mergeSortDriver = async ()=>{
 await mergeSort(0, n - 1);
await changeWTG();
}
// mergeSortDriver();

// ###########################QuickSort#######################################
let partion = async (l, r)=>{
        let i = l - 1;
        let pivot = a[r].index;
        for(let j = l; j <= r - 1; j++){
            await changeWTR(j);
            await changeWTB(r);
            if(a[j].index <= pivot){
                i++;
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        } 
        let temp = a[i + 1];
        a[i + 1] = a[r];
        a[r] = temp;
        return new Promise((resolve, reject) =>{
           resolve(i + 1);
        });
}

let quickSort = async (l, r)=>{
      if(l >= r) return;
      await changeWTB(r);
      await changeWTR(l);
   let par = await partion(l, r);
   await display();
   await quickSort(l, par - 1);
   await quickSort(par + 1, r);
   await display();
   return new Promise((resolve, reject)=>{resolve(10);});
}
let quickSortDriver =  async ()=>{
   await quickSort(0, n - 1); 
   await changeWTG();
}
// quickSortDriver();

// ###############################SelectionSort#############################
let selectionSort = async ()=>{
    for(let i = 0; i < n - 1; i++){
        let index = i;
        for(let j = i; j < n; j++){
            await changeWTR(j);
            await changeWTB(index);
        if(a[j].index < a[index].index){
        index = j;
        }
        }
        let temp = a[i];
        a[i] = a[index];
        a[index] = temp;
        await display();
    }
    await changeWTG();
}
// selectionSort();
// #################################Insertion Sort################################
let insertionSort = async ()=>{
    for (let i = 1; i < n; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j].index > key.index) {
            await changeWTR(j);
            await changeWTB(i);
            a[j + 1] = a[j];
            j = j - 1;
        }
        a[j + 1] = key;
        await display();
    }
    await changeWTG();
}
// insertionSort();

document.getElementById('Generate').onclick = async ()=>{
    await generateArray();
    await display();
}
document.getElementById('Select').onclick = ()=>{
    selectionSort();
}
document.getElementById('Bubble').onclick = ()=>{
    bubbleSort();
}
document.getElementById('Merge').onclick = ()=>{
    mergeSortDriver();
}
document.getElementById('Quick').onclick = ()=>{
    quickSortDriver();
}
document.getElementById('Insertion').onclick = ()=>{
    insertionSort();
}
