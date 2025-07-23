# 🧮 Calculadora de Impostos para NFS-e

Uma aplicação web moderna para calcular automaticamente o valor bruto necessário para notas fiscais de serviços, considerando todos os impostos obrigatórios incidentes.

## 📋 Sobre o Projeto

Esta calculadora permite que profissionais e empresas determinem **quanto precisam faturar para receber um valor líquido específico**, considerando todos os impostos aplicáveis na emissão de NFS-e no Brasil.

### ✨ Funcionalidades

- **Cálculo reverso**: De valor líquido para valor bruto
- **Múltiplos regimes tributários**: MEI, Simples Nacional, Lucro Presumido
- **Detalhamento completo**: Exibe todos os impostos com percentuais e valores
- **Interface responsiva**: Funciona em desktop e dispositivos móveis
- **Validação robusta**: Validação de dados com Zod
- **Design moderno**: Interface elegante com shadcn/ui

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15.4.3
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS + shadcn/ui
- **Validação**: Zod
- **Formulários**: React Hook Form
- **Containerização**: Docker + Docker Compose

## 🚀 Como Executar

### Pré-requisitos

- Docker
- Docker Compose

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd calculadora_impostos
   ```

2. **Execute com Docker**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### Desenvolvimento

Para desenvolvimento, o projeto está configurado para rodar inteiramente dentro de containers Docker. Todas as dependências e comandos devem ser executados dentro do container:

```bash
# Acessar o container
docker-compose exec app sh

# Instalar novas dependências
docker-compose exec app npm install <pacote>

# Executar testes
docker-compose exec app npm test

# Executar linting
docker-compose exec app npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js (App Router)
├── components/             # Componentes UI reutilizáveis
│   └── ui/                # Componentes shadcn/ui
├── features/              # Organização por features
│   ├── calculadora/       # Feature da calculadora
│   └── impostos/          # Feature de impostos
├── lib/                   # Utilitários e configurações
└── services/              # Lógica de negócio
    └── calculo-impostos.ts # Serviço principal de cálculo
```

## 🧮 Como Usar

1. **Informe o valor líquido** que você deseja receber
2. **Selecione o regime tributário** (MEI, Simples Nacional, Lucro Presumido)
3. **Clique em "Calcular Impostos"**
4. **Visualize os resultados**:
   - Valor bruto da NFS-e
   - Detalhamento de cada imposto
   - Valor líquido final

## 📊 Impostos Calculados

A aplicação considera os seguintes impostos:

- **ISS**: 5,0%
- **IRRF**: 1,5%
- **CSLL**: 1,0%
- **INSS**: 11,0%
- **PIS**: 0,65%
- **COFINS**: 3,0%

> ⚠️ **Nota**: Os percentuais são baseados na legislação fiscal vigente, mas podem variar conforme a localidade e situação específica.

## 🔧 Configuração de Desenvolvimento

### Regras de Desenvolvimento

- **JSDoc obrigatório**: Todas as funções devem ser documentadas
- **Validação com Zod**: Sempre usar Zod para validação de dados
- **Organização por features**: Código organizado por funcionalidades
- **TypeScript**: Todo o código deve ser tipado
- **Docker**: Desenvolvimento exclusivamente em containers

### Comandos Úteis

```bash
# Instalar componentes shadcn/ui
docker-compose exec app npx shadcn@latest add <componente>

# Verificar logs do container
docker-compose logs app

# Parar a aplicação
docker-compose down

# Reconstruir container
docker-compose up --build
```

## 📝 Documentação Técnica

### Serviço de Cálculo

O serviço principal (`src/services/calculo-impostos.ts`) contém:

- **Validação de dados** com schemas Zod
- **Cálculo reverso** de valor líquido para bruto
- **Configuração de impostos** por regime tributário
- **Funções de formatação** para exibição

### Componentes

- **CalculadoraForm**: Componente principal com formulário e resultados
- **Componentes UI**: Button, Input, Card, Select, etc. do shadcn/ui

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do repositório.

---

**Desenvolvido com ❤️ para auxiliar profissionais e empresas brasileiras**
