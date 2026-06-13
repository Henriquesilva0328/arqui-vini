package com.arquivini.contato.repository;

import com.arquivini.contato.model.AssuntoContato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssuntoContatoRepository extends JpaRepository<AssuntoContato, Long> {
    List<AssuntoContato> findByAtivoTrueOrderByIdAsc();
}
