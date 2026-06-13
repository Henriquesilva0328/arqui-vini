package com.arquivini.contato.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arquivini.contato.dto.AssuntoContatoResponse;
import com.arquivini.contato.dto.ContatoRequest;
import com.arquivini.contato.model.AssuntoContato;
import com.arquivini.contato.model.MensagemContato;
import com.arquivini.contato.repository.AssuntoContatoRepository;
import com.arquivini.contato.repository.MensagemContatoRepository;

import java.util.List;

@Service
public class ContatoService {

    private final MensagemContatoRepository mensagemContatoRepository;
    private final AssuntoContatoRepository assuntoContatoRepository;

    public ContatoService(
            MensagemContatoRepository mensagemContatoRepository,
            AssuntoContatoRepository assuntoContatoRepository
    ) {
        this.mensagemContatoRepository = mensagemContatoRepository;
        this.assuntoContatoRepository = assuntoContatoRepository;
    }

    @Transactional(readOnly = true)
    public List<AssuntoContatoResponse> listarAssuntosAtivos() {
        return assuntoContatoRepository.findByAtivoTrueOrderByIdAsc()
                .stream()
                .map(AssuntoContatoResponse::fromEntity)
                .toList();
    }

    @Transactional
    public MensagemContato salvarMensagem(ContatoRequest request) {
        Long assuntoId = request.assuntoId();

        if (assuntoId == null) {
            throw new IllegalArgumentException("O assunto é obrigatório.");
        }

        AssuntoContato assunto = assuntoContatoRepository.findById(assuntoId)
                .orElseThrow(() -> new IllegalArgumentException("Assunto informado não existe."));

        MensagemContato mensagemContato = new MensagemContato(
                limparObrigatorio(request.primeiroNome()),
                limparOpcional(request.sobrenome()),
                limparObrigatorio(request.email()),
                limparOpcional(request.telefone()),
                assunto,
                limparObrigatorio(request.mensagem())
        );

        return mensagemContatoRepository.save(mensagemContato);
    }

    private String limparObrigatorio(String valor) {
        return valor == null ? null : valor.trim();
    }

    private String limparOpcional(String valor) {
        if (valor == null) {
            return null;
        }

        String valorLimpo = valor.trim();
        return valorLimpo.isEmpty() ? null : valorLimpo;
    }
}
