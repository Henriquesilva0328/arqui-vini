package com.arquivini.contato.repository;

import com.arquivini.contato.model.MensagemContato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensagemContatoRepository extends JpaRepository<MensagemContato, Long> {
}
