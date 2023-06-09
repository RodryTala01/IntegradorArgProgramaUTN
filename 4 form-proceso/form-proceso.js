
selectSucursal = document.getElementById("tipoSucursal");
selectPlan = document.getElementById("tipoPlan");
selectPlan.disabled = true;

seleccionarSucu = selectPlan.querySelector('option[value="seleccione"]')

plan1 = selectPlan.querySelector('option[value="plan1"]')
plan2 = selectPlan.querySelector('option[value="plan2"]')
plan3 = selectPlan.querySelector('option[value="plan3"]')
plan4 = selectPlan.querySelector('option[value="plan4"]')
plan5 = selectPlan.querySelector('option[value="plan5"]')

selectSucursal.addEventListener("change", function () {
    if (selectSucursal.value == "cordoba") {
        selectPlan.disabled = false;
        selectPlan.value = "seleccione"

        plan1.disabled = false;
        plan2.disabled = false;
        plan3.disabled = false;
        plan4.disabled = false;
        plan5.disabled = false;

    } else if (selectSucursal.value == "caba") {
        selectPlan.disabled = false;
        selectPlan.value = "seleccione"

        plan1.disabled = false;
        plan2.disabled = false;
        plan3.disabled = false;
        plan4.disabled = false;
        plan5.disabled = true;

    } else if (selectSucursal.value == "lomas") {
        selectPlan.disabled = false;
        selectPlan.value = "seleccione"

        plan1.disabled = false;
        plan2.disabled = true;
        plan3.disabled = true;
        plan4.disabled = false;
        plan5.disabled = true;

    } else if (selectSucursal.value == "mendoza") {
        selectPlan.disabled = false;
        selectPlan.value = "seleccione"

        plan1.disabled = false;
        plan2.disabled = false;
        plan3.disabled = true;
        plan4.disabled = false;
        plan5.disabled = true;

    }
    else {
        selectPlan.disabled = true;
        selectPlan.value = "seleccione"

    }
});


// API PROVINCIAS Y LOCALIDADES ARGENTINAS


const selectProvincias = document.getElementById("selectProvincias")
const selectLocalidad = document.getElementById("selectLocalidad")

function provincia() {

    fetch("https://apis.datos.gob.ar/georef/api/provincias") //Llamo a la API
        .then(res => res.ok ? res.json() : Promise.reject(res)) //Si es true, convertir los resultados a formato json. Sino, rechazar
        .then(json => {

            const provincias = json.provincias;

            // Ordenar las provincias alfabéticamente
            provincias.sort(function (a, b) {
                return a.nombre.localeCompare(b.nombre);
            });

            let opciones = `<option value="--Seleccione Provincia--">--Seleccione Provincia--</option>`;

            json.provincias.forEach(element => {
                opciones += `<option value="${element.nombre}">${element.nombre}</option>`
            });

            selectProvincias.innerHTML = opciones;
        })
}

document.addEventListener("DOMContentLoaded", provincia) //Ejecutar la funcion cuando termine de cargar el DOM 


