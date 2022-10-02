
//BUSCADOR, PERFIL CON LOS RETOS SUBIDOS
// AGREGAR COMENTARIOS A LOS RETOS, CUALQUIERA PUEDE SUBIR LOS COMENTARIOS


let db = firebase.firestore();
let auth = firebase.auth();

const getsReto = () => db.collection("Reto").get();
const Container = document.getElementById("info-container");
const Pagina_Retos = document.getElementById("contenidoReto");
const onGetDataReto = (callback) => db.collection("Reto").onSnapshot(callback);
const deleteReto = id => db.collection('Reto').doc(id).delete();
const getReto = id => db.collection('Reto').doc(id).get();
const formularioReto = document.getElementById("form-register");
let idReto;

const onGetDataSolucion = (callback) => db.collection("Solucion").onSnapshot(callback);
const deleteSolucion = id => db.collection('Solucion').doc(id).delete();
const getSolucion = id => db.collection('Solucion').doc(id).get();

const onGetDataAvance = (callback) => db.collection("Avance").onSnapshot(callback);
const getsAvance = () => db.collection("Avance").get();
const deleteAvance = id => db.collection('Avance').doc(id).delete();
const getAvance = id => db.collection('Avance').doc(id).get();

const getComentary = () => db.collection('Comentario').get();
const onGetDataNombre = (callback) => db.collection("Usuario").onSnapshot(callback);
const onGetDataComentary = (callback) => db.collection("Comentario").onSnapshot(callback);
const ComentarioPaginaRetos = document.getElementById('Comentario');

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetDataReto((querySnapshot) => {
    Container.innerHTML = '';
    querySnapshot.forEach((doc) => {

      const data = doc.data();
      data.id = doc.id;
      //console.log(data);
      //console.log(data.id);

      Container.innerHTML += `
      <div class="card">
        <h4>${data.nombre}</h4>
        <img src="${data.urlImg}">
        <p>${data.descripcion}</p>
        <a class="btn btn-link btn-leer" data-id="${data.id}">Leer más</a>
      </div>`

      db.collection("Usuario").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(JSON.parse(localStorage.getItem("usuario")) == doc.id){
            document.getElementById("nombreUsuario").innerHTML=`${doc.data().nombreUser} ${doc.data().apellidoUser}`;
          }
        })
      })

      const btnsLeermas = document.querySelectorAll('.btn-leer');
      btnsLeermas.forEach(btn => {
        btn.addEventListener('click', async (e) =>{
          idReto = e.target.dataset.id;
          //console.log(idReto);
          guardar_id_localstorage(idReto);
          window.open("Pagina_Retos.html","_self");
        })
      })
    })
  })
})

