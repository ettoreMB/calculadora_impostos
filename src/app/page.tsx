import { CalculadoraForm } from "@/features/calculadora/calculadora-form";

/**
 * Página principal da aplicação - Calculadora de Impostos
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Impostos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcule automaticamente o valor bruto necessário para sua NFS-e e
            veja o detalhamento completo dos impostos aplicáveis.
          </p>
        </div>

        <CalculadoraForm />

        <footer className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            Desenvolvido para auxiliar profissionais e empresas na emissão de
            notas fiscais de serviços.
          </p>
          <p className="text-xs mt-2">
            Os valores são baseados na legislação fiscal vigente no Brasil.
          </p>
        </footer>
      </div>
    </main>
  );
}

