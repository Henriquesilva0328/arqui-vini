package com.arquivini.contato.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "mensagem_contato")
public class MensagemContato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primeiro_nome", nullable = false, length = 100)
    private String primeiroNome;

    @Column(name = "sobrenome", length = 100)
    private String sobrenome;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assunto_id", nullable = false)
    private AssuntoContato assunto;

    @Column(name = "mensagem", nullable = false, columnDefinition = "TEXT")
    private String mensagem;

    @Column(name = "data_envio", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime dataEnvio;

    @Column(name = "data_atualizacao", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime dataAtualizacao;

    public MensagemContato() {
    }

    public MensagemContato(
            String primeiroNome,
            String sobrenome,
            String email,
            String telefone,
            AssuntoContato assunto,
            String mensagem
    ) {
        this.primeiroNome = primeiroNome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.assunto = assunto;
        this.mensagem = mensagem;
    }

    public Long getId() {
        return id;
    }

    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public AssuntoContato getAssunto() {
        return assunto;
    }

    public String getMensagem() {
        return mensagem;
    }

    public OffsetDateTime getDataEnvio() {
        return dataEnvio;
    }

    public OffsetDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }
}
