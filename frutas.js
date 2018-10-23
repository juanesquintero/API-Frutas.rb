var app = new function () {

  function loadFruits() {
    var xmlhttp = new XMLHttpRequest() //libreria-clase para hacer solicitudes
    var url = "http://127.0.0.1:4567/fruits"
    xmlhttp.open('GET',url,true) // peticion get a una url 
    xmlhttp.addEventListener('load',reqListener) //agregar un evento cuando cargue 
    xmlhttp.send()
  }

  function reqListener(){
    console.log(this)
    console.log(this.responseText)
    var obj = JSON.parse(this.responseText)
    var item = obj['fruits']
    var dataPrincipal =""
    var dataCRUD =""
    item.forEach(e => {     
        dataPrincipal += '<tr>'
        var nombre = "'"+e.nombre+"'"
        dataPrincipal += '<td><img src='+ e.imagen +' Onclick= "showImage('+nombre+')" width="130px" height="100px"></td>'
        dataPrincipal += '</tr>'

        dataCRUD+='<tr>'
        dataCRUD+='<td>'+ e.nombre + '</td>'
        dataCRUD+='<td><img src=' + e.imagen + ' width="130px" height="100px"></td>'
        dataCRUD+="<td><button type="+'"button"'+" id="+'"btnEdit"'+"Onclick="+'"edit('+e.id+')"'+">"+"Editar"+"</button>"
        dataCRUD+="</td><td><button type="+'"button"'+" id="+'"btnDelete"'+"Onclick="+'"borrar('+e.id+')"'+">"+"Eliminar"+"</button></td>"
        dataCRUD+='</tr>'
    }); 
    document.getElementById('imagesListadoPrincipal').innerHTML = dataPrincipal
    document.getElementById('listadoCRUD').innerHTML=dataCRUD
  }

  edit = function(index){
    listener = function(){      
      var obj = JSON.parse(this.responseText)
      //imagen = "./imagenes/4.jpg"
      var indice = parseInt(obj.imagen.slice(11, 12))-1 
      document.getElementById('nombreFruta').value= obj.nombre     
      document.getElementById("cbImagenes").selectedIndex = indice
      console.log(obj.id,obj.nombre,obj.imagen,indice) 
    }  
    var xmlhttp = new XMLHttpRequest()
    var url = "http://127.0.0.1:4567/fruits"
    xmlhttp.open("GET", url+"/"+index, true)
    xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8')
    xmlhttp.addEventListener('load',listener) //agregar un evento cuando cargue 
    xmlhttp.send()  

    document.getElementById('fruitId').value = index    
    document.getElementById('btnNew').style.display = "none"
    document.getElementById('btnUpdate').style.display = "inline"      
  }

  add = function (){    
    var image = document.getElementById('cbImagenes').value
    var name = document.getElementById('nombreFruta').value   
    console.log(name,image)

    var xmlhttp = new XMLHttpRequest() 
    var url = "http://127.0.0.1:4567/fruits"
    xmlhttp.open("POST", url, true)
    xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8')
    xmlhttp.send(JSON.stringify({id: 0 ,nombre:name, imagen:image}))
    loadFruits()
    alert("Agregado")
    location.reload()
  }

  
  update=function(){
    var image = document.getElementById('cbImagenes').value
    var name = document.getElementById('nombreFruta').value
    var ID = document.getElementById('fruitId').value

    console.log(ID,name,image)

    var xmlhttp = new XMLHttpRequest()
    var url = "http://127.0.0.1:4567/fruits"
    xmlhttp.open("PUT", url+"/"+ID, true)
    xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8')
    xmlhttp.send(JSON.stringify({id:parseInt(ID) ,nombre:name, imagen:image}))
    loadFruits();
    alert("Modificado")
    location.reload()
  }
  
  borrar = function(index){
    //console.log(index)
    var xmlhttp = new XMLHttpRequest()
    var url = "http://127.0.0.1:4567/fruits"
    xmlhttp.open("DELETE", url+"/"+index, true)
    xmlhttp.send()
    loadFruits()
    alert("Eliminado")
    location.reload()
  }

  showImage = function (fruta) {
    alert(fruta)
  }
  
  // Se llama al cargar la página
  loadFruits()
}