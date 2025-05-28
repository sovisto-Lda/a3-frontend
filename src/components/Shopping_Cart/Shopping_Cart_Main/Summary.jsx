import DividerLine from "../Divider_Line";

export default function Summary() { 
    return (
        <div className="" style={{width: '65%'}}>
            {/* linha cabeçalho */}
            <div className="d-flex w-100" style={{backgroundColor: 'red'}}>
                <h2 className="flex-grow-1" style={{backgroundColor: 'green'}}>Sumário</h2>

            </div>

            <DividerLine />

            content

            <DividerLine />
        </div> 
    )
}