let usuar = JSON.parse(localStorage.getItem("usuario"));

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetDataReto((querySnapshot) => {
    Pagina_Retos.innerHTML = '';
    querySnapshot.forEach((paginaReto) => {

      const data = paginaReto.data();
      data.id = paginaReto.id;
      //console.log(data);
      var vRetoId = "";
      vRetoId = data.id;
      //console.log(data.id);
      //console.log(doc.data().urlPdf);
      //console.log(vRetoId);
      //console.log(data.usua);
      //console.log(usuar);

      //Solo muestra los botones al dueño del reto
      if (guardar == data.id && usuar == data.usua){
        Pagina_Retos.innerHTML += `
          <div class="secciones">
            <div class="info-reto">
                <h2>${data.nombre}</h2>
                <p>Lider del Proyecto: ${data.representante}</p>
                <p>Institución o Empresa: ${data.institucion}</p>
                <p>${data.descripcion}</p>
                <a href="${data.urlPdf}" target="_blank">Archivo PDF</a>
            </div>
            <div>
              <img src="${data.urlImg}">
            </div>
            <div class="menu-botones">
              <a class="btn btn-link btn-editar" data-id="${data.id}">Editar Reto</a>
              <a class="btn btn-link btn-solucion" data-id="${data.id}">Subir Solución</a>
              <a class="btn btn-link btn-borrar" data-id="${data.id}">Borrar Reto</a>
              <a class="btn btn-link btn-avance" data-id="${data.id}">Subir Avance del Reto</a>
            </div>
          </div>
          <hr>
        <div class="reto-avance" id="${data.id}-Ava"></div>
        <div class="reto-solucion" id="${data.id}-SxR"></div>`

        db.collection("Usuario").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(JSON.parse(localStorage.getItem("usuario")) == doc.id){
              document.getElementById("nombreUsuario").innerHTML=`${doc.data().nombreUser}${doc.data().apellidoUser}`;
            }
          })
        })

        //Visualizacion de Comentarios
        onGetDataComentary((querySnapshotComentary) => {
          ComentarioPaginaRetos.innerHTML = '';
          querySnapshotComentary.forEach((docComentary) => {
            const dataCom = docComentary.data();
            dataCom.id = docComentary.id;
            var ComRetoId = JSON.parse(localStorage.getItem("reto"))
            if (ComRetoId == docComentary.data().ComReto) {
              ComentarioPaginaRetos.innerHTML +=`
              <div>
                <h4>${dataCom.idNombre}</h4>
                <p>${dataCom.comentary}</p>
              </div>`;
            }
          })
        })

        onGetDataSolucion((querySnapshotSolucion) => {
          querySnapshotSolucion.forEach((docSolucion) => {
            const dataSol = docSolucion.data();
            dataSol.id = docSolucion.id;
            if (vRetoId == docSolucion.data().reto) {
              var SolucionBloque = `
              <hr>
              <div id="Sol-${dataSol.id}">
                <h4>${dataSol.nombre}</h4>
                <p>${dataSol.descripcion}</p>
                <a class="nav-link titleslink" href="${docSolucion.data().urlPdf}">PDF de la solución</a>
                <br>
                <button class="btn btn-light btn-borrarSolucion" data-id="${dataSol.id}">Borrar Solución</button>
              </div>`;
              var divSoluciones = document.getElementById(vRetoId + "-SxR");
              divSoluciones.innerHTML += SolucionBloque;
              const btnsDeleteSolucion = document.querySelectorAll('.btn-borrarSolucion');
              btnsDeleteSolucion.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                  //console.log(e.target.dataset.id);
                  await deleteSolucion(e.target.dataset.id)
                  location.reload();
                })
              })
            }
          })
        })
  
        //mostrar avance en la pagina principal
        onGetDataAvance((querySnapshot) => {
          querySnapshot.forEach((docAvance) => {
            const dataAvan = docAvance.data();
            dataAvan.id = docAvance.id;
            //console.log(dataAvan);
            if (vRetoId == docAvance.data().reto) {
              var AvanceBloque = `
              <hr>
              <div>
                <h4>Avance ${dataAvan.numero}</h4> 
                <a class="nav-link titleslink" href="${docAvance.data().urlPdf}">PDF del Avance</a>
                <br>
                <button class="btn btn-light btn-borrarAvance" data-id="${dataAvan.id}">Borrar Avance</button>
              </div>`;
              var divAvance = document.getElementById(vRetoId + "-Ava");
              divAvance.innerHTML += AvanceBloque;
              // no funciona el boton de borrar avance, ARREGLAR
              const btnsDeleteAvance = document.querySelectorAll('.btn-borrarAvance');
              btnsDeleteAvance.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                  //console.log(e.target.dataset.id);
                  await deleteAvance(e.target.dataset.id)
                  location.reload();

                })
              })
            }
          })
        })
  
        const btnsDelete = document.querySelectorAll('.btn-borrar');
        btnsDelete.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            await deleteReto(e.target.dataset.id)
            window.open("PagInicial.html","_self");
          })
        })
  
  
        const btnsSolucion = document.querySelectorAll('.btn-solucion');
        btnsSolucion.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            idReto = e.target.dataset.id;
            //console.log(idReto);
            guardar_id_localstorage(idReto);
            obtener_localstorage();
            window.open("SubirSolucion.html","_self")
          })
        })
  
        const btnsAvance = document.querySelectorAll('.btn-avance');
        btnsAvance.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            idReto = e.target.dataset.id;
            //console.log(idReto);
            guardar_id_localstorage(idReto);
            obtener_localstorage();
            window.open("subiravance.html","_self")
          })
        })
  
        //Editar Reto
        const btnsEditar = document.querySelectorAll('.btn-editar');
        btnsEditar.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await getReto(e.target.dataset.id);
            const nombre = doc.data().nombre;
            const descripcion = doc.data().descripcion;
            const institucion = doc.data().institucion;
            const representante = doc.data().representante;
            //console.log(nombre, descripcion, institucion, representante);
            //console.log(doc.id);
            guardarInfoReto(doc.id, nombre, descripcion, representante, institucion);
            window.open("editarReto.html","_self")
          })
        })
      }

      // Solo para mostrar a los demas usuarios
      if (guardar == data.id && usuar != data.usua){
        Pagina_Retos.innerHTML += `
          <div class="secciones">
            <div class="info-reto">
                <h2>${data.nombre}</h2>
                <p>${data.descripcion}</p>
                <p>Lider del Proyecto: ${data.representante}</p>
                <p>Institución o Empresa: ${data.institucion}</p>
                <a href="${data.urlPdf}" target="_blank">Archivo PDF</a>
            </div>
            <div>
              <img src="${data.urlImg}">
            </div>
          </div>
          <hr>
        <div class="reto-avance" id="${data.id}-Ava"></div>
        <div class="reto-solucion" id="${data.id}-SxR"></div>`

        db.collection("Usuario").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(JSON.parse(localStorage.getItem("usuario")) == doc.id){
              document.getElementById("nombreUsuario").innerHTML=`${doc.data().nombreUser}${doc.data().apellidoUser}`;
            }
          })
        })

        //Visualizacion de Comentarios
        onGetDataComentary((querySnapshotComentary) => {
          ComentarioPaginaRetos.innerHTML = '';
          querySnapshotComentary.forEach((docComentary) => {
            const dataCom = docComentary.data();
            dataCom.id = docComentary.id;
            var ComRetoId = JSON.parse(localStorage.getItem("reto"))
            if (ComRetoId == docComentary.data().ComReto) {
              ComentarioPaginaRetos.innerHTML +=`
              <div>
                <h4>${dataCom.idNombre}</h4>
                <p>${dataCom.comentary}</p>
              </div>`;
            }
          })
        })

        onGetDataSolucion((querySnapshotSolucion) => {
          querySnapshotSolucion.forEach((docSolucion) => {
            const dataSol = docSolucion.data();
            dataSol.id = docSolucion.id;
            if (vRetoId == docSolucion.data().reto) {
              var SolucionBloque = `
              <hr>
              <div id="Sol-${dataSol.id}">
                <h4>${dataSol.nombre}</h4>
                <p>${dataSol.descripcion}</p>
                <a class="nav-link titleslink" href="${docSolucion.data().urlPdf}">PDF de la solución</a>
                <br>
              </div>`;
              var divSoluciones = document.getElementById(vRetoId + "-SxR");
              divSoluciones.innerHTML += SolucionBloque;
              const btnsDeleteSolucion = document.querySelectorAll('.btn-borrarSolucion');
              btnsDeleteSolucion.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                  //console.log(e.target.dataset.id);
                  await deleteSolucion(e.target.dataset.id)
                })
              })
            }
          })
        })
  
        //mostrar avance en la pagina principal
        onGetDataAvance((querySnapshot) => {
          querySnapshot.forEach((docAvance) => {
            const dataAvan = docAvance.data();
            dataAvan.id = docAvance.id;
            //console.log(dataAvan);
            if (vRetoId == docAvance.data().reto) {
              var AvanceBloque = `
              <hr>
              <div>
                <h4>Avance ${dataAvan.numero}</h4> 
                <a class="nav-link titleslink" href="${docAvance.data().urlPdf}">PDF del Avance</a>
                <br>
              </div>`;
              var divAvance = document.getElementById(vRetoId + "-Ava");
              divAvance.innerHTML += AvanceBloque;
              // no funciona el boton de borrar avance, ARREGLAR
              const btnsDeleteAvance = document.querySelectorAll('.btn-borrarAvance');
              btnsDeleteAvance.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                  //console.log(e.target.dataset.id);
                  await deleteAvance(e.target.dataset.id)
                })
              })
            }
          })
        })
  
        const btnsDelete = document.querySelectorAll('.btn-borrar');
        btnsDelete.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            await deleteReto(e.target.dataset.id)
            window.open("PagInicial.html","_self")
          })
        })
  
  
        const btnsSolucion = document.querySelectorAll('.btn-solucion');
        btnsSolucion.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            idReto = e.target.dataset.id;
            //console.log(idReto);
            guardar_id_localstorage(idReto);
            obtener_localstorage();
            window.open("SubirSolucion.html","_self")
          })
        })
  
        const btnsAvance = document.querySelectorAll('.btn-avance');
        btnsAvance.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id)
            idReto = e.target.dataset.id;
            //console.log(idReto);
            guardar_id_localstorage(idReto);
            obtener_localstorage();
            window.open("subiravance.html","_self")
          })
        })
  
        //Editar Reto
        const btnsEditar = document.querySelectorAll('.btn-editar');
        btnsEditar.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await getReto(e.target.dataset.id);
            const nombre = doc.data().nombre;
            const descripcion = doc.data().descripcion;
            const institucion = doc.data().institucion;
            const representante = doc.data().representante;
            //console.log(nombre, descripcion, institucion, representante);
            //console.log(doc.id);
            guardarInfoReto(doc.id, nombre, descripcion, representante, institucion);
            window.open("editarReto.html","_self")
          })
        })
      }

      
    })
  })
})

