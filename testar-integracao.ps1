$payload = @{
  primeiroNome = "Henrique"
  sobrenome = "Silva"
  email = "henrique@email.com"
  telefone = "11999999999"
  assuntoId = 1
  mensagem = "Mensagem de teste enviada pela integracao entre front-end e back-end."
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/contato" `
  -Method Post `
  -ContentType "application/json" `
  -Body $payload
