import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);  // Estado para "Lembrar-me"
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const passwordRef = useRef(null);

  useEffect(() => {
    // Carregar as credenciais do localStorage, se existirem
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
      setRememberMe(true); // Marcar o "Lembrar-me" como true
    }

    document.querySelector('.login-container')?.classList.add('loaded');
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!credentials.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Email inválido';
    }
    if (!credentials.password) {
      errors.password = 'Senha é obrigatória';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  const checkCapsLock = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await login(credentials);
      if (success) {
        if (rememberMe) {
          // Armazenar as credenciais no localStorage se "Lembrar-me" estiver marcado
          localStorage.setItem('credentials', JSON.stringify(credentials));
        } else {
          // Limpar as credenciais do localStorage se "Lembrar-me" não estiver marcado
          localStorage.removeItem('credentials');
        }
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <Container className="login-wrapper">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="login-card">
              <div className="login-header text-center">
                <h1 className="mb-2">Bem-vindo</h1>
                <p className="mb-4">Faça login para acessar sua conta</p>
              </div>

              {error && (
                <Alert variant="danger" className="animated fadeIn mb-4">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-4 form-group-animate">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className={`form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 form-group-animate">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    onKeyUp={checkCapsLock}
                    ref={passwordRef}
                    placeholder="Digite sua senha"  
                    required
                    className={`form-control-lg ${formErrors.password ? 'is-invalid' : ''}`}
                    isInvalid={!!formErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                  {capsLockOn && (
                    <div className="capslock-warning mt-2">
                      <span>Caps Lock está ativado</span>
                    </div>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="remember-me-container">
                    <Form.Check 
                      type="checkbox"
                      id="rememberMe"
                      label="Lembrar-me"
                      checked={rememberMe} // Marca o checkbox se o "rememberMe" for true
                      onChange={(e) => setRememberMe(e.target.checked)} // Atualiza o estado do checkbox
                      className="remember-checkbox"
                    />
                  </div>
                  <button 
                    onClick={() => navigate('/recuperar-senha')}
                    className="forgot-password-link"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 login-button mb-3 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : 'Entrar'}
                </Button>

                {/* <div className="text-center register-container">
                  <span className="register-text">
                    Não tem uma conta?{' '}
                  </span>
                  <button 
                    onClick={() => navigate('/cadastro')} // Redireciona para a página de cadastro
                    className="forgot-password-link"
                  >
                    Cadastre-se
                  </button>
                </div> */}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
