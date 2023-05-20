//https://lenguajejs.com/javascript/dom/insertar-elementos-dom/
//.innerHTML -> el primero renderiza e interpreta el marcado HTML. Reconoce las etiquetas en el texto pasado
//.textContent -> inserta como contenido de texto literalmente. Todo lo agregado es texto

let form = document.getElementById("form");

function addEventSubmit() {
    form.addEventListener("submit", e => {
        e.preventDefault();        
        resume();        
    });
}

addEventSubmit();


function resume() {            
    removeAlert();    //utilizado si muestro el mensaje usando el alert de bootstrap y no el modal
    //capturar valor select
    let select = document.getElementById("categorias");
    let categoria = select.options[select.selectedIndex].value;

    //capturar cantidad de entradas y calcular total sin descuento
    let cantidad = document.getElementById("cantidad").value;
    let total = 200 * cantidad;
    //calcular descuento
    let descuento=0;
    switch (categoria) {
        case "Estudiante":
            descuento = total * 0.8;
            break;
            
        case "Trainee":                
            descuento = total * 0.5;
            break;
            
        case "Junior":
            descuento = total * 0.15;
            break;
        default:
            break;
    }

    //calcular monto final
    let montoFinal = total - descuento; 
    
    //mensaje a mostrar - Incluye etiquetas html para ser usado con innerHTML
    let msg = `<strong>Total:</strong> $${total}. <strong>Descuento:</strong> $${descuento}. <strong>Monto Final a Pagar:</strong> $${montoFinal}`;
    
    //mostrando mensaje en alert
    createAlert(msg);   //utilizado si muestro el mensaje usando el alert de bootstrap y no el modal

    //mostrando mensaje en modal
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    let textModal = document.getElementById("textModal");
    textModal.innerHTML = msg;
    myModal.show();    
}


function removeAlert(){
    let message = document.getElementById("alertMessage");
    if(message!=null)
        message.remove();    
}

function createAlert(msg){
    //obtenemos el div donde se mostrara el mensaje
    let messageContainer = document.getElementById("mensaje");
    //creacion e incorporacion de elementos a la pagina
    let alertMessage = document.createElement("div");    
    alertMessage.setAttribute("id","alertMessage");
    alertMessage.className = "alert alert-info alert-dismissible fade show";
    alertMessage.setAttribute("role", "alert");            
    alertMessage.innerHTML = msg;
    messageContainer.appendChild(alertMessage);
    
    //boton necesario para cerrar el alert de bootstrap
    let buttonClose = document.createElement("button");
    buttonClose.setAttribute('type', 'button');
    buttonClose.className = "btn-close";
    buttonClose.setAttribute('data-bs-dismiss', 'alert');
    buttonClose.setAttribute('aria-label', 'close');
    alertMessage.appendChild(buttonClose);    
}

//en el reset, ademas limpia el alert de bootstrap
//utilizado si muestro el mensaje usando el alert de bootstrap y no el modal
form.addEventListener("reset", e => {    
    removeAlert();    
});
