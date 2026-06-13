# Integração Front-end + Back-end — ArquiVini

## O que foi corrigido

A página `frontend/src/app/contato/page.tsx` agora envia os dados diretamente para o endpoint do Spring Boot:

```http
POST http://localhost:8080/api/contato
```

Payload enviado pelo front-end:

```json
{
  "primeiroNome": "Henrique",
  "sobrenome": "Silva",
  "email": "henrique@email.com",
  "telefone": "11999999999",
  "assuntoId": 1,
  "mensagem": "Mensagem de teste enviada pela integração."
}
```

## Conferência dos campos

| Campo no front-end | Campo no DTO do back-end | Tipo esperado | Status |
|---|---|---:|---|
| `primeiroNome` | `primeiroNome` | `String` | OK |
| `sobrenome` | `sobrenome` | `String` ou `null` | OK |
| `email` | `email` | `String` | OK |
| `telefone` | `telefone` | `String` ou `null` | OK |
| `assuntoId` | `assuntoId` | `Long` | OK |
| `mensagem` | `mensagem` | `String` | OK |

O problema principal era o assunto: antes o front usava texto, como `feedback` ou `consulta`; agora ele envia `assuntoId`, que é exatamente o campo esperado pelo back-end.

## Arquivos alterados

### Front-end

- `frontend/src/app/contato/page.tsx`
- `frontend/.env.local`
- `frontend/.env.example`

### Back-end

- `backend/src/main/java/com/arquivini/contato/controller/ContatoController.java`
- `backend/src/main/java/com/arquivini/contato/service/ContatoService.java`
- `backend/src/main/java/com/arquivini/contato/repository/AssuntoContatoRepository.java`
- `backend/src/main/java/com/arquivini/contato/dto/AssuntoContatoResponse.java`
- `backend/src/main/resources/application.properties`
- `backend/src/main/resources/application-example.properties`
- `backend/docker-compose.yml`

## Como rodar

Na raiz do projeto, execute:

```bat
rodar-projeto.bat
```

Esse arquivo inicia o banco pelo Docker, aplica `init.sql`, aplica `assuntos.sql`, sobe o back-end com Maven e sobe o front-end com Next.js.

Depois acesse:

```text
http://localhost:3000/contato
```

## Teste direto da API

Com o back-end rodando, execute no PowerShell:

```powershell
./testar-integracao.ps1
```

Resposta esperada:

```text
Mensagem salva com sucesso. ID: 1
```

## Observação sobre erro de senha do PostgreSQL

Se aparecer erro de autenticação do usuário `usuario_admin`, é provável que exista um volume antigo do Docker com outra senha. Para resetar o banco de desenvolvimento:

```bat
cd backend
docker compose down -v
docker compose up -d
```

Depois rode novamente `rodar-projeto.bat`.
