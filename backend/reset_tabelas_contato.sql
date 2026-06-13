DROP TABLE IF EXISTS mensagem_contato CASCADE;
DROP TABLE IF EXISTS assunto_formulario CASCADE;
DROP FUNCTION IF EXISTS atualizar_data_atualizacao CASCADE;

CREATE TABLE assunto_formulario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE mensagem_contato (
    id BIGSERIAL PRIMARY KEY,
    primeiro_nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    assunto_id BIGINT NOT NULL,
    mensagem TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    ip_origem INET,
    data_envio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_mensagem_contato_assunto
        FOREIGN KEY (assunto_id)
        REFERENCES assunto_formulario(id)
);

CREATE INDEX idx_mensagem_status_data
    ON mensagem_contato (status, data_envio DESC);

CREATE INDEX idx_mensagem_email_data
    ON mensagem_contato (email, data_envio DESC);

CREATE OR REPLACE FUNCTION atualizar_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_data_atualizacao
BEFORE UPDATE ON mensagem_contato
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_atualizacao();

INSERT INTO assunto_formulario (nome, descricao)
VALUES
    ('Feedback', 'Sugestoes, elogios ou comentarios enviados pelo usuario'),
    ('Consulta geral', 'Duvidas gerais sobre servicos, informacoes ou atendimento'),
    ('Plataforma', 'Assuntos relacionados ao funcionamento da plataforma ou site'),
    ('Pessoal', 'Mensagens de carater pessoal')
ON CONFLICT (nome) DO NOTHING;
