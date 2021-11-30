//imágenes escenarios
var biblioteca, ganaste, perdiste, inicio, instrucciones, credito, ciudad, barraDialogo, caraAguila, caraCarpincho, tablaVidas, bibliotecaAguila;
//cinematica
var cinematicaBiblioteca, cinematicaPelea, cinemticaAguila;

//sonidos
var sonido_cinematica_inicio, caidaAguila,batallaAguila, musicaPlay, caidaAguila, golpe, impacto_cuerpo, revolea_libro, musicaCiudad, sonidoCarpinchoBiblioteca, click, golpeAguila, cinematicaTension;

//estado
var estado = "inicio";
var estadoAnterior = "inicio";
var terminarLanzar = false;
var sentido = "izquierda"; //primer tucan
var sentido2 = "izquierda"; //segundo tucan
var entrarBibliotecaAguila;
var contFrames;

//dialogos
var dialogoBiblioteca1;
var dialogo1;
var dialogoCiudad;

//aguila
var aguiY;
var aguiX;
var aguilaVolando;
var aguilaVolandoIzq;

//variables carpincho
var carX, carY, tamCar, velCarX;
var carSprites = [];
var carSpritesIzquierda = [];
var carSpritesBiblioteca = [];
var carSpritesBibliotecaIzq = [];
var direccionCar = "derecha";
var frameCaminata;
var frameCaminataIzq;

//variables animales
var tucX, tucX2;
var tucY;
var pluma;
var plumaY;
var plumaX, plumaX2;
var cont = 0;
var pinguino;
var vidasP;
var vidasA;
var vidasT1;
var vidasT2;
var vidas;
var movD;
var aguilaVolandoLastimada1, aguilaVolandoLastimada2;
var aguilaCaida;

//variables libro 1 (libro que se dispara)
var libroX;
var libroY;
var libroPosActual; //sigue el rastro de donde está el libro ahora
var libroVel;
var tamLibro;
var disparado; //si estoy o no disparando

//libro ciudad y biblioteca aguila
var libroXCiu;
var libroYCiu;

//variables libro 2
var libroY2, libroX2;
//variables libro 3
var libroY3, libroX3;
//variables libro 4
var libroY4, libroX4;
//variables libro 5
var libroY5, libroX5;

//variables ciudad
var cX;
var libroYCiudad;

//variables pluma
var pluma;
var plumaY;
var plumaX, plumaX2;
var plumaPosActual;
var cayendo;


