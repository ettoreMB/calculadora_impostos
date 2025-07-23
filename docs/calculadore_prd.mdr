Ótimo! Aqui está a primeira versão de um **PRD (Product Requirements Document)** para a sua calculadora de impostos baseada no que discutimos:

---

# 📄 PRD — Calculadora de Impostos para Notas Fiscais

## 1. Visão Geral

A aplicação será uma calculadora de impostos para auxiliar profissionais e empresas na emissão de **notas fiscais de serviços**. O foco está em tornar o processo acessível para pessoas que desejam saber **quanto precisam faturar para receber um valor líquido específico**, considerando todos os impostos obrigatórios incidentes.

---

## 2. Objetivos

* Permitir ao usuário informar o **valor líquido** que deseja receber.
* Calcular automaticamente o **valor bruto da nota fiscal**.
* Mostrar a **distribuição detalhada dos impostos** (nome, alíquota, valor).
* Basear os cálculos nas regras fiscais válidas no Brasil para emissão de NFS-e.

---

## 3. Público-alvo

* Profissionais autônomos ou liberais.
* Pequenas empresas (MEI, Simples Nacional, Lucro Presumido).
* Departamentos financeiros ou contábeis.

---

## 4. Requisitos Funcionais

### 4.1 Entradas do Usuário

* Valor líquido desejado (ex: R\$ 5.000,00).
* (Futuramente) Tipo de regime tributário (ex: MEI, Simples Nacional, Lucro Presumido).

### 4.2 Processamento

* Aplicar os percentuais dos impostos incidentes.
* Calcular o valor bruto necessário para que o valor líquido seja atingido após a retenção dos tributos.
* Exibir o valor total da nota e os detalhes dos impostos.

### 4.3 Saídas da Calculadora

* Valor total da nota (bruto).
* Lista dos impostos aplicados com:

  * Nome do imposto
  * Percentual
  * Valor correspondente
* Valor líquido final

---

## 5. Requisitos Não-Funcionais

* Aplicação leve e responsiva.
* Interface amigável e acessível.
* Suporte a dispositivos móveis.
* Interface 100% em português.

---

## 6. Tecnologias
* **Linguagem** TypeScript
* **Framework:** Next.js (última versão estável)
* **Estilização:** shadcn/ui + TailwindCSS
* **Hospedagem:** Vercel (preferencial)
* **Back-end:** Nenhum inicialmente, lógica de cálculo no frontend

---

## 7. Exemplo de Uso

**Input do usuário:**

* Valor líquido: R\$ 10.000,00

**Output esperado:**

* Valor bruto da nota: R\$ 12.880,00
* Impostos:

  * ISS (5%): R\$ 644,00
  * IRRF (1,5%): R\$ 193,20
  * CSLL (1%): R\$ 128,80
  * INSS (11%): R\$ 1.416,80
  * PIS (0,65%): R\$ 83,72
  * COFINS (3%): R\$ 386,40
* Valor líquido final: R\$ 10.000,00

> Obs: valores simulados, precisam ser ajustados conforme legislação fiscal vigente e regime tributário.

---

## 8. Próximos Passos

1. Levantamento detalhado das regras tributárias para cada imposto.
2. Definição da fórmula de cálculo reverso (de líquido para bruto).
3. Implementação do protótipo com valores mockados.
4. Validação com contador ou especialista tributário.
5. Publicação da primeira versão.

---


