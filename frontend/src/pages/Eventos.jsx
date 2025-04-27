import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { PlusCircle, Save, XCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import EventosService from '../services/EventosService'; // Importe o serviço

import 'react-datepicker/dist/react-datepicker.css';
import './Evento.css';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [novoEvento, setNovoEvento] = useState({
        nome: '',
        descricao: '',
        local: '',
        data_inicio: new Date(),
        data_fim: new Date(),
        obrigatorio: false,
        criado_por: null, // ID do usuário criador
    });
    const [editandoId, setEditandoId] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
 
  
    // Função para buscar eventos do backend
    const buscarEventos = async () => {
        setIsSubmitting(true);
        setErro('');
        try {
            const data = await EventosService.buscarEventos();
            setEventos(data);
        } catch (error) {
            setErro(error.message || 'Erro ao buscar eventos.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        buscarEventos();
         // Recuperar o ID do usuário logado (simulado)
         const usuarioLogadoId = localStorage.getItem('usuarioId');
         if (usuarioLogadoId) {
             setNovoEvento(prev => ({ ...prev, criado_por: parseInt(usuarioLogadoId, 10) }));
         }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNovoEvento({
            ...novoEvento,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

      const handleDateChange = (date, fieldName) => {
        setNovoEvento({
            ...novoEvento,
            [fieldName]: date,
        });
    };

    const handleCriarEvento = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErro('');
        setMensagem('');

        if (!novoEvento.nome || !novoEvento.descricao || !novoEvento.local || !novoEvento.data_inicio) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            setIsSubmitting(false);
            return;
        }

         if (!novoEvento.criado_por) {
            setErro('Usuário criador não autenticado.');
            setIsSubmitting(false);
            return;
        }

        try {
            const data = await EventosService.criarEvento({
                ...novoEvento,
                data_inicio: novoEvento.data_inicio.toISOString(),
                data_fim: novoEvento.data_fim.toISOString(),
            });
            setEventos([...eventos, data]);
            setMensagem('Evento criado com sucesso!');
            setNovoEvento({
                nome: '',
                descricao: '',
                local: '',
                data_inicio: new Date(),
                data_fim: new Date(),
                obrigatorio: false,
                criado_por: null,
            });
            setEditandoId(null);
            buscarEventos();
        } catch (error) {
            setErro(error.message || 'Erro ao criar evento.');
        } finally {
            setIsSubmitting(false);
        }
    };

 
    const handleSalvarEvento = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErro('');
        setMensagem('');

         if (!novoEvento.nome || !novoEvento.descricao || !novoEvento.local || !novoEvento.data_inicio) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            setIsSubmitting(false);
            return;
        }

        try {
            const data = await EventosService.atualizarEvento(editandoId, {
                ...novoEvento,
                data_inicio: novoEvento.data_inicio.toISOString(),
                data_fim: novoEvento.data_fim.toISOString(),
            });
            setEventos(eventos.map(evento => evento.id === editandoId ? data : evento));
            setMensagem('Evento atualizado com sucesso!');
            setNovoEvento({
                nome: '',
                descricao: '',
                local: '',
                data_inicio: new Date(),
                data_fim: new Date(),
                obrigatorio: false,
                criado_por: null,
            });
            setEditandoId(null);
            buscarEventos();
        } catch (error) {
            setErro(error.message || 'Erro ao atualizar evento.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelarEdicao = () => {
        setEditandoId(null);
        setNovoEvento({
            nome: '',
            descricao: '',
            local: '',
            data_inicio: new Date(),
            data_fim: new Date(),
            obrigatorio: false,
            criado_por: null,
        });
    };
 

    return (
        <div className="eventos-container d-flex align-items-center justify-content-center">
        <div className="eventos-container">
            <Container>
            
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

                <Row className="mb-4">
                    <Col>
                        <h2 className="eventos-subtitulo">
                            {editandoId ? 'Editar Evento' : 'Criar Novo Evento'}
                        </h2>
                        <Form
                            onSubmit={editandoId ? handleSalvarEvento : handleCriarEvento}
                            className="eventos-form"
                            noValidate
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={novoEvento.nome}
                                    onChange={handleInputChange}
                                    placeholder="Nome do Evento"
                                    required
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descricao"
                                    value={novoEvento.descricao}
                                    onChange={handleInputChange}
                                    placeholder="Descrição do Evento"
                                    required
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Local</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="local"
                                    value={novoEvento.local}
                                    onChange={handleInputChange}
                                    placeholder="Local do Evento"
                                    required
                                    className="form-control-lg"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Data de Início</Form.Label>
                                 <DatePicker
                                    selected={novoEvento.data_inicio}
                                    onChange={(date) => handleDateChange(date, 'data_inicio')}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control form-control-lg"
                                    placeholderText="Selecione a data de início"
                                    required
                                  />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Data de Fim</Form.Label>
                                <DatePicker
                                    selected={novoEvento.data_fim}
                                     onChange={(date) => handleDateChange(date, 'data_fim')}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control form-control-lg"
                                    placeholderText="Selecione a data de fim"
                                  />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Obrigatório</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    name="obrigatorio"
                                    checked={novoEvento.obrigatorio}
                                    onChange={handleInputChange}
                                    label="Marcar como obrigatório"
                                    className="eventos-checkbox"
                                />
                            </Form.Group>
                            {/* Removido o campo de seleção de email */}

                            <div className="eventos-botoes">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="eventos-salvar-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            {editandoId ? 'Salvando...' : 'Criando...'}
                                        </>
                                    ) : (
                                        editandoId ? <><Save className="me-2" /> Salvar</> : <><PlusCircle className="me-2" /> Criar</>
                                    )}
                                </Button>
                                {editandoId && (
                                    <Button
                                        variant="danger"
                                        type="button"
                                        className="eventos-cancelar-button"
                                        onClick={handleCancelarEdicao}
                                        disabled={isSubmitting}
                                    >
                                        <XCircle className="me-2"/> Cancelar
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        </div>
    );
};

export default Eventos;