function preload() {

	//cinematicas
	cinematicaBiblioteca = loadImage("animacion-inicio.gif");
	cinematicaPelea = loadImage('escenaPelea.gif');

	//sonidos
	soundFormats('mp3', 'ogg');
	musicaCiudad = loadSound("musicaCiudad.mp3");
	golpe = loadSound('golpe_1.mp3');
	revolea_libro = loadSound('rebolea_libro.mp3');
	sonidoCarpinchoBiblioteca = loadSound('sonidoCarpinchoBiblioteca.mp3');
	click = loadSound('Click.wav');
	golpeAguila = loadSound('01_sonido_aguila.mp3');
	caidaAguila = loadSound('caidaAguila.mp3');
	cinematicaTension = loadSound('cinematicaTension.mp3');
	batallaAguila = loadSound('batallaAguila.mp3');
	sonido_cinematica_inicio = loadSound('sonido_cinematica_inicio.mp3');

	//FONDOS
	inicio = loadImage("pantalla inicial.png");
	instrucciones = loadImage("instrucciones.png");
	biblioteca = loadImage("bibliotecaCarpincho.png"); //biblioteca
	ciudad = loadImage("ciudad.png");
	bibliotecaAguila = loadImage("bibliotecaAguila.png");
	creditos = loadImage("creditos.png");
	ganaste = loadImage("ganaste.png");
	perdiste = loadImage("perdiste.png");

	//elementos
	libroimg = loadImage("libro.png");
	caraAguila = loadImage("caraAguila.png");
	caraCarpincho = loadImage("caraCarpincho.png");
	tablaVidas = loadImage("tablaVidas.png");
	pluma = loadImage("pluma.png");

	//dialogos
	dialogoBiblioteca1 = loadImage("dialogoBiblioteca1.png");
	dialogoPing = loadImage("dialogoPinguino.png");
	dialogoCiudad = loadImage("dialogoCiudad.png");

	//personajes
	tucan3vidas = loadImage("tucan3vidas.png");
	tucan3vidasDer = loadImage("tucan3vidasDer.png");
	tucan2vidas = loadImage("tucan2vidas.png");
	tucan1vida = loadImage("tucan1vida.png");
	tucan2vidasDer = loadImage("tucan2vidasDer.png");
	tucan1vidaDer = loadImage("tucan1vidaDer.png");
	tucanConLibro = loadImage("tucanConLibro.png");

	pinguino = loadImage("pinguino.png");
	pinguinoAlas = loadImage("pinguinoAlas.png");
	pinguinoAlasDerecha = loadImage("pinguinoAlasDerecha.png");

	aguilaVolando = loadImage("aguilaVolando.png");
	aguilaVolandoIzq = loadImage("aguilaVolandoIzq.png");
	aguilaVolandoLastimada1 = loadImage("aguilaVolandoLastimada1.png");
	aguilaVolandoLastimada2 = loadImage("aguilaVolandoLastimada2.png");
	aguilaVolandoLastimada1Izq = loadImage("aguilaVolandoLastimada1Izq.png");
	aguilaVolandoLastimada2Izq = loadImage("aguilaVolandoLastimada2Izq.png");
	aguilaCaida = loadImage("aguilaCaida.png");

	pinguinoConLibro = loadImage("pinguinoConLibro.png");
	pinguino3vidas = loadImage("pinguino3vidas.png");
	pinguino2vidas = loadImage("pinguino2vidas.png");
	pinguino1vida = loadImage("pinguino1vida.png");
	pinguino3vidasDer = loadImage("pinguino3vidasDer.png");
	pinguino2vidasDer = loadImage("pinguino2vidasDer.png");
	pinguino1vidaDer = loadImage("pinguino1vidaDer.png");



	//contadores
	cont = 0;
	contFrames = 0;
	//carpincho en la ciudad
	//faltan agregar los demas
	for (let i = 0; i < 10; i++) {
		carSprites[i] = loadImage("car" + i + ".png");
		carSpritesIzquierda[i] = loadImage("car" + i + "Izq.png");
		carSpritesBiblioteca[i] = loadImage("carB" + i + ".png");
		carSpritesBibliotecaIzq[i] = loadImage("carB" + i + "Izq.png");
	}





}


function setup() {
	createCanvas(1000, 700);
	background(255);
	inicializarVariables();
}

function imprimir() {
	print("mouseX: " + mouseX);
	print("mouseY: " + mouseY);
	print(estado);
}

function inicializarVariables() {

	//carpincho
	tamCar = width / 3.5;
	carX = width - 600;
	carY = height - 170;
	velCarX = 5;

	//libro
	libroX = carX + 100;
	libroY = carY - 50;
	libroPosActual = 0; //sigue el rastro de donde está el libro ahora
	libroVel = 15;
	tamLibro = width / 15;
	disparado = false;

	//libro para ciudad y biblioteca
	libroXCiu = carX + 68;
	libroYCiu = carY + 60;


	//PLUMA
	plumaX = tucX;
	plumaX2 = tucX2;
	plumaY = tucY + 10;
	plumaVel = 5;
	plumaXA = aguiX;
	plumaYA = aguiY;

	//ciudad movimiento
	cX = 0;

	//contador de vidas
	vidas = 3;
	vidasA = 3;
	vidasT1 = 3;
	vidasT2 = 3;

	//variable animales
	tucX = 1644;
	tucX2 = 2400;
	tucY = 182;
	tucTamX = 200;
	tucTamY = tucTamX - 10;
	aguiX = 800;
	aguiY = 40;
	pingX = 50;
	pingY = 100;
	pingTamX = 215;
	pingTamY = 185;

	//frames
	frameCaminata = 0;
	frameCaminataIzq = 0;

	//elementos 
	vidasP = 3;
	entrarBibliotecaAguila = false;
	dialogo1 = true;
	cinematicaAguila = false;
	musicaCiudad.pause();
	batallaAguila.pause();



}
//musica
function musica(){

	if(musicaPlay==true && estado=="animacionInicio"){
		sonido_cinematica_inicio.play();
		musicaPlay=false;
	} 
	if(musicaPlay==true && estado=="animacionPelea"){
		cinematicaTension.setVolume(0.5);
		cinematicaTension.play();
		musicaPlay=false;
		musicaCiudad.pause();
	} 
	if(musicaPlay==true && estado=="biblioteca"){
		sonidoCarpinchoBiblioteca.play();
		musicaPlay=false;
	} 
	if(musicaPlay==true && estado=="ciudad"){
		musicaCiudad.play();
		musicaPlay=false;
	} 
	if(musicaPlay==true && estado=="bibliotecaAguila" && vidasA>0){
		batallaAguila.setVolume(0.3);
		batallaAguila.play();
		musicaPlay=false;
	} 
	}
