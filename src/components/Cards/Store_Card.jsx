export default function StoreCard ({name, address, city}) {
    return (
        <div className="d-flex address-card px-4 py-3 w-100 shadow-sm align-items-center gap-4">
                    <input
                        className="form-check-input custom-checkbox"
                        style={{
                            width: '32px',
                            height: '32px',
                            border: '3px solid black',
                            backgroundColor: 'var(--cinzento-muito-claro)'
                        }}
                        type="checkbox"
                        id="fatura"
                        // checked={lembrarMe}
                        // onChange={() => setLembrarMe(!lembrarMe)}
                    /> 

                    <div className="col-md-8 d-flex flex-column gap-1">
                        <h3 style={{fontWeight: '600', fontSize: '20px', margin: '0px'}}>
                            Loja - A tua prima
                        </h3>

                        <p className="">
                            Rua lecca lecca, 69
                        </p>
                        
                        <p className="" style={{color: 'var(--cinzento)'}}>
                            Borra, Vale da
                        </p>

                    </div>          
            
            
        
        </div>
    )  
}