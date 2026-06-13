CREATE TABLE IF NOT EXISTS assunto_formulario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS mensagem_contato (
    id BIGSERIAL PRIMARY KEY,

    primeiro_nome VARCHAR(100) NOT NULL
        CHECK (char_length(trim(primeiro_nome)) BETWEEN 2 AND 100),

    sobrenome VARCHAR(100)
        CHECK (
            sobrenome IS NULL
            OR char_length(trim(sobrenome)) BETWEEN 2 AND 100
        ),

    email VARCHAR(150) NOT NULL
        CHECK (
            char_length(trim(email)) BETWEEN 5 AND 150
            AND email ~* '^[^@[:space:]]+@[^@[:space:]]+[.][^@[:space:]]+$'
        ),

    telefone VARCHAR(20)
        CHECK (
            telefone IS NULL
            OR char_length(trim(telefone)) BETWEEN 7 AND 20
        ),

    assunto_id BIGINT NOT NULL,

    mensagem TEXT NOT NULL
        CHECK (char_length(trim(mensagem)) BETWEEN 10 AND 2000),

    status VARCHAR(20) NOT NULL DEFAULT 'pendente'
        CHECK (status IN ('pendente', 'lido', 'respondido', 'arquivado')),

    ip_origem INET,

    data_envio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_mensagem_contato_assunto
        FOREIGN KEY (assunto_id)
        REFERENCES assunto_formulario(id)
);

CREATE INDEX IF NOT EXISTS idx_mensagem_status_data
    ON mensagem_contato (status, data_envio DESC);

CREATE INDEX IF NOT EXISTS idx_mensagem_email_data
    ON mensagem_contato (email, data_envio DESC);

CREATE OR REPLACE FUNCTION atualizar_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW IS DISTINCT FROM OLD THEN
        NEW.data_atualizacao = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_atualizar_data_atualizacao ON mensagem_contato;

CREATE TRIGGER trg_atualizar_data_atualizacao
BEFORE UPDATE ON mensagem_contato
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_atualizacao();
