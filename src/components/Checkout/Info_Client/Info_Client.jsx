export default function InfoClient({onNext}) {
    return (
        <div className="d-flex flex-column gap-3 col-md-6 col-10">
            <h2>Dados Pessoais</h2>

            <div>
                <div className="inputGroup mb-3">
                    <label htmlFor="name">Nome</label>
                    <input
                        id='name'
                        className="form-control form-control-md inputField"
                        type="name"
                        placeholder="Nome"
                        //value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputGroup mb-4">
                    <label htmlFor="emauk">Email</label>
                    <input
                        id="email"
                        className="form-control form-control-md inputField"
                        type="email"
                        placeholder="Email"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>     

                <div className="inputGroup mb-4">
                    <label htmlFor="emauk">Telefone</label>
                    <input
                        id="phone"
                        className="form-control form-control-md inputField"
                        type="phone"
                        placeholder="Telefone"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>            
            </div>

            <div>
                <div className="form-check d-flex align-items-center gap-2">
                    <input
                        className="form-check-input custom-checkbox"
                        style={{
                            width: '32px',
                            height: '32px',
                            border: '3px solid black'
                        }}
                        type="checkbox"
                        id="fatura"
                        // checked={lembrarMe}
                        // onChange={() => setLembrarMe(!lembrarMe)}
                    />
                    <label className="form-check-label m-0" htmlFor="fatura">
                        Deseja fatura?
                    </label>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <div className={`primary-button`} onClick={onNext}><p>Continuar</p></div>
            </div>
        </div>
    )
}