function draw() {
	imageMode(CORNER);
	//llamar funciones
	keyTyped();
	keyPressed();
	imprimir(); //ver valores en consola y ubicarlos en una sola funcion


	if (estado == "inicio") {
		background(inicio, 0, 0, width, height);
		estadoAnterior="inicio"
	}
	if (estado == "instrucciones") {
		background(instrucciones, 0, 0, width, height);
		estadoAnterior="instrucciones";
	}
	if (estado == "animacionInicio") {
		if (cinematicaBiblioteca.getCurrentFrame() < 45) {
			image(cinematicaBiblioteca, 0, 0);
			musica();
			
		} else {
			estado = "biblioteca";
			musicaPlay=true;
			musica();
		}
	}
	if (estado == "biblioteca") {
		estadoAnterior="biblioteca";
		imageMode(CORNER);
		background(biblioteca, 0, 0, width, height);
		carpinchoBiblioteca();
		escenaBiblioteca();
		libro();
	}
	if (estado == "ciudad") {
		estadoAnterior="ciudad";
		escenaCiudad();
		libroCiudad();
		carpinchoPersonaje();
		ciudadAnimales();

		//musicaCiudad.playMode(restart);
	}
	if (estado == "animacionPelea") {
		print(cinematicaPelea.getCurrentFrame());
		if (cinematicaPelea.getCurrentFrame() < 323) {
			image(cinematicaPelea, 0, 0);
			musica();
		} else {
			estado = "bibliotecaAguila";
			vidas=3;
			musicaPlay=true;
			musica();
		}
	}
	if (estado == "bibliotecaAguila") {
		estadoAnterior="bibliotecaAguila";
		bibliotecaAguilaF();
		libro();
		carpinchoPersonaje();

	}
	if (estado == "perdiste") {
		background(perdiste, 0, 0, width, height);
		inicializarVariables();
		batallaAguila.pause();
	}
	if (estado == "ganaste") {
		background(ganaste, 0, 0, width, height);
		inicializarVariables();
		batallaAguila.pause();
	}
	if (vidas <= 0) {
		estado = "perdiste";
	}
	if (vidasA == 0 && contFrames >= 100) {
		estado = "ganaste";
		
	}

}


function libroCiudad() { //----- LIBRO ---------------------------------------------------------------------------------------------
	imageMode(CENTER);
	//estados de posición del libro
	//* 0 = pos del carpincho, listo para ser disparado
	//* 1 = en movimiento después de haber sido disparado
	//* 2 = colisión con enemigos o el cielo, vuelve a 0

	//dibujar libro
	image(libroimg, libroXCiu, libroYCiu, tamLibro, tamLibro);

	//seguir el rastro y disparar el libro
	if (disparado == true && libroPosActual == 0) {
		libroPosActual = 1;
	}

	//disparar libro
	if (libroPosActual == 1) {
		libroXCiu = libroXCiu; //deja de seguir a carpincho
		libroYCiu = libroYCiu - libroVel; //se mueve para arriba

		//si pasa el borde de la ventana o se pierde
		if (libroYCiu <= 0) {
			libroPosActual = 2; //colisiona y vuelve a 0
		}

	}//cierro disparar libro
	else {
		//cuando no está disparando, el libro sigue al carpincho
		//libroX = carX + 100; lo comente porque lo puse en la funcion keyTyped asi se pone bien el libro cuando va hacia la izq
		libroYCiu = carY + 40;
	}

	//recargar libro
	if (libroPosActual == 2) {
		if (direccionCar == "derecha") {
			libroXCiu = carX + 68;
		}
		if (direccionCar == "izquierda") {
			libroXCiu = carX - 90;
		}
		libroYCiu = carY + 40;
		libroPosActual = 0; //reiniciar para poder disparar de nuevo

	}


} //cierro libro

