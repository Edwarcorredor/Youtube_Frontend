const buscador = document.querySelector("#buscador")
const btnBuscador = document.querySelector("#btn-buscador")
const title = document.querySelector("#title")
const video = document.querySelector("#video")
const logoCanal = document.querySelector("#logo-canal")
const nombreCanal = document.querySelector("#nombre-canal")
const description = document.querySelector("#description")
const contenidoComentario = document.querySelector("#contenido-comentario")
const imagenesCarrusel = document.querySelectorAll(".imagen-carrusel")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4cd947861cmsh61eea850045aef9p1ba9d4jsnbf31f6ff8223',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

const mostrarVideo = (resultado) => {

    title.innerHTML = resultado.video.title
    video.src = `https://www.youtube.com/embed/${resultado.video.videoId}`
    logoCanal.src = resultado.video.author.avatar[0].url
    nombreCanal.innerHTML = resultado.video.author.title

}

const mostrarComentarios = (resultado) => {
    let comentario =""
    resultado.comments.forEach(element => {
        comentario += `
            <h5>${element.author.title}</h5>
            <p>${element.content}</p>
        `
    });

    contenidoComentario.innerHTML = comentario
}

const buscarComentarios = async(resultado) => {
    let url = `https://youtube138.p.rapidapi.com/video/comments/?id=${resultado.video.videoId}&hl=en&gl=US`;
    try {
        let response = await fetch(url, options);
        let result = await response.json();
        mostrarComentarios(result)
    } catch (error) {
        console.error(error);
    }
}

const buscarDescripcion = async(resultado) => {
    let url = `https://youtube138.p.rapidapi.com/video/details/?id=${resultado.video.videoId}&hl=en&gl=US`;
    try {
        let response = await fetch(url, options);
        let result = await response.json();
        description.innerHTML = result.description
    } catch (error) {
        console.error(error);
    }
}

const mostrarRelacionados = (resultado) => {
    console.log(imagenesCarrusel)
    imagenesCarrusel.forEach((elemento,index) => {
        elemento.src = resultado.contents[index].video.thumbnails[1].url
        console.log(resultado.contents[index].video.thumbnails[1].url)
    })
}

const buscarRelacionados = async(resultado) => {
    let url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${resultado.video.videoId}&hl=en&gl=US`;
    try {
        let response = await fetch(url, options);
        let result = await response.json();
        mostrarRelacionados(result)
    } catch (error) {
        console.error(error);
    }
}
const buscarVideo = async() =>{
    let url = `https://youtube138.p.rapidapi.com/search/?q=${buscador.value}&hl=en&gl=US` ;
    try {
        let response = await fetch(url, options);
        let result = await response.json();
        for(let i=0; i<result.contents.length; i++) {
            if(result.contents[i].type === 'video'){
                mostrarVideo(result.contents[i])
                buscarDescripcion(result.contents[i])
                buscarComentarios(result.contents[i])
                buscarRelacionados(result.contents[i])
                break;
            }
        }

    } catch (error) {
        console.error(error);
    }
}


btnBuscador.addEventListener("click",buscarVideo)