function localidad(provincia) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=5000`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {

            const localidades = json.localidades;

            // Ordenar las localidades alfabéticamente
            localidades.sort(function (a, b) {
                return a.nombre.localeCompare(b.nombre);
            });


            let opciones = `<option value="--Seleccione Localidad--">--Seleccione Localidad--</option>`;

            json.localidades.forEach(element => {

                opciones += `<option value="${element.id}">${element.nombre}</option>`
            });

            selectLocalidad.innerHTML = opciones;
        })
}

selectProvincias.addEventListener("change", e => {
    localidad(e.target.value);
})

//CONFIRMACION

function confirmar() {


    nombre = document.getElementById("inputNombre").value
    apellido = document.getElementById("inputApellido").value
    email = document.getElementById("inputEmail").value
    tipoDocu = document.getElementById("tipoDNI").value
    numeroDoc = document.getElementById("numeroDoc").value
    nacimientoStr = document.getElementById("inputNacimiento").value
    sucursal = document.getElementById("tipoSucursal").value
    plan = document.getElementById("tipoPlan").value

    var precioTotal = 0;




    switch (sucursal) {
        case "cordoba":
            sucursal = "Córdoba"
            break;
        case "caba":
            sucursal = "C.A.B.A."
            break;
        case "lomas":
            sucursal = "Lomas de Zamora"
            break;
        case "mendoza":
            sucursal = "Mendoza"
            break;
    }


    switch (plan) {
        case "plan1":
            plan = "Gimnasio libre"
            precioTotal = 40000
            break;
        case "plan2":
            plan = "Yoga"
            precioTotal = 47000
            break;
        case "plan3":
            plan = "Aero Combat"
            precioTotal = 60000
            break;
        case "plan4":
            plan = "Fit 30' libre"
            precioTotal = 37500
            break;
        case "plan5":
            plan = "Natación"
            precioTotal = 69000
            break;
    }

    switch (tipoDocu) {
        case "dni":
            tipoDocu = "DNI"
            break;
        case "pasaporte":
            tipoDocu = "Pasaporte"
            break;
    }

    let nacimiento = new Date(nacimientoStr);
    let hoy = new Date("2023-04-18")

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    if ((nacimiento.getMonth() > hoy.getMonth()) || (nacimiento.getMonth() === hoy.getMonth() && nacimiento.getDate() > hoy.getDate())) {
        edad -= 1;
    }


    document.getElementById("confirmarNyA").innerHTML = "Nombre y Apellido: " + nombre + " " + apellido;
    document.getElementById("confirmarEmail").innerHTML = "Correo Electrónico: " + email;
    document.getElementById("confirmarTipoDocu").innerHTML = tipoDocu + ": " + numeroDoc;
    document.getElementById("confirmarEdad").innerHTML = "Edad: " + edad + " años.";
    document.getElementById("confirmarSucursalYPlan").innerHTML = "Sucursal: " + sucursal + " Plan: " + plan;
    document.getElementById("precioTotal").innerHTML = "PRECIO TOTAL: $" + precioTotal;

}

paso1 = document.getElementById("paso1")
paso2 = document.getElementById("paso2")
paso3 = document.getElementById("paso3")
paso4 = document.getElementById("paso4")
paso5 = document.getElementById("paso5")
gracias = document.getElementById("gracias")

nombre = document.getElementById("inputNombre").value
apellido = document.getElementById("inputApellido").value
email = document.getElementById("inputEmail").value
tipoDocu = document.getElementById("tipoDNI").value
numeroDoc = document.getElementById("numeroDoc").value
sucursal = document.getElementById("tipoSucursal").value
plan = document.getElementById("tipoPlan").value

const soloLetras = /^[a-zA-Z]+$/;
const soloTitular = /^[a-zA-Z\s.]+$/;
const paraEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const soloNumeros = /^[0-9]+$/;
const soloNumerosOpc = /^$|^[0-9]+$/
const telefonoArg = /^11\d{8}$/;
const nombreCalle = /^[a-zA-Z0-9\s]+$/;
const numerosYLetras = /^[a-zA-Z0-9]+$/;

function mostrarPaso1() {
    paso1.style.display = "block";
    paso2.style.display = "none";
    paso3.style.display = "none";
    paso4.style.display = "none";
    paso5.style.display = "none";
    gracias.style.display = "none";
}

function mostrarPaso2() {
    paso1.style.display = "none";
    paso2.style.display = "block";
    paso3.style.display = "none";
    paso4.style.display = "none";
    paso5.style.display = "none";
    gracias.style.display = "none";
}

function checkPaso1() {
    let nombre = document.getElementById("inputNombre").value.trim();
    let apellido = document.getElementById("inputApellido").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let numeroDoc = document.getElementById("numeroDoc").value.trim();
    let tipoGenero = document.getElementById("tipoGenero").value;

    if (nombre === "") {
        document.getElementById("errorNombre").innerHTML = "*Ingrese su nombre";
        return;
    }
    errorNombre.innerHTML = "";

    if (!soloLetras.test(nombre)) {
        document.getElementById("errorNombre").innerHTML = "*Ingrese un nombre válido";
        return;
    }
    errorNombre.innerHTML = "";


    if (apellido === "") {
        document.getElementById("errorApellido").innerHTML = "*Ingrese su apellido";
        return;
    }
    errorApellido.innerHTML = "";

    if (!soloLetras.test(apellido)) {
        document.getElementById("errorApellido").innerHTML = "*Ingrese un apellido válido";
        return;
    }
    errorApellido.innerHTML = "";


    if (email === "") {
        document.getElementById("errorEmail").innerHTML = "*Ingrese su correo electrónico";
        return;
    }
    errorEmail.innerHTML = "";

    if (!paraEmail.test(email)) {
        document.getElementById("errorEmail").innerHTML = "*Ingrese un E-mail válido";
        return;
    }
    errorEmail.innerHTML = "";

    if (numeroDoc == "") {
        document.getElementById("errorDNI").innerHTML = "*Ingrese su número de documento";
        return;
    }
    errorDNI.innerHTML = "";

    if (!soloNumeros.test(numeroDoc) || numeroDoc > 999999999 || numeroDoc < 99999) {
        document.getElementById("errorDNI").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorDNI.innerHTML = "";

    if (tipoGenero === "seleccione") {
        document.getElementById("errorGenero").innerHTML = "*Ingrese su género";
        return;
    }
    errorGenero.innerHTML = "";

    mostrarPaso2();
}

function mostrarPaso3() {
    paso1.style.display = "none";
    paso2.style.display = "none";
    paso3.style.display = "block";
    paso4.style.display = "none";
    paso5.style.display = "none";
    gracias.style.display = "none";
}

function checkPaso2() {
    let plan = document.getElementById("tipoPlan").value;
    let sucursal = document.getElementById("tipoSucursal").value;

    if (sucursal === "seleccione") {
        document.getElementById("errorSucursal").innerHTML = "*Ingrese una sucursal";
        return;
    }
    errorSucursal.innerHTML = "";

    if (plan === "seleccione") {
        document.getElementById("errorPlan").innerHTML = "*Ingrese un plan";
        return;
    }
    errorPlan.innerHTML = "";


    mostrarPaso3();
}

function mostrarPaso4() {
    paso1.style.display = "none";
    paso2.style.display = "none";
    paso3.style.display = "none";
    paso4.style.display = "block";
    paso5.style.display = "none";
    gracias.style.display = "none";
}

function checkPaso3() {
    let telefono = document.getElementById("inputTelefono").value.trim();
    let nacimiento = document.getElementById("inputNacimiento").value;
    let calle = document.getElementById("inputCalle").value.trim();
    let numeroCalle = document.getElementById("inputNumero").value.trim();
    let provincia = document.getElementById("selectProvincias").value;
    let localidad = document.getElementById("selectLocalidad").value;
    let cp = document.getElementById("inputCP").value.trim();
    let piso = document.getElementById("inputPiso").value.trim();
    let depto = document.getElementById("inputDepto").value.trim();


    if (telefono === "") {
        document.getElementById("errorTelefono").innerHTML = "*Ingrese un número de teléfono";
        return;
    }
    errorTelefono.innerHTML = "";

    if (!telefonoArg.test(telefono)) {
        document.getElementById("errorTelefono").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorTelefono.innerHTML = "";

    if (nacimiento === "") {
        document.getElementById("errorNacimiento").innerHTML = "*Ingrese su fecha de nacimiento";
        return;
    }
    errorNacimiento.innerHTML = "";

    if (nacimiento > "2023-04-18") {
        document.getElementById("errorNacimiento").innerHTML = "*Ingrese una fecha válida";
        return;
    }
    errorNacimiento.innerHTML = "";

    if (calle === "") {
        document.getElementById("errorCalle").innerHTML = "*Ingrese la calle";
        return;
    }
    errorCalle.innerHTML = "";

    if (!nombreCalle.test(calle)) {
        document.getElementById("errorCalle").innerHTML = "*Ingrese una calle válida";
        return;
    }
    errorCalle.innerHTML = "";

    if (numeroCalle === "") {
        document.getElementById("errorNumeroCalle").innerHTML = "*Ingrese el n° de calle";
        return;
    }
    errorNumeroCalle.innerHTML = "";

    if (!soloNumeros.test(numeroCalle) || numeroCalle > 999999) {
        document.getElementById("errorNumeroCalle").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorNumeroCalle.innerHTML = "";

    if (piso !== "" && !soloNumeros.test(piso) || piso > 999) {
        document.getElementById("errorPiso").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorPiso.innerHTML = "";

    if (!numerosYLetras.test(depto) && depto !== "") {
        document.getElementById("errorDepto").innerHTML = "*Ingrese número o letra";
        return;
    }
    errorDepto.innerHTML = "";

    if (provincia === "--Seleccione Provincia--") {
        document.getElementById("errorProvincias").innerHTML = "*Seleccione una provincia";
        return;
    }
    errorProvincias.innerHTML = "";

    if (localidad === "--Seleccione Localidad--") {
        document.getElementById("errorLocalidad").innerHTML = "*Seleccione una localidad";
        return;
    }
    errorLocalidad.innerHTML = "";

    if (cp === "") {
        document.getElementById("errorCP").innerHTML = "*Ingrese código postal";
        return;
    }
    errorCP.innerHTML = "";

    if (!soloNumeros.test(cp)) {
        document.getElementById("errorCP").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorCP.innerHTML = "";

    mostrarPaso4();
}


function mostrarGracias() {
    paso1.style.display = "none";
    paso2.style.display = "none";
    paso3.style.display = "none";
    paso4.style.display = "none";
    paso5.style.display = "none";
    gracias.style.display = "flex";
}

function checkPaso4() {
    let tarjeta = document.getElementById("inputTarjeta").value.trim();
    let vencimiento = document.getElementById("inputVencimiento").value;
    let cvv = document.getElementById("inputCVV").value.trim();
    let titular = document.getElementById("inputTitular").value;


    if (tarjeta === "" | tarjeta.length < 16) {
        document.getElementById("errorTarjeta").innerHTML = "*Ingrese n° de tarjeta";
        return;
    }
    errorTarjeta.innerHTML = "";

    if (!soloNumeros.test(tarjeta)) {
        document.getElementById("errorTarjeta").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorTarjeta.innerHTML = "";

    if (vencimiento === "") {
        document.getElementById("errorVencimiento").innerHTML = "*Ingrese fecha de vencimiento";
        return;
    }
    errorVencimiento.innerHTML = "";

    if (vencimiento < "2023-04") {
        document.getElementById("errorVencimiento").innerHTML = "*Tarjeta vencida";
        return;
    }
    errorVencimiento.innerHTML = "";

    if (cvv === "") {
        document.getElementById("errorCVV").innerHTML = "*Ingrese CVV";
        return;
    }
    errorCVV.innerHTML = "";

    if (!soloNumeros.test(cvv) || cvv < 100) {
        document.getElementById("errorCVV").innerHTML = "*Ingrese un número válido";
        return;
    }
    errorCVV.innerHTML = "";

    if (titular === "") {
        document.getElementById("errorTitular").innerHTML = "*Ingrese nombre y apellido del titular";
        return;
    }
    errorTitular.innerHTML = "";

    if (!soloTitular.test(titular)) {
        document.getElementById("errorTitular").innerHTML = "*Ingrese un nombre y/o apellido válido";
        return;
    }
    errorTitular.innerHTML = "";

    mostrarPaso5();
}

function mostrarPaso5() {
    paso1.style.display = "none";
    paso2.style.display = "none";
    paso3.style.display = "none";
    paso4.style.display = "none";
    paso5.style.display = "block";


    confirmar()
}