function libro() { //----- LIBRO ---------------------------------------------------------------------------------------------
	imageMode(CENTER);
	//estados de posición del libro
	//* 0 = pos del carpincho, listo para ser disparado
	//* 1 = en movimiento después de haber sido disparado
	//* 2 = colisión con enemigos o el cielo, vuelve a 0

	//dibujar libro
	if (estado == "biblioteca") {
		image(libroimg, libroX, libroY, tamLibro, tamLibro);
	}
	if (estado == "bibliotecaAguila") {
		image(libroimg, libroX - 32, libroY + 40, tamLibro, tamLibro);
	}

	//seguir el rastro y disparar el libro
	if (disparado == true && libroPosActual == 0) {
		libroPosActual = 1;
		revolea_libro.play();
	}

	//disparar libro
	if (libroPosActual == 1) {
		libroX = libroX; //deja de seguir a carpincho
		libroY = libroY - libroVel; //se mueve para arriba

		//si pasa el borde de la ventana o se pierde
		if (libroY <= 0) {
			libroPosActual = 2; //colisiona y vuelve a 0
		}

	}//cierro disparar libro
	else {
		//cuando no está disparando, el libro sigue al carpincho
		//libroX = carX + 100; lo comente porque lo puse en la funcion keyTyped asi se pone bien el libro cuando va hacia la izq
		libroY = carY - 50;
	}

	//recargar libro
	if (libroPosActual == 2) {
		if (estado == "biblioteca") {
			libroX = carX + 100;
			libroY = carY - 50;
		}
		if (estado == "bibliotecaAguila") {
			libroX = carX + 68;
			libroY = carY + 40;
		}


		libroPosActual = 0; //reiniciar para poder disparar de nuevo
	}


} //cierro libro

function bibliotecaAguilaF() { //----- BIBLIOTECA ÁGUILA ---------------------------------------------------------------------
	background(bibliotecaAguila, 0, 0, width, height);

	image(tablaVidas, 34, 30, 293, 61); //tabla carpincho
	if (vidas == 3) {
		image(caraCarpincho, 85, 40); //primer vida carp
		image(caraCarpincho, 150, 40); //segunda vida carp
		image(caraCarpincho, 215, 40); //tercera vida carp
	}
	if (vidas == 2) {
		image(caraCarpincho, 85, 40); //primer vida carp
		image(caraCarpincho, 150, 40); //segunda vida carp
	}
	if (vidas == 1) {
		image(caraCarpincho, 85, 40); //primer vida carp
	}
	image(tablaVidas, 674, 30, 293, 61); //tabla aguila
	if (vidasA == 3) {
		image(caraAguila, 727, 34, 47, 44); //primer vida a aguila
		image(caraAguila, 793, 34, 47, 44); //segunda vida a aguila
		image(caraAguila, 860, 34, 47, 44); //tercera vida a aguila
	}
	if (vidasA == 2) {
		image(caraAguila, 727, 34, 47, 44); //primer vida a aguila
		image(caraAguila, 793, 34, 47, 44); //segunda vida a aguila
	}
	if (vidasA == 1) {
		image(caraAguila, 727, 34, 47, 44); //primer vida a aguila
	}
	//colision libro y aguila
	if (vidasA == 3 || vidasA == 2 || vidasA == 1) {
		plumaCae();
		if (libroX >= aguiX - 340 / 2 && libroX <= aguiX + 340 / 2 && libroY >= aguiY - 382 / 2 && libroY <= aguiY + 382 / 2) {
			vidasA--;
			libroPosActual = 2; //envio el libro devuelta al carpincho
			golpeAguila.play();
		}
	}
	//aguila volando despues de la cinematica
	if (aguiX >= 160 / 2 && sentido == "izquierda") {
		if (vidasA == 3) {
			image(aguilaVolando, aguiX, aguiY, 340, 382);
		}
		if (vidasA == 2) {
			image(aguilaVolandoLastimada1Izq, aguiX, aguiY + 10, 247, 247);
		}
		if (vidasA == 1) {
			image(aguilaVolandoLastimada2Izq, aguiX, aguiY + 10, 247, 247);
		}

		aguiX = aguiX - 5;
		plumaXA = plumaXA - 5;
		sentido = "izquierda";
	} else {
		sentido = "derecha";
	}
	if (sentido == "derecha" && aguiX <= 800) {
		if (vidasA == 3) {
			image(aguilaVolandoIzq, aguiX, aguiY, 340, 382);
		}
		if (vidasA == 2) {
			image(aguilaVolandoLastimada1, aguiX, aguiY + 10, 247, 247);
		}
		if (vidasA == 1) {
			image(aguilaVolandoLastimada2, aguiX, aguiY + 10, 247, 247);
		}
		aguiX = aguiX + 5;
		plumaXA = plumaXA + 5;
	} else {
		sentido = "izquierda";
	}
	print(estado);
	//aguila caida cuando muere
	if (vidasA == 0) {
		contFrames++; //contador de frames para que la escena dure unos segundos
		if (contFrames <= 100) {
			image(aguilaCaida, 273, 212);
		}
	}

}



