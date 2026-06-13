package com.arquivini.contato.controller;

import com.arquivini.contato.dto.AssuntoContatoResponse;
import com.arquivini.contato.dto.ContatoRequest;
import com.arquivini.contato.model.MensagemContato;
import com.arquivini.contato.service.ContatoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contato")
@CrossOrigin(origins = "*")
public class ContatoController {

    private final ContatoService contatoService;

    public ContatoController(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    @GetMapping("/assuntos")
    public ResponseEntity<List<AssuntoContatoResponse>> listarAssuntos() {
        return ResponseEntity.ok(contatoService.listarAssuntosAtivos());
    }

    @PostMapping
    public ResponseEntity<String> enviarMensagem(@Valid @RequestBody ContatoRequest request) {
        MensagemContato mensagemSalva = contatoService.salvarMensagem(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Mensagem salva com sucesso. ID: " + mensagemSalva.getId());
    }
}
