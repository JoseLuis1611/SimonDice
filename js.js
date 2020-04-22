const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

const ULTIMO_NIVEL = 10



class Juego {
  constructor() { //ya esta
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel.bind(this),500)
  }

  toggleBtnEmpezar(){ //ya esta
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  inicializar(){ //ya esta
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  generarSecuencia(){ //ya esta
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }


  transformarNumeroAColor(numero){ //ya esta
    switch(numero){
      case 0: return 'celeste'
      case 1: return 'violeta'
      case 2: return 'naranja'
      case 3: return 'verde'
    }

  }

  transformarColorANumero(color){ //ya esta
    switch(color){
      case 'celeste': return 0
      case 'violeta': return 1
      case 'naranja': return 2
      case 'verde'  : return 3
    }

  }

  apagarColor(color){ //YA ESTA
    this.colores[color].classList.remove('light')
  }

  iluminarColor(color){ //YA ESTA
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  iluminarSecuencia(){ //ya esta
    for(let i=0; i<this.nivel; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)

    }
  }

  agregarEventosClick(){ //YA ESTA
    this.colores.celeste.addEventListener('click',this.elegirColor) //(nombre-del-evento, funcion-a-ejecutar)
    this.colores.verde.addEventListener('click',this.elegirColor) //tenemos que enlazar a this porque al llamar la funcion
    this.colores.violeta.addEventListener('click',this.elegirColor) //elegirColor se pierde la referencia de this
    this.colores.naranja.addEventListener('click',this.elegirColor)
  }

  eliminarEventosClick(){ //YA ESTA ---SOSPECHOSO
    this.colores.celeste.removeEventListener('click',this.elegirColor)
    this.colores.verde.removeEventListener('click',this.elegirColor)
    this.colores.violeta.removeEventListener('click',this.elegirColor)
    this.colores.naranja.removeEventListener('click',this.elegirColor)

  }

  siguienteNivel(){ // ya esta
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  ganoElJuego(){ //YA ESTA
    swal('Ganaste!','Felicitaciones, ganaste el juego','success')
      .then(this.inicializar)
  }

  mensaje(){
    let mensaje = ''
    for(let i=0;i<this.nivel;i++){
      const a = this.transformarNumeroAColor(this.secuencia[i])
      mensaje = mensaje + a + ' '
    }

    return 'La secuencia es: ' + mensaje
  }

  perdioElJuego(){ //YA ESTA
    swal('Perdiste!',this.mensaje(),'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

  elegirColor(ev){ //YA ESTA
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1) ){
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel.bind(this),1500)
        }

      }
    }else{
      this.perdioElJuego()
    }
  }


}


function empezarJuego(){
  window.juego = new Juego()
}
