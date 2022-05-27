const firebaseConfig = {
    apiKey: "AIzaSyD8Pck2vy-SDwKVUpRpUyz6-d37IvXO5uM",
    authDomain: "to-do-app-zaheer.firebaseapp.com",
    projectId: "to-do-app-zaheer",
    storageBucket: "to-do-app-zaheer.appspot.com",
    messagingSenderId: "631645646892",
    appId: "1:631645646892:web:42b2830e395cd241c3a189",
    measurementId: "G-J3T51PYNGL"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   console.log(firebase)
  
  var list = document.getElementById("list")

  firebase.database().ref("todos").on("child_added",function(data){
        var list = document.getElementById("list");
        var addItem = document.getElementById("input")
        var li = document.createElement("li")
        var liTxt = document.createTextNode(data.val().value)
        li.appendChild(liTxt);
    
    
        var editBtn = document.createElement("button")
        var editTxt = document.createTextNode("EDIT")
        editBtn.appendChild(editTxt);
        editBtn.setAttribute("id",data.val().key)
        editBtn.setAttribute("onclick","editItem(this)")
        editBtn.setAttribute("class","editbtn")
        li.appendChild(editBtn)
    
    
        var dltBtn = document.createElement("button")
        var delTxt = document.createTextNode("DELETE")
        dltBtn.appendChild(delTxt)
        dltBtn.setAttribute("id",data.val().key)
        dltBtn.setAttribute("onclick","dltItem(this)")
        dltBtn.setAttribute("class","dltbtn")
    
        li.appendChild(dltBtn)
        list.appendChild(li)
        addItem.value = ""
  })


  function addTodo(){
      var todoItem = document.getElementById("input")
      var key = firebase.database().ref("todos").push().key
      var todo = {
          value: todoItem.value,
          key: key
      }
      firebase.database().ref("todos").child(key).set(todo);
  }


  function dltItem(e){
      firebase.database().ref("todos").child(e.id).remove()
        e.parentNode.remove()
    }


    function editItem(e){
    var a = e.parentNode.firstChild.nodeValue
    var b = prompt("Enter edit value",a)
    var editTodo = {
        value: b,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = b 
    }

    function dltAll(){
    firebase.database().ref("todos").remove()
    list.innerHTML = "";
    }