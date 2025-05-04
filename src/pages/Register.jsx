import voltar from '../assets/images/voltar.svg';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/A3Logo.png';
import { useState } from 'react';  // Importando useState para lidar com o estado dos campos

export default function Register() {
    const navigate = useNavigate();

    // Estado para armazenar os dados do formulário
    const [name, setName] = useState('');  // Novo estado para o nome
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [errorMessage, setErrorMessage] = useState(''); // Estado para erro de registo

    // Função para capturar a submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Validação dos campos de nome, email e senha
        if (!name || !email || !password || !telefone) {
            setErrorMessage('Por favor, preencha todos os campos!');
            return;
        }

        setIsLoading(true); // Inicia o carregamento

        // Enviar dados para o servidor via POST
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    telefone,
                    tipo: "user"
                })
            });

            const data = await response.json();

            setIsLoading(false); // Finaliza o carregamento

            if (response.ok) {
                // Lógica após registo bem-sucedido
                console.log('Registo bem-sucedido:', data);
                navigate('/login'); // Navegar para a página de login após o registo
            } else {
                // Lógica para erro de registro
                console.error('Erro ao registar:', data);
                setErrorMessage(data.message || 'Erro ao registar');
            }
        } catch (error) {
            setIsLoading(false); // Finaliza o carregamento
            console.error('Erro na requisição:', error);
            setErrorMessage('Erro na conexão com o servidor');
        }
    };

    return (
        <section className="login-register">
            {/* Top Bar */}
            <div className='row mb-3 align-items-center'>
                <div className='col'>
                    <a href="/">
                        <img src={logo} alt="a3 logo horizontal" className='logo' />
                    </a>
                </div>
                <div className="col-auto">
                    <button className='primary-button' onClick={()=> {navigate('/login')}}>
                        Login
                    </button>
                </div>
            </div>

            {/* Back Button */}
            <div className='row mb-3'>
                <div className="col">
                    <button className="icon-button" onClick={() => navigate('/')}>
                        <img src={voltar} alt="Seta para trás" />
                        Voltar
                    </button>
                </div>
            </div>

            {/* Register Card */}
            <div className="row">
                <div className="col-lg-7 col-md-9 col-sm-10 mx-auto">
                    <div className="card text-center p-2">
                        <div className="card-body">
                            <h2 className="card-title mb-3">Criar Conta</h2>
                            <p className="h5 mb-4">Registe-se para começar a comprar!</p>

                            {/* Exibindo mensagem de erro */}
                            {errorMessage && (
                                <div className="alert alert-danger mb-4">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Name Field */}
                            <div className="inputGroup mb-3">
                            <label htmlFor="name">Nome</label>
                                <input
                                    id='name'
                                    className="form-control form-control-md inputField"
                                    type="text"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="inputGroup mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    id='email'
                                    className="form-control form-control-md inputField"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="inputGroup mb-3">
                                <label htmlFor="telefone">Nº Telefone</label>
                                <input
                                id='senha'
                                    className="form-control form-control-md inputField"
                                    type="tel"
                                    placeholder="Telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="inputGroup mb-4">
                                <label htmlFor="senha">Palavra-Passe</label>
                                <input
                                id='senha'
                                    className="form-control form-control-md inputField"
                                    type="password"
                                    placeholder="Palavra-Passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Register Button */}
                            <div className="d-grid mb-4">
                                <button className="primary-button" onClick={handleSubmit} disabled={isLoading}>
                                    {isLoading ? 'Carregando...' : 'Registar'}
                                </button>
                            </div>
                            
                            <div className="d-grid">
                                <p>Já tem uma conta? <a href="/login">Faça login aqui</a></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}