//funcion personaje carpincho
function carpinchoPersonaje() {
	imageMode(CENTER);
	if (movD >= 11) {
		movD = 0;
	}
	if (estado == "ciudad") {
		if (direccionCar == "derecha") {
			image(carSprites[frameCaminata], carX, 582, 267, 267);
		}
		if (direccionCar == "izquierda") {
			image(carSpritesIzquierda[frameCaminataIzq], carX, 582, 267, 267);
		}
	}
	if (estado == "bibliotecaAguila") {
		if (direccionCar == "derecha") {
			image(carSprites[frameCaminata], carX, 582, 267, 267);
		}
		if (direccionCar == "izquierda") {
			image(carSpritesIzquierda[frameCaminataIzq], carX, 582, 267, 267);
		}


	}
	keyTyped();
}

//funcion personaje carpincho biblioteca
function carpinchoBiblioteca() { //----- CARPINCHO BIBLIOTECA -------------------------------------------------------------------------------------
	imageMode(CENTER);
	if (direccionCar == "derecha") {
		image(carSpritesBiblioteca[frameCaminata], carX, carY, tamCar, tamCar);
	}
	if (direccionCar == "izquierda") {
		image(carSpritesBibliotecaIzq[frameCaminataIzq], carX, carY, tamCar, tamCar);
	}
}


