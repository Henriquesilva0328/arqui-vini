INSERT INTO assunto_formulario (nome, descricao)
VALUES
    ('Feedback', 'Sugestoes, elogios ou comentarios enviados pelo usuario'),
    ('Consulta geral', 'Duvidas gerais sobre servicos, informacoes ou atendimento'),
    ('Plataforma', 'Assuntos relacionados ao funcionamento da plataforma ou site'),
    ('Pessoal', 'Mensagens de carater pessoal')
ON CONFLICT (nome) DO NOTHING;
