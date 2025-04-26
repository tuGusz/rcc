import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RecuperarSenha.css';
import api from '../services/api';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  };


  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro('');
    setMensagem('');

    console.log('handleRecuperarSenha - Email:', email);

    if (!email) {
      setErro('Por favor, insira seu email.');
      setIsSubmitting(false);
      return;
    }

    if (!validarEmail(email)) {
      setErro('Por favor, insira um email válido.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/recuperar-senha', { email });
      console.log('handleRecuperarSenha - Resposta da API:', response);  
      setMensagem(response.data.message);
      setEtapa(2);
    } catch (error) {
      console.error('handleRecuperarSenha - Erro:', error);  
      setErro(error.response?.data?.message || 'Ocorreu um erro ao enviar o código. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro('');
    setMensagem('');

    console.log('handleVerificarCodigo - Email:', email, 'Código:', codigo); 

    if (!codigo) {
      setErro('Por favor, insira o código de recuperação.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/verificar-codigo', { email, codigo });
      console.log('handleVerificarCodigo - Resposta da API:', response); 
      setMensagem(response.data.message);
      setToken(response.data.token);
      setEtapa(3);
    } catch (error) {
      console.error('handleVerificarCodigo - Erro:', error); 
      setErro(error.response?.data?.message || 'Código inválido ou expirado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNovaSenhaSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro('');
    setMensagem('');
  
    console.log('handleNovaSenhaSubmit - Token:', token, 'Nova Senha:', novaSenha);
    console.log('Senha a ser validada:', novaSenha); 
  
    if (!novaSenha) {
      setErro('Por favor, insira a nova senha.');
      setIsSubmitting(false);
      return;
    }
  
    if (!validarSenha(novaSenha)) {
      setErro('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.');
      setIsSubmitting(false);
      return;
    }
  
    if (novaSenha !== confirmarNovaSenha) {
      setErro('As senhas não coincidem. Por favor, verifique.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await api.post('/redefinir-senha', { token, novaSenha });
      console.log('handleNovaSenhaSubmit - Resposta da API:', response);
      setMensagem(response.data.message);
  
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('handleNovaSenhaSubmit - Erro:', error);
      setErro(error.response?.data?.message || 'Ocorreu um erro ao redefinir a senha.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="recuperar-senha-container d-flex align-items-center justify-content-center">
      <Container className="recuperar-senha-wrapper">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="recuperar-senha-card">
              <div className="recuperar-senha-header text-center">
                <h1 className="mb-2">Recuperar Senha</h1>
                <p className="mb-4">
                  {etapa === 1 && 'Informe seu email para receber o código de recuperação.'}
                  {etapa === 2 && 'Informe o código de recuperação enviado para seu email.'}
                  {etapa === 3 && 'Defina sua nova senha.'}
                </p>
              </div>

              {erro && (
                <Alert variant="danger" className="animated fadeIn mb-4">
                  {erro}
                </Alert>
              )}

              {mensagem && (
                <Alert variant="success" className="animated fadeIn mb-4">
                  {mensagem}
                </Alert>
              )}

              <Form
                onSubmit={etapa === 1 ? handleRecuperarSenha : etapa === 2 ? handleVerificarCodigo : handleNovaSenhaSubmit}
                noValidate
              >
                {etapa === 1 && (
                  <Form.Group className="mb-4 form-group-animate">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                )}

                {etapa === 2 && (
                  <Form.Group className="mb-4 form-group-animate">
                    <Form.Label>Código de Recuperação</Form.Label>
                    <Form.Control
                      type="text"
                      name="codigo"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      placeholder="Digite o código"
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                )}

                {etapa === 3 && (
                  <>
                    <Form.Group className="mb-4 form-group-animate">
                      <Form.Label>Nova Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="novaSenha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        placeholder="Digite a nova senha"
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                    <Form.Group className="mb-4 form-group-animate">
                      <Form.Label>Confirmar Nova Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmarNovaSenha"
                        value={confirmarNovaSenha}
                        onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                        placeholder="Confirme a nova senha"
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 recuperar-senha-button mb-3 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {etapa === 1 ? 'Enviando...' : etapa === 2 ? 'Verificando...' : 'Redefinindo...'}
                    </>
                  ) : (
                    etapa === 1 ? 'Enviar Código' : etapa === 2 ? 'Verificar Código' : 'Redefinir Senha'
                  )}
                </Button>
                {etapa === 1 &&
                  <button
                    onClick={() => navigate('/login')}
                    className="forgot-password-link"
                    style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: '10px' }}
                  >
                    Voltar para o Login
                  </button>
                }
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecuperarSenha;
