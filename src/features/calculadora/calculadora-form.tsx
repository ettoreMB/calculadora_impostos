"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calcularImpostosNFS,
  calculoSchema,
  formatarMoeda,
  type DadosCalculo,
  type ResultadoCalculo,
} from "@/services/calculo-impostos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Componente principal da calculadora de impostos
 */
export function CalculadoraForm() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<DadosCalculo>({
    resolver: zodResolver(calculoSchema),
    defaultValues: {
      valorLiquido: 0,
      regimeTributario: "Simples",
    },
  });

  const regimeTributario = watch("regimeTributario");
  const valorLiquido = watch("valorLiquido");

  /**
   * Função que processa o envio do formulário
   */
  const onSubmit = async (dados: DadosCalculo) => {
    try {
      setErro(null);
      const resultadoCalculo = calcularImpostosNFS(dados);
      setResultado(resultadoCalculo);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro inesperado ao calcular impostos");
      }
    }
  };

  /**
   * Função que recalcula automaticamente quando o regime tributário muda
   */
  useEffect(() => {
    if (valorLiquido > 0) {
      handleSubmit(onSubmit)();
    }
  }, [regimeTributario]);

  /**
   * Função para lidar com mudança no valor
   */
  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    const valorNumerico = parseFloat(valor) || 0;
    setValue("valorLiquido", valorNumerico);

    // Recalcula automaticamente se há um valor válido
    if (valorNumerico > 0) {
      trigger("valorLiquido");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Calculadora de Impostos para NFS-e
          </CardTitle>
          <CardDescription className="text-center">
            Calcule o valor bruto necessário para receber o valor líquido
            desejado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Valor Líquido */}
            <div className="space-y-2">
              <Label htmlFor="valorLiquido">Valor Líquido Desejado (R$)</Label>
              <Input
                id="valorLiquido"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                onChange={handleValorChange}
                className={errors.valorLiquido ? "border-red-500" : ""}
              />
              {errors.valorLiquido && (
                <p className="text-sm text-red-500">
                  {errors.valorLiquido.message}
                </p>
              )}
            </div>

            {/* Regime Tributário */}
            <div className="space-y-2">
              <Label htmlFor="regimeTributario">Regime Tributário</Label>
              <Select
                value={regimeTributario}
                onValueChange={(value) =>
                  setValue("regimeTributario", value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o regime tributário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEI">MEI</SelectItem>
                  <SelectItem value="Simples">Simples Nacional</SelectItem>
                  <SelectItem value="LucroPresumido">
                    Lucro Presumido
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.regimeTributario && (
                <p className="text-sm text-red-500">
                  {errors.regimeTributario.message}
                </p>
              )}
            </div>

            {/* Botão de Calcular */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Calculando..." : "Calcular Impostos"}
            </Button>
          </form>

          {/* Exibição de Erro */}
          {erro && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">Erro:</p>
              <p className="text-red-500">{erro}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Resultado do Cálculo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Valores Principais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  Valor Bruto da NFS-e
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {formatarMoeda(resultado.valorBruto)}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  Valor Líquido Final
                </p>
                <p className="text-2xl font-bold text-green-800">
                  {formatarMoeda(resultado.valorLiquidoFinal)}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">
                  Total de Impostos
                </p>
                <p className="text-2xl font-bold text-orange-800">
                  {formatarMoeda(
                    resultado.valorBruto - resultado.valorLiquidoFinal
                  )}
                </p>
              </div>
            </div>

            {/* Detalhamento dos Impostos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Detalhamento dos Impostos
              </h3>
              <div className="space-y-2">
                {resultado.impostos.map((imposto, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{imposto.nome}</p>
                      <p className="text-sm text-gray-600">
                        {imposto.percentual.toFixed(2)}%
                      </p>
                    </div>
                    <p className="font-semibold text-lg">
                      {formatarMoeda(imposto.valor)}
                    </p>
                  </div>
                ))}

                {/* ISS separado (pago pela empresa emissora) */}
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div>
                    <p className="font-medium text-blue-800">
                      ISS (pago pela empresa)
                    </p>
                    <p className="text-sm text-blue-600">2,00%</p>
                  </div>
                  <p className="font-semibold text-lg text-blue-800">
                    {formatarMoeda((resultado.valorBruto * 2.0) / 100)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

