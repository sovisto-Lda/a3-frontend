

export default function Category_Card({ src, title }) {
    return (
        <div className="col">
            <img 
                src={src}
                className="img-thumbnail" 
                alt={'Imagem da categoria ${title}'}>
            </img>
            <h6>Categoria Linda</h6>
        </div>
    )
}

