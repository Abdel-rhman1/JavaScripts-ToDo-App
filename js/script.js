let list = document.getElementById("lists");
let lis = document.getElementsByClassName("List");
let Input = document.getElementById("listInput");
let submit = document.getElementById("basic-addon2");
let timer  = document.getElementById("timer");
if(localStorage.getItem("Lists")!=null){
    //console.log("There is Item With this Name: ");
   var ListContainerArray = JSON.parse (localStorage.getItem("Lists"));
   showData();
}else{
    //console.log("There is No Item With Name: ");
   var ListContainerArray = [];
}
submit.addEventListener("click" , function(){
    let regex = /^[A-Za-z0-9]{6,}$/;
    //console.log(regex.test(Input.value));
    let object = {
        Name : Input.value,
        Complete : 0,
    }
    
   
    if(Input.value != "" &&  regex.test(Input.value)){  
       let  list = {
           Name : Input.value,
           Complete : 0,
       } 
       ListContainerArray.push(list);
       localStorage.setItem("Lists" , JSON.stringify(ListContainerArray));
    }else{
        alert("Error In adding This List");
    }
   
    showData();
    //console.log(ListContainerArray);
});
function foundOrNot(object){
    if(ListContainerArray.length == 0) return 1;
    for(let i=0;ListContainerArray.length;i++){
        if(ListContainerArray[i].Name == object.Name && ListContainerArray[i].Complete == object.Complete){
            return 1;
        }
    }
    return 0;
}
function showData(){
    console.log(ListContainerArray.length);
    let tmp = ``;
    
        for(let i=0;i<ListContainerArray.length;i++){
        //    console.log(ListContainerArray[i].Complete );
            tmp+= `
            <div class="child w-100 mb-1 py-2 border-1 px-2 pr-4 bg-info ">`;
                if(ListContainerArray[i].Complete == 1){
      //              console.log("Yes Completed");
                    tmp+=`<h4 class="float-left List" onclick='complete(${i})'><del>${ListContainerArray[i].Name}</del></h4>`;
                }else{
                    tmp+=`<h4 class="float-left List" onclick='complete(${i})'>${ListContainerArray[i].Name}</h4>`;
                }
                
                tmp+=`<span class='delete float-right' onclick='deleteList(${i})'>X</span>
                <div class='clearfix mr-2'></div>
            </div>
            `;
        }
    
    
    list.innerHTML = tmp;
}

function deleteList(index){
    //console.log("dtete This List" + index);
    ListContainerArray.splice(index , 1);
    localStorage.setItem("Lists" , JSON.stringify (ListContainerArray));
    showData();
}
function complete(index){
    if(ListContainerArray[index].Complete ==1){
        ListContainerArray[index].Complete = 0;
    }else{
        ListContainerArray[index].Complete = 1;
    }
    localStorage.setItem("Lists" , JSON.stringify(ListContainerArray));    
    //console.log(ListContainerArray[index]);
    showData();
}


function getTime(){
    let date = new Date();
    timer.innerHTML = "<span>" + date.toLocaleDateString() +"<br>" + date.toLocaleTimeString() + "</span>";
}



setInterval(getTime , 1000)
