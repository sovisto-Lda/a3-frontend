

export default function Category_Card({ src, title }) {
    return (
        <div className="col">
            <img 
                src={src}
                className="img-fluid" 
                alt={`Imagem da categoria ${title}`}>
            </img>
            <h4>{title}</h4>
        </div>
    )
}