function guardar_id_localstorage(id) {
  var reto = id
  localStorage.setItem("reto", JSON.stringify(reto));
}

function obtener_localstorage() {
  if (localStorage.getItem("reto")) {
    var reto = JSON.parse(localStorage.getItem("reto"));
    return reto
  } else {
    console.log("No hay entradas en el local storage retoid");
    return false
  }
}

let guardar = obtener_localstorage();
        

function guardarInfoReto(id, nombre, descripcion, representante, institucion) {
  var infoReto = {
    id,
    nombre,
    descripcion,
    representante,
    institucion
  }
  localStorage.setItem("Info", JSON.stringify(infoReto));
}

function obtenerInfoReto() {
  var info = JSON.parse(localStorage.getItem("Info"));
  return info
}

//editar reto, pasar los datos 
const nombreE = document.getElementById("nombreEditar");
const descripcionE = document.getElementById("descripcionEditar");
const representanteE = document.getElementById("nombrerepresentanteEditar");
const institucionE = document.getElementById("institucionEmpresaEditar");
var local = obtenerInfoReto();
//console.log(local);

nombreE.value = local.nombre;
descripcionE.value = local.descripcion;
representanteE.value = local.representante;
institucionE.value = local.institucion;

const updateReto = (id, updateReto) =>
  db.collection("Reto").doc(id).update(updateReto);

  let idEditar = local.id;