//funcion primer escena biblioteca
function escenaBiblioteca() { //----- ESCENA BIBLIOTECA ----------------------------------------------------------------------------------------

	if (dialogo1 == true) {
		image(dialogoBiblioteca1, 298, 604);
		//sonidoCarpinchoBiblioteca.play();
	}
	//PINGÜINO
	//cambio de estado del pingüino

	//Cuando tiene 3 vidas -------------------------
	if (vidasP == 3) {
		if (pingX >= 50 && sentido == "izquierda") {
			image(pinguino3vidas, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && pingX <= 600) {
			image(pinguino3vidasDer, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX + 5;
		} else {
			sentido = "izquierda";
		}
	} //cierro 3 vidas

	//Cuando tiene 2 vidas ---------------
	if (vidasP == 2) {
		if (pingX >= 50 && sentido == "izquierda") {
			image(pinguino2vidas, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && pingX <= 600) {
			image(pinguino2vidasDer, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX + 5;
		} else {
			sentido = "izquierda";
		}
	} //cierro 2 vidas

	//Cuando tiene 1 vida --------------
	if (vidasP == 1) {
		if (pingX >= 50 && sentido == "izquierda") {
			image(pinguino1vida, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && pingX <= 600) {
			image(pinguino1vidaDer, pingX, pingY, pingTamX, pingTamY);
			pingX = pingX + 5;
		} else {
			sentido = "izquierda";
		}
	} //cierro 1 vida

	//Cuando ya no tiene vidas --------------
	if (vidasP == 0) {
		image(pinguinoConLibro, 130, 320, 190, 225);
		image(dialogoPing, 298, 604);
	}
	//colisión entre libro y pingüino
	if (libroX >= pingX - pingTamX / 2 && libroX <= pingX + pingTamX / 2 && libroY >= pingY - pingTamY / 2 && libroY <= pingY + pingTamY / 2) {
		vidasP--;
		libroPosActual = 2; //envio el libro devuelta al carpincho
		golpeAguila.play();
	}



	//sale carpincho a la ciudad si el pingüino no tiene mas vidas
	if (estado == "biblioteca" && vidasP <= 0 && carX >= width) {
		estado = "ciudad";
		musicaPlay=true;
		musica();
		carX = width - 600;
	}

}


function plumaCae() { //----- CAIDA PLUMA ---------------------------------------------------------------------------------------------
	//dibujar pluma
	if (estado == "ciudad") {
		image(pluma, plumaX, plumaY, 57, 54);
		image(pluma, plumaX2, plumaY, 57, 54);
	}
	if (estado == "bibliotecaAguila") {
		image(pluma, plumaX + 100, plumaY + 150, 57, 54);
	}


	cont = cont + 1; //contador tipo framecount
	if (estado == "ciudad") {
		if (cont >= 300) {
			cayendo = true; //si llega a 300, se dispara las plumas
			plumaPosActual = 0;
		}
	}
	if (estado == "bibliotecaAguila") { //dos if para que cambie la velocidad de la caida ya que en la biblitoeca es un solo animal el que tira, asi es mas dinamico
		if (cont >= 70) {
			cayendo = true; //si llega a 100, se dispara las plumas
			plumaPosActual = 0;
		}
	}

	if (cayendo == true && plumaPosActual == 0) {
		plumaPosActual = 1;
	}

	if (plumaPosActual == 1) {
		plumaX = plumaX;
		plumaX2 = plumaX2;
		plumaY = plumaY + plumaVel;

		//COLISIONES PLUMAS Y CARPINCHO --------------------------------------------
		if ((plumaX >= carX - tamCar / 3 && plumaX <= carX + tamCar / 3 && plumaY >= carY - tamCar / 3 && plumaY <= carY + tamCar / 3) || (plumaX2 >= carX - tamCar / 3 && plumaX2 <= carX + tamCar / 3 && plumaY >= carY - tamCar / 3 && plumaY <= carY + tamCar / 3)) {
			vidas = vidas - 1;
			plumaPosActual = 2; //envio la pluma devuelta al tucán
			golpe.play();
		}

		if (plumaY >= 670) { //si llega al piso, se reinicia
			plumaPosActual = 2;
			cont = 0;
		}
	}
	else { //si no, sigue a los tucanes
		if (estado == "ciudad") {
			plumaX = tucX;
			plumaX2 = tucX2;
			plumaY = tucY + 20;
		}
		if (estado == "bibliotecaAguila") {
			plumaX = aguiX;
			plumaY = aguiY;
		}

	}

	if (plumaPosActual == 2) {

		if (estado == "ciudad") {
			plumaX = tucX;
			plumaX2 = tucX2;
			plumaY = tucY + 10;
		}
		if (estado == "bibliotecaAguila") {
			plumaX = aguiX;
			plumaY = aguiY;
		}
	}



}

function escenaCiudad() { //----- CIUDAD ---------------------------------------------------------------------------------------------

	//-----------------------------------------------
	//ELEMENTOS
	image(ciudad, cX, 0, 5705, height);
	//image(barraDialogo, 20, 834, 785, 176);
	image(tablaVidas, 34, 30, 293, 61); //tabla carpincho
	if (vidas == 3) {
		image(caraCarpincho, 85, 40); //primer vida carp
		image(caraCarpincho, 150, 40); //segunda vida carp
		image(caraCarpincho, 215, 40); //tercera vida carp
	}
	if (vidas == 2) {
		image(caraCarpincho, 85, 40); //primer vida carp
		image(caraCarpincho, 150, 40); //segunda vida carp
	}
	if (vidas == 1) {
		image(caraCarpincho, 85, 40); //primer vida carp
	}

}

//funcion segunda escena paseo por la ciudad vs animales
function ciudadAnimales() { //----- ANIMALES EN CIUDAD -------------------------------------------------------------------------------------------

	//TUCAN 1 -------------------------------------------------------
	//Cuando Tucán1 tiene 2 vidas
	if (vidasT1 == 3) {
		if (tucX >= tucTamY / 2 && sentido == "izquierda") {
			image(tucan3vidas, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && tucX <= 900) {
			image(tucan3vidasDer, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX + 5;
		} else {
			sentido = "izquierda";
		}
	}
	//Cuando Tucán1 tiene 2 vidas
	if (vidasT1 == 2) {
		if (tucX >= tucTamY / 2 && sentido == "izquierda") {
			image(tucan2vidas, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && tucX <= 900) {
			image(tucan2vidasDer, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX + 5;
		} else {
			sentido = "izquierda";
		}
	}
	//Cuando Tucán1 tiene 1 vida
	if (vidasT1 == 1) {
		if (tucX >= tucTamY / 2 && sentido == "izquierda") {
			image(tucan1vida, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX - 5;
			sentido = "izquierda";
		} else {
			sentido = "derecha";
		}
		if (sentido == "derecha" && tucX <= 900) {
			image(tucan1vidaDer, tucX, tucY, tucTamX, tucTamY);
			tucX = tucX + 5;
		} else {
			sentido = "izquierda";
		}
	}
	//Cuando Tucán1 ya no tiene vidas
	if (vidasT1 == 0) {
		image(tucanConLibro, tucX, 320, tucTamX, tucTamY);
	}


	//TUCAN 2 --------------------------------------------------------------
	//Cuando Tucán2 tiene 3 vidas
	if (vidasT2 == 3) {
		if (tucX2 >= tucTamY / 2 && sentido2 == "izquierda") {
			image(tucan3vidas, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 - 5;
			sentido2 = "izquierda";
		} else {
			sentido2 = "derecha";
		}
		if (sentido2 == "derecha" && tucX2 <= 900) {
			image(tucan3vidasDer, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 + 5;
		} else {
			sentido2 = "izquierda";
		}
	}
	//Cuando Tucán2 tiene 2 vidas
	if (vidasT2 == 2) {
		if (tucX2 >= tucTamY / 2 && sentido2 == "izquierda") {
			image(tucan2vidas, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 - 5;
			sentido2 = "izquierda";
		} else {
			sentido2 = "derecha";
		}
		if (sentido2 == "derecha" && tucX2 <= 900) {
			image(tucan2vidasDer, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 + 5;
		} else {
			sentido2 = "izquierda";
		}
	}
	//Cuando Tucán2 tiene 1 vida
	if (vidasT2 == 1) {
		if (tucX2 >= tucTamY / 2 && sentido2 == "izquierda") {
			image(tucan1vida, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 - 5;
			sentido2 = "izquierda";
		} else {
			sentido2 = "derecha";
		}
		if (sentido2 == "derecha" && tucX2 <= 900) {
			image(tucan1vidaDer, tucX2, tucY, tucTamX, tucTamY);
			tucX2 = tucX2 + 5;
		} else {
			sentido2 = "izquierda";
		}
	}
	//Cuando Tucán2 ya no tiene vidas
	if (vidasT2 == 0) {
		image(tucanConLibro, tucX2, 320, tucTamX, tucTamY);
	}

	//---------------------------------
	//Cuando los dos tucanes no tienen vidas
	if (vidasT1 == 0 && vidasT2 == 0) {
		image(dialogoCiudad, 298, 604);
		if (cX <= -3960) {
			estado = "animacionPelea";
			musicaPlay=true;
		}
	}

	//colisión entre libro y tucanes
	if (vidasT1 == 3 || vidasT1 == 2 || vidasT1 == 1) {
		plumaCae();
		if (libroXCiu >= tucX - 160 / 2 && libroXCiu <= tucX + 160 / 2 && libroYCiu >= tucY - 149 / 2 && libroYCiu <= tucY + 149 / 2) {
			vidasT1--;
			libroPosActual = 2; //envio el libro devuelta al carpincho
			golpeAguila.play();
		}
	}
	if (vidasT2 == 3 || vidasT2 == 2 || vidasT2 == 1) {
		plumaCae();
		if (libroXCiu >= tucX2 - 160 / 2 && libroXCiu <= tucX2 + 160 / 2 && libroYCiu >= tucY - 149 / 2 && libroYCiu <= tucY + 149 / 2) {
			vidasT2--;
			libroPosActual = 2; //envio el libro devuelta al carpincho
			golpeAguila.play();
		}
	}

}

function mouseClicked() {
	cambiarEscena();
	if (estado == "inicio" || estado == "instrucciones" || estado == "ganaste" || estado == "perdiste") {
		click.play();
	}
}

function cambiarEscena() { //----- CAMBIAR ESCENA CON BOTONES -------------------------------------------------------------------------------------

	if (estado == "inicio") {
		if (botones(370, 613, 350, 470)) {
			estado = "animacionInicio";
			musicaPlay=true;
		}
		if (botones(40, 100, 44, 98)) {
			estado = "instrucciones";
		}
	}
	if (estado == "instrucciones") {
		if (botones(46, 96, 42, 90)) {
			estado = "inicio"
		}
	}

	if (estado == "perdiste") {
		if (botones(50, 100, 40, 90)) {
			estado = "inicio";
		}
		if (botones(470,530, 604,649)) {
			estado = estadoAnterior;
		}
	}
	if (estado == "ganaste") {
		if (botones(50, 100, 40, 90)) {
			estado = "inicio";
		}
	}
}//cerrar cambiar escena

//funcion controlar botones pantalla
function botones(px1, px2, py1, py2) { //FUNCION PARA VERIFICAR SI SE CLICKEO EN LA ZONA DEL BOTÓN
	if (mouseX >= px1 && mouseX <= px2 && mouseY >= py1 && mouseY <= py2) {
		return true;
	}
	return false;
}


function keyTyped() {


	if (estado == "ciudad") {

		if (cX > -3960) { //bordes de la pantalla
			if (keyDown('d')) {
				carX = carX - velCarX + 6;
				cX = cX - velCarX - 2;
				libroXCiu = carX + 68;
				direccionCar = "derecha";
				if (frameCount % 10 == 0) {
					frameCaminata = (frameCaminata + 1) % 9;
				}
			}
		}

		if (cX < -20) { //bordes de la pantalla
			if (keyDown('a')) {
				carX = carX + velCarX - 6;
				cX = cX + velCarX + 2;
				libroXCiu = carX - 80;
				direccionCar = "izquierda";
				if (frameCount % 10 == 0) {
					frameCaminataIzq = (frameCaminataIzq + 1) % 9;
				}
			}
		}
	}
	if (estado == "bibliotecaAguila") { //funcion para detectar si el jugador apreto una tecla y desaparece el dialogo

		if (keyDown('a')) {
			dialogo1 = false;
			carX = carX - velCarX;
			direccionCar = "izquierda";
			libroX = carX - 60;

			if (frameCount % 10 == 0) {
				frameCaminataIzq = (frameCaminataIzq + 1) % 9;
			}
		}

		if (keyDown('d')) {
			dialogo1 = false;
			carX = carX + velCarX;
			direccionCar = "derecha";
			libroX = carX + 100;
			if (frameCount % 10 == 0) {
				frameCaminata = (frameCaminata + 1) % 9;
			}



		}
	}

	if (estado == "biblioteca") { //funcion para detectar si el jugador apreto una tecla y desaparece el dialogo

		if (keyDown('a')) {
			dialogo1 = false;
			carX = carX - velCarX;
			direccionCar = "izquierda";
			libroX = carX - 100;

			if (frameCount % 10 == 0) {
				frameCaminataIzq = (frameCaminataIzq + 1) % 9;
			}
		}

		if (keyDown('d')) {
			dialogo1 = false;
			carX = carX + velCarX;
			direccionCar = "derecha";
			libroX = carX + 100;
			if (frameCount % 10 == 0) {
				frameCaminata = (frameCaminata + 1) % 9;
			}



		}
	}

}

function keyPressed() {
	if (keyDown(' ') && keyIsPressed) {
		disparado = true;

	} else {
		disparado = false;
	}
}
