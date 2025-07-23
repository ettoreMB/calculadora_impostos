import { z } from 'zod';

/**
 * Schema de validação para os dados de entrada da calculadora
 */
export const calculoSchema = z.object({
  valorLiquido: z.number().positive('O valor líquido deve ser positivo'),
  regimeTributario: z.enum(['MEI', 'Simples', 'LucroPresumido'], {
    required_error: 'O regime tributário é obrigatório'
  })
});

/**
 * Tipo para os dados de entrada da calculadora
 */
export type DadosCalculo = z.infer<typeof calculoSchema>;

/**
 * Interface para representar um imposto
 */
export interface Imposto {
  nome: string;
  percentual: number;
  valor: number;
}

/**
 * Interface para o resultado do cálculo
 */
export interface ResultadoCalculo {
  valorLiquido: number;
  valorBruto: number;
  impostos: Imposto[];
  valorLiquidoFinal: number;
}

/**
 * Configuração dos impostos por regime tributário
 * Baseado na planilha de referência WFB CONSULTORIA
 * 
 * Nota: ISS (2%) é pago pela empresa emissora, não retido pelo tomador
 */
const CONFIGURACAO_IMPOSTOS = {
  MEI: [
    { nome: 'IRRF', percentual: 1.5 },
    { nome: 'PIS', percentual: 0.65 },
    { nome: 'COFINS', percentual: 3.0 },
    { nome: 'CSLL', percentual: 1.0 }
  ],
  Simples: [
    { nome: 'IRRF', percentual: 1.5 },
    { nome: 'PIS', percentual: 0.65 },
    { nome: 'COFINS', percentual: 3.0 },
    { nome: 'CSLL', percentual: 1.0 }
  ],
  LucroPresumido: [
    { nome: 'IRRF', percentual: 1.5 },
    { nome: 'PIS', percentual: 0.65 },
    { nome: 'COFINS', percentual: 3.0 },
    { nome: 'CSLL', percentual: 1.0 }
  ]
} as const;

/**
 * Calcula o valor bruto necessário para atingir o valor líquido após os impostos.
 *
 * @param {number} valorLiquido - O valor líquido que o usuário deseja receber.
 * @param {number} percentualTotal - A soma dos percentuais de impostos aplicáveis.
 * @returns {number} O valor bruto que deverá constar na nota fiscal.
 */
function calcularValorBruto(valorLiquido: number, percentualTotal: number): number {
  return valorLiquido / (1 - percentualTotal / 100);
}

/**
 * Calcula o percentual total de impostos para um regime tributário.
 *
 * @param {string} regimeTributario - O regime tributário (MEI, Simples, LucroPresumido).
 * @returns {number} O percentual total de impostos.
 */
function calcularPercentualTotal(regimeTributario: keyof typeof CONFIGURACAO_IMPOSTOS): number {
  const impostos = CONFIGURACAO_IMPOSTOS[regimeTributario];
  return impostos.reduce((total, imposto) => total + imposto.percentual, 0);
}

/**
 * Calcula os impostos aplicados sobre um valor bruto.
 *
 * @param {number} valorBruto - O valor bruto da nota fiscal.
 * @param {string} regimeTributario - O regime tributário.
 * @returns {Imposto[]} Array com os impostos calculados.
 */
function calcularImpostos(valorBruto: number, regimeTributario: keyof typeof CONFIGURACAO_IMPOSTOS): Imposto[] {
  const impostos = CONFIGURACAO_IMPOSTOS[regimeTributario];
  
  return impostos.map(imposto => ({
    nome: imposto.nome,
    percentual: imposto.percentual,
    valor: (valorBruto * imposto.percentual) / 100
  }));
}

/**
 * Função principal que calcula o valor bruto e os impostos baseado no valor líquido desejado.
 *
 * @param {DadosCalculo} dados - Os dados de entrada (valor líquido e regime tributário).
 * @returns {ResultadoCalculo} O resultado completo do cálculo.
 * @throws {Error} Se os dados não forem válidos.
 */
export function calcularImpostosNFS(dados: DadosCalculo): ResultadoCalculo {
  // Validar dados de entrada
  const dadosValidados = calculoSchema.parse(dados);
  
  // Calcular percentual total de impostos
  const percentualTotal = calcularPercentualTotal(dadosValidados.regimeTributario);
  
  // Calcular valor bruto necessário
  const valorBruto = calcularValorBruto(dadosValidados.valorLiquido, percentualTotal);
  
  // Calcular impostos individuais
  const impostos = calcularImpostos(valorBruto, dadosValidados.regimeTributario);
  
  // Calcular valor líquido final (deve ser igual ao valor líquido desejado)
  const valorLiquidoFinal = valorBruto - impostos.reduce((total, imposto) => total + imposto.valor, 0);
  
  return {
    valorLiquido: dadosValidados.valorLiquido,
    valorBruto,
    impostos,
    valorLiquidoFinal
  };
}

/**
 * Formata um valor monetário para exibição.
 *
 * @param {number} valor - O valor a ser formatado.
 * @returns {string} O valor formatado em reais.
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

/**
 * Formata um percentual para exibição.
 *
 * @param {number} percentual - O percentual a ser formatado.
 * @returns {string} O percentual formatado.
 */
export function formatarPercentual(percentual: number): string {
  return `${percentual.toFixed(2)}%`;
} 