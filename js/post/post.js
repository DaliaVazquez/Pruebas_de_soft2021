class Post {
  constructor () {
    this.db = firebase.firestore();
    const settings = {timestampsInSnapshots : true}
    this.db.settings(settings)

  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection('posts')
      .add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        imagenLink: imagenLink,
        videoLink: videoLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log(`Id del post => ${refDoc.id}`)
      })
      .catch(error => {
        console.error(`Error creando el post => ${error}`)
      })
  }
  
  crearEntrada (uid, emailUser, auto, hogar, comida, otros,total) {
    
    return this.db
      .collection('entradas')
      .add({
        uid: uid,
        autor: emailUser,
        auto: parseInt(auto),
        hogar: parseInt(hogar),
        comida: parseInt(comida),
        otros: parseInt(otros),
        total: parseInt(total),
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log(`Id de la entrada => ${refDoc.id}`)
      })
      .catch(error => {
        console.error(`Error creando la entrada => ${error}`)
      })
  }

  consultarTodosPost () {
    this.db.collection('posts').onSnapshot(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts').append(this.obtenerTemplatePostVacio())
      } else {
        querySnapshot.forEach(post => {
          let postHtml = this.obtenerPostTemplate(
            post.data().autor,
            post.data().titulo,
            post.data().descripcion,
            post.data().videoLink,
            post.data().imagenLink,
            Utilidad.obtenerFecha(post.data().fecha.toDate())
          )
          $('#posts').append(postHtml)
        })
      }
    })
  }

  consultarPostxUsuario (emailUser) {
    this.db
      .collection('posts')
      .where('autor', '==', emailUser)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
          })
        }
      })
  }
  consultarDia (emailUser) {
    this.db
      .collection('posts')
      .where('autor', '==', emailUser)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
          })
        }
      })
  }

  subirImagenPost (file, uid) {}

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }


  Script() {

    $(function () {

      Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: 'Vehículo ', value: auto },
          {label: 'Comida', value: comida },
          {label: 'Hogar', value: hogar },
          {label: 'Otros', value: otros }
        ],
          colors: ['#43a047', '#66bb6a ', '#2e7d32','#81c784 '],
        formatter: function (y) { return y + "%" }
      });


      Morris.Bar({
        element: 'hero-bar',
        data: [
          {device: 'Lunes', geekbench: 536},
          {device: 'Martes', geekbench: 137},
          {device: 'Miercoles', geekbench: 1275},
          {device: 'Jueves', geekbench: 380},
          {device: 'Viernes', geekbench: 655},
          {device: 'Sabado', geekbench: 1571},
          {device: 'Domingo', geekbench: 655}
        ],
        xkey: 'device',
        ykeys: ['geekbench'],
        labels: ['KG_CO2'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        barColors: ['#388e3c']
      });

    });

};
}
