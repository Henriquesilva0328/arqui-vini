package com.arquivini.contato.dto;

import com.arquivini.contato.model.AssuntoContato;

public record AssuntoContatoResponse(
        Long id,
        String nome,
        String descricao
) {
    public static AssuntoContatoResponse fromEntity(AssuntoContato assunto) {
        return new AssuntoContatoResponse(
                assunto.getId(),
                assunto.getNome(),
                assunto.getDescricao()
        );
    }
}