async function editarReto() {

  try {
    var nombre = document.getElementById("nombreEditar").value
    var descripcion = document.getElementById("descripcionEditar").value
    var representante = document.getElementById("nombrerepresentanteEditar").value
    var institucion = document.getElementById("institucionEmpresaEditar").value
    if (nombre.length == 0 ||descripcion.length == 0 ||representante.length == 0 ||institucion.length == 0) {
      swal("Error!", "No se editó el reto correctamente, intentalo de nuevo. Asegurate de llenar todos los campos de textos.!", "error");
    } else {
      await updateReto(idEditar, {
        nombre,
        descripcion,
        representante,
        institucion
      })
      swal("Excelente!", "Se ha editado el reto!", "success");
      setTimeout(() => {
        window.open("Pagina_Retos.html","_self");
      }, 2000);
    }
  } catch (e) {
    console.log(e)
  }
}


async function btnCrear() {
  window.open("CrearCuenta.html","_self")
}

async function cuentaNueva(){

  const email = document.getElementById("txtemailCrear").value;
  const password = document.getElementById("txtpasswordCrear").value;
  var nombreUser = document.getElementById("txtnombreCrear").value
  var apellidoUser = document.getElementById("txtapellidoCrear").value
  //console.log(email, password);

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      db.collection("Usuario").doc(user.uid).set({
        nombreUser, apellidoUser, email, password
      })

      swal("Éxito!", "Cuenta ha sido creada!", "success");
      
      setTimeout(() => {
        window.open("index.html","_self");
      }, 2000);

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      swal("Error!", errorMessage, "error");
      //alert(errorMessage);
      //alert(errorCode);
      // ..
    });
}

// Iniciar sesion


async function btniniciarSesion(){
  const email = document.getElementById("singemail").value;
  const password = document.getElementById("singpassword").value;

  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    //console.log(user.uid);
    //alert("Inicio de Sesión con exito");

    localStorage.setItem("usuario", JSON.stringify(user.uid));
    onGetDataNombre((querySnapshotNombre) => {
      querySnapshotNombre.forEach((docNombre) => {
        const dataNom = docNombre.data();
        if (user.uid == docNombre.id) {
          localStorage.setItem("nomUsuario", JSON.stringify(dataNom.nombreUser));
        }
      })
    })
    swal("Bienvenido!", "Inicio de sesión con exito!", "success");
    setTimeout(() => {
      window.open("PagInicial.html","_self");
    }, 2000);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    swal("Error!", errorMessage, "error");
    //alert(errorMessage);
  });

}

async function linkLogout(){

  window.localStorage.clear();
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.open("index.html","_self");
  }).catch((error) => {
    // An error happened.
    alert("Error");
  });
}

var urlPdf;
var urlImg;
async function subirreto() {
  try {
    var nombre = document.getElementById("nombreReto").value
    var descripcion = document.getElementById("Descripcion").value
    var representante = document.getElementById("nombreRepresentante").value
    var institucion = document.getElementById("institucionEmpresa").value
    var usua = JSON.parse(localStorage.getItem("usuario"))

    subirImagen()
    uploadRetoPdf()

    swal("Cargando!", "", "info");

    if (nombre.length == 0 ||descripcion.length == 0 ||representante.length == 0 ||institucion.length == 0) {
      swal("Error!", "LLena todos los campos de textos!", "error");
    } else {
      db.collection("Reto").doc().set({
        nombre, descripcion, representante, institucion, urlPdf, urlImg, usua
      })
      swal("Grandioso!", "El reto se ha subido correctamente!", "success");
      //alert("Se ha subido el reto");
      setTimeout(() => {
        window.open("PagInicial.html","_self");
      }, 2000);
    }
  } catch (e) {
    console.log(e)
    swal("Error!", e, "error");
  }
}



