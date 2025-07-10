# Sistema WB - Interface Web

Este repositório contém o frontend do Sistema WB, desenvolvido para o Grupo World Beauty (WB). O objetivo é fornecer uma interface web moderna, responsiva e eficiente para a gestão de clientes, integrando-se a um micro-serviço RESTful em Java.

---

## Visão Geral

O Sistema WB foi projetado para atender as necessidades reais do Grupo World Beauty, permitindo que colaboradores de todas as franquias possam gerenciar clientes de forma simples, segura e intuitiva. O frontend foi desenvolvido em React + TypeScript, seguindo as melhores práticas de desenvolvimento web, com foco em usabilidade, escalabilidade e integração transparente com o backend.

---

## Funcionalidades Implementadas

- **Cadastro de Clientes:**  
  Formulário completo para cadastro de clientes, incluindo nome, sobrenome, email, telefones (DDD e número) e endereço (estado, cidade, bairro, rua, número, CEP, informações adicionais).  
  Validação de campos obrigatórios e feedback visual ao usuário.

- **Listagem de Clientes:**  
  Visualização de todos os clientes cadastrados, com filtro por nome para facilitar buscas rápidas. Exibição de todos os dados relevantes do cliente.

- **Atualização de Clientes:**  
  Busca por nome, seleção do cliente e escolha do campo a ser atualizado (nome, sobrenome, email, endereço - campo individual, telefones).  
  Para telefones, é possível adicionar, editar ou excluir números.  
  Para endereço, é possível atualizar qualquer campo separadamente.

- **Exclusão de Clientes:**  
  Busca por nome, seleção e exclusão do cliente, com confirmação e feedback ao usuário.

- **Feedback ao Usuário:**  
  Todas as operações apresentam mensagens claras de sucesso ou erro, promovendo transparência e confiança no uso do sistema.

- **Interface Responsiva:**  
  Layout adaptável para desktop, tablets e celulares, com design moderno e alinhado à identidade visual do Grupo WB.

---

## Tecnologias Utilizadas

- **Frontend:**  
  - React 18+  
  - TypeScript  
  - Tailwind CSS  
  - Heroicons  
- **Backend:**  
  - Java 17+  
  - Spring Boot (micro-serviço RESTful, fornecido pela empresa)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 14+
- npm ou yarn
- Java 17+ (para o backend)

### Instalação e Execução do Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Execução do Backend

O backend está disponível como um executável Java (`wbbackend.jar`):

```bash
cd backend/executavel
java -jar wbbackend.jar
```
O backend ficará disponível em [http://localhost:32832](http://localhost:32832).

---

## Integração com o Backend

A comunicação entre frontend e backend é feita via requisições REST (JSON), utilizando os seguintes endpoints principais:

- `GET /clientes` — Listar todos os clientes
- `POST /cliente/cadastrar` — Cadastrar novo cliente
- `PUT /cliente/atualizar` — Atualizar dados de um cliente
- `DELETE /cliente/excluir` — Excluir cliente

---

## Estrutura do Projeto

```
frontend/
  src/
    componentes/
      clientes.tsx -
      VisualizarModal.tsx
      formularioCadastro.tsx -
      home.tsx -
      VisualizarCliente.tsx
      Modal.tsx -
      barraNavegacao.tsx -
      roteador.tsx -
    api/
      clientes.ts
    index.tsx
    index.css
  public/
    index.html
    manifest.json
    logo.png

backend/
  executavel/
    wbbackend.jar
  wbbackend/
    src/
      main/
        java/
          com/
            wb/
              wbbackend/
                entidades/
                controles/
                repositorios/
                atualizadores/
                verificadores/
                hateoas/
        resources/
          application.properties
```

---

## Padrões e Boas Práticas

- **Componentização:** Todos os recursos são organizados em componentes reutilizáveis.
- **Hooks do React:** Uso extensivo de `useState`, `useEffect` e outros hooks para gerenciamento de estado e efeitos colaterais.
- **Responsividade:** Layout adaptável para diferentes tamanhos de tela.
- **Feedback ao usuário:** Mensagens claras em todas as operações.
- **Código limpo e documentado:** Facilita manutenção e evolução futura.

---

## Expansão e Futuro

O sistema foi estruturado para fácil expansão, permitindo a inclusão de novos módulos (produtos, serviços, relatórios, etc.) conforme a demanda da empresa.

---

## Contato

**Desenvolvido para o Grupo World Beauty (WB) - 2025**  
Dúvidas ou sugestões? Entre em contato com a equipe de TI do Grupo
