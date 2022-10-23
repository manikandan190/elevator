let ev_standby = true;
let ev_direction ='up';
let ev_destination ='';
let ev_door = false;
let ev_callarray = new Array(0);
$(document).ready(function(){
  let all_floor = document.querySelectorAll('.floorBtn');
  for (let i=0; i<all_floor.length; i++){
    all_floor[i].addEventListener('click', pushTheButtons);
  }
});

function pushTheButtons(){
  let call_floor = parseInt(this.value);
  let message = 'on';
  adjustFloorBtn(call_floor, message);
 
 
  let ev_floor = 0;
  if(ev_standby==true){
    startEv(call_floor, ev_floor);
  } else {
    if(ev_callarray.indexOf(call_floor)==-1){
      ev_callarray.push(call_floor);
    }
  }
} 
function startEv(call_floor, ev_floor){
  console.log("startEv()");
  let gap = ev_floor - call_floor;
    if(gap < 0) { 
      ev_direction="up";

    } else if (gap > 0) { 
      ev_direction="down";

    } else { 
      console.log("startEv() gap: "+ gap);
      console.log("floorCall gap ");
    }
    ev_destination=call_floor;
    ev_callarray[0]=call_floor;
    if(ev_callarray[0]=ev_destination){ 
      ev_standby=false;
      console.log("startEv()->moveEle call_floor:" +call_floor);
      moveEle();
  }
} 
function moveEle(){
  console.log("moveEle() direction: "+ev_direction);
  console.log("moveEle() callarray: "+ev_callarray);
  console.log("ev_destination: "+ev_destination);

  if(ev_standby==true){
  } else {
    if(ev_callarray.length==0){
      ev_standby=true;
    } else {
      if(ev_destination=="undefined" && ev_direction=="up"){
        ev_destination = Math.max.apply(null, ev_callarray);
      } else if(ev_destination=="undefined" && ev_direction=="down"){
        ev_destination = Math.min.apply(null, ev_callarray);
      }
      
        let tmp = ev_callarray[0];
        
        let key= setTimeout("openDoor("+tmp+")", 2000);

    }
  }
}

function openDoor(tmp){ 
   document.getElementById("id1").innerHTML = tmp;

  let all_floor = document.querySelectorAll("img");
  $(all_floor).eq(5-tmp).attr("src","img/on.jpeg").width(500).height(500);
  let key = setTimeout("closeDoor("+tmp+")", 2000);
}


function closeDoor(tmp){
  let all_floor = document.querySelectorAll("img");
  adjustFloorBtn(tmp, "off");
  $(all_floor).eq(5-tmp).attr("src","img/off.jpeg").width(500).height(500);
  ev_callarray.shift();
  let key= setTimeout("orderSequence("+tmp+")", 5000);

}


function orderSequence(tmp){

  console.log("OS tmp: "+tmp);
  console.log("os desL "+ ev_destination);
  console.log("OS ev_callarray.length: "+ev_callarray.length);

  if(tmp==ev_destination && ev_callarray.length>0){
    ev_direction=='up'? ev_direction='down' : ev_direction='up';
  }



  
   if(ev_direction=='up'){
    let arr=ev_callarray.filter(function(n){
      return n >= tmp;
    });
    let arr2=ev_callarray.filter(function(n){
      return n < tmp;
    });

    arr.sort(function(a, b){return a-b});
    arr2.sort(function(a, b){return b-a});
    ev_callarray=arr.concat(arr2);
    ev_destination = Math.max.apply(null, ev_callarray); 

    console.log("closeDoor up: "+ev_callarray);
    console.log("ev_destination: "+ev_destination);

  } else { 
    let arr=ev_callarray.filter(function(n){
      return n <= tmp;
    });
    let arr2=ev_callarray.filter(function(n){
      return n > tmp;
    });
 
    arr.sort(function(a, b){return b-a});
    arr2.sort(function(a, b){return a-b});
    console.log(arr);
    console.log(arr2);
    ev_callarray=arr.concat(arr2);
    
    ev_destination = Math.min.apply(null, ev_callarray); 
    console.log("closeDoor down: "+ev_callarray);
    console.log("ev_destination: "+ev_destination);
  }

  moveEle();
}


function adjustFloorBtn(floor, message){
  if (message=="on"){
    let btn = $("#"+floor+"f");
    $(btn).css("background-color","red");
    $(btn).css("disabled","disabled");

  } else if (message="off") {
    let btn = $("#"+floor+"f");
    $(btn).css("background-color","");
    $(btn).css("disabled","");
  }

}
function getStyle(elem){
   
       return null;
   
 }