async function subiravance() {
  try {
    let reto = obtener_localstorage();
    if (reto) {
      var numero = document.getElementById("numeroAvance").value
      uploadRetoPdf()

      swal("Cargando!", "", "info");

      if (numero.length == 0) {
        swal("Error!", "LLena todos los campos de textos!", "error");
      } else {
        db.collection("Avance").doc().set({
          numero, urlPdf, reto
        })
        //console.log(reto);
        //alert("Se ha subido el avance");
        swal("Grandioso!", "Se ha subido el avance!", "success");
        setTimeout(() => {
          window.open("Pagina_Retos.html","_self");
        }, 2000);
      }
    }
  } catch (e) {
    console.log(e);
    //console.log(reto);
    //alert("No se subio el avance")
    swal("Error!", e, "error");
  }
}



async function subirsolucion() {
  try {
    let reto = obtener_localstorage();
    if (reto) {
      var nombre = document.getElementById("nombreSolucion").value
      var descripcion = document.getElementById("descripcion").value
      uploadRetoPdf()

      swal("Cargando!", "", "info");
      
      if (nombre.length == 0 || descripcion.length == 0) {
        swal("Error!", "LLena todos los campos de textos!", "error");
      } else {
        db.collection("Solucion").doc().set({
          nombre, descripcion, urlPdf, reto
        })
        //alert("Se ha subido la Solución");
        swal("Grandioso!", "Se ha subido la solución!", "success");
        setTimeout(() => {
          window.open("Pagina_Retos.html","_self");
        }, 2000);
      }
    }

  } catch (e) {
    console.log(e);
    //console.log(reto);
    swal("Error!", e, "error");
  }
}

async function commentBox(){
  var idNombre = JSON.parse(localStorage.getItem("nomUsuario"))
  var comentary = document.getElementById("comentary").value
  var ComReto = JSON.parse(localStorage.getItem("reto"))

  if (comentary.length == 0) {
    swal("Error!", "Llena todos los campos de textos!", "error");
  }else {
    db.collection("Comentario").doc().set({
      idNombre, comentary, ComReto 
    })
    setTimeout(() => {
      location.reload()
    }, 1000);
  }

}

function uploadRetoPdf() {
  try {
    console.log("cargando...")
    //swal("Cargando!", "", "info");
    const ref = firebase.storage().ref();
    const file = document.getElementById('formFile').files[0];
    var hoy = new Date();
    hora = hoy.getHours() + ':' + hoy.getSeconds() + ':' + hoy.getMinutes();
    horaFecha = hoy.getDate() + ':' + (hoy.getMonth() + 1) + ':' + hoy.getFullYear() + ':' + hora;
    const name = file.name + ':' + horaFecha;
    console.log(name);
    if (file == null) {
      //alert("Suba el archivo PDF!");
      swal("Suba el archivo PDF!", "", "warning");
    } else {
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(name).put(file, metadata);

      task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {

          urlPdf = url
          console.log("cargado.")
          //alert("Se ha cargado el pdf")
        });

    }
  } catch (E) {
    console.log(E)
    console.log("No se subio el archivo");
    swal("Suba el archivo PDF!", "", "warning");

  }

}


function subirImagen(){
  try {
    console.log("cargando...")
    //swal("Cargando!", "", "info");
    const ref = firebase.storage().ref();
    const file = document.getElementById('fileImg').files[0];
    var hoy = new Date();
    hora = hoy.getHours() + ':' + hoy.getSeconds() + ':' + hoy.getMinutes();
    horaFecha = hoy.getDate() + ':' + (hoy.getMonth() + 1) + ':' + hoy.getFullYear() + ':' + hora;
    const name = file.name + ':' + horaFecha;
    console.log(name);
    if (file == null) {
      //alert("Suba el archivo PDF!");
      swal("Suba la imagen!", "", "warning");
    } else {
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(name).put(file, metadata);

      task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {

          urlImg = url
          console.log("cargado.")
          //alert("Se ha cargado la imagen")
        });

    }
  } catch (E) {
    console.log(E)
    //alert("No se subio el archivo");
    swal("Error!", E, "warning");
  }
}



