import voltar from '/images/voltar.svg';
import { useNavigate } from 'react-router-dom';
import logo from '/images/A3Logo.png';
import { useState } from 'react';  // Importando useState para lidar com o estado dos campos

export default function Login() {
    const navigate = useNavigate();

    // Estado para armazenar os dados do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lembrarMe, setLembrarMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [errorMessage, setErrorMessage] = useState(''); // Estado para erro de login

    // Função para capturar a submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Validação dos campos de email e senha
        if (!email || !password) {
            setErrorMessage('Por favor, preencha todos os campos!');
            return;
        }

        setIsLoading(true); // Inicia o carregamento

        // Enviar dados para o servidor via POST
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            setIsLoading(false); // Finaliza o carregamento

            if (response.ok) {
                localStorage.setItem('token', data.token);

                navigate('/account'); // Redirect to homepage
            } else {
                // Lógica para erro de login
                console.error('Erro ao fazer login:', data);
                setErrorMessage(data.message || 'Erro ao fazer login');
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
                    <button className='primary-button' onClick={() => navigate('/register')}>
                        Registar
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

            {/* Login Card */}
            <div className="row">
                <div className="col-lg-7 col-md-9 col-sm-10 mx-auto">
                    <div className="card text-center p-4">
                        <div className="card-body">
                            <h2 className="card-title mb-3">Login</h2>
                            <p className="h5 mb-4">Entre na sua conta</p>

                            {/* Exibindo mensagem de erro */}
                            {errorMessage && (
                                <div className="alert alert-danger mb-4">
                                    {errorMessage}
                                </div>
                            )}
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

                            {/* Password Field */}
                            <div className="inputGroup mb-4">
                                <label htmlFor="password">Palavra-chave</label>
                                <input
                                    id="password"
                                    className="form-control form-control-md inputField"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input custom-checkbox"
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={lembrarMe}
                                        onChange={() => setLembrarMe(!lembrarMe)}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Lembrar-me
                                    </label>
                                </div>
                                <a href="#" className="text-decoration-none">
                                    Esqueceu a senha?
                                </a>
                            </div>

                            {/* Login Button */}
                            <div className="d-grid mb-4">
                                <button className="primary-button" onClick={handleSubmit} disabled={isLoading}>
                                    {isLoading ? 'Carregando...' : 'Entrar'}
                                </button>
                            </div>

                            <p>Ainda não tem conta? <a href="/register">Registe-se aqui</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}