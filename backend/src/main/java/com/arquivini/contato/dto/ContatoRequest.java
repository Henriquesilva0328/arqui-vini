package com.arquivini.contato.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ContatoRequest(

        @NotBlank(message = "O primeiro nome é obrigatório.")
        @Size(min = 2, max = 100, message = "O primeiro nome deve ter entre 2 e 100 caracteres.")
        String primeiroNome,

        @Size(max = 100, message = "O sobrenome deve ter no máximo 100 caracteres.")
        String sobrenome,

        @NotBlank(message = "O e-mail é obrigatório.")
        @Email(message = "O e-mail informado é inválido.")
        @Size(max = 150, message = "O e-mail deve ter no máximo 150 caracteres.")
        String email,

        @Size(max = 20, message = "O telefone deve ter no máximo 20 caracteres.")
        String telefone,

        @NotNull(message = "O assunto é obrigatório.")
        Long assuntoId,

        @NotBlank(message = "A mensagem é obrigatória.")
        @Size(min = 10, max = 2000, message = "A mensagem deve ter entre 10 e 2000 caracteres.")
        String mensagem
) {
}
