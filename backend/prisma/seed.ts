import { PrismaClient, Colors, Icons, TransactionType } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/pt_BR";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoryTemplates = [
  { name: "Alimentação", icon: Icons.utensils, color: Colors.orange },
  { name: "Transporte", icon: Icons.car_front, color: Colors.blue },
  { name: "Saúde", icon: Icons.heart_pulse, color: Colors.red },
  { name: "Educação", icon: Icons.book_open, color: Colors.purple },
  { name: "Lazer", icon: Icons.ticket, color: Colors.pink },
  { name: "Compras", icon: Icons.shopping_cart, color: Colors.green },
  { name: "Moradia", icon: Icons.house, color: Colors.yellow },
  { name: "Pets", icon: Icons.paw_print, color: Colors.orange },
  { name: "Presentes", icon: Icons.gift, color: Colors.pink },
  { name: "Academia", icon: Icons.dumbbell, color: Colors.blue },
  { name: "Viagens", icon: Icons.baggage_claim, color: Colors.purple },
  { name: "Trabalho", icon: Icons.briefcase_business, color: Colors.green },
  { name: "Economias", icon: Icons.piggy_bank, color: Colors.yellow },
  { name: "Contas", icon: Icons.receipt_text, color: Colors.red },
  { name: "Ferramentas", icon: Icons.tool_case, color: Colors.blue },
];

const transactionDescriptions = {
  [Icons.utensils]: [
    "Restaurante",
    "Supermercado",
    "Lanche",
    "Café",
    "Delivery",
    "Padaria",
    "Açougue",
    "Feira",
    "Farmácia",
    "Conveniência",
  ],
  [Icons.car_front]: [
    "Combustível",
    "Uber",
    "Taxi",
    "Estacionamento",
    "Manutenção",
    "Pedágio",
    "Metrô",
    "Ônibus",
    "Bicicleta",
    "Patinete",
  ],
  [Icons.heart_pulse]: [
    "Consulta médica",
    "Remédios",
    "Exames",
    "Plano de saúde",
    "Dentista",
    "Fisioterapia",
    "Acupuntura",
    "Psicólogo",
  ],
  [Icons.book_open]: [
    "Curso online",
    "Livros",
    "Faculdade",
    "Escola",
    "Material escolar",
    "Idiomas",
    "Workshop",
    "Pós-graduação",
  ],
  [Icons.ticket]: [
    "Cinema",
    "Teatro",
    "Show",
    "Parque",
    "Museu",
    "Jogo",
    "Streaming",
    "Gaming",
    "Evento esportivo",
  ],
  [Icons.shopping_cart]: [
    "Roupas",
    "Calçados",
    "Eletrônicos",
    "Móveis",
    "Decoração",
    "Cosméticos",
    "Perfumaria",
    "Acessórios",
  ],
  [Icons.house]: [
    "Aluguel",
    "Condomínio",
    "Água",
    "Luz",
    "Gás",
    "Internet",
    "Telefone",
    "IPTU",
    "Seguro residência",
    "Mobília",
  ],
  [Icons.paw_print]: [
    "Veterinário",
    "Ração",
    "Banho e tosa",
    "Brinquedos",
    "Remédios",
    "Pet shop",
    "Adestramento",
    "Transporte pet",
  ],
  [Icons.gift]: [
    "Aniversário",
    "Natal",
    "Dia dos pais",
    "Dia das mães",
    "Casamento",
    "Formatura",
    "Presente surpresa",
  ],
  [Icons.dumbbell]: [
    "Academia",
    "Personal trainer",
    "Suplementos",
    "Equipamentos",
    "Aulas de yoga",
    "Crossfit",
    "Natação",
    "Corrida",
  ],
  [Icons.baggage_claim]: [
    "Passagem aérea",
    "Hospedagem",
    "Passeio turístico",
    "Aluguel carro",
    "Seguro viagem",
    "Câmbio",
    "Pacote turístico",
  ],
  [Icons.briefcase_business]: [
    "Salário",
    "Freelance",
    "Bônus",
    "Comissão",
    "Horas extras",
    "Consultoria",
    "Projeto",
    "Treinamento",
  ],
  [Icons.piggy_bank]: [
    "Poupança",
    "Investimento",
    "Renda fixa",
    "Ações",
    "Tesouro direto",
    "Fundos imobiliários",
    "Criptomoedas",
    "Previdência",
  ],
  [Icons.receipt_text]: [
    "Conta de luz",
    "Conta de água",
    "Telefone",
    "Internet",
    "Cartão de crédito",
    "Financiamento",
    "Impostos",
    "Mensalidades",
  ],
  [Icons.tool_case]: [
    "Ferramentas",
    "Material de construção",
    "Reparos",
    "Instalação",
    "Elétrica",
    "Hidráulica",
    "Pintura",
    "Jardinagem",
  ],
};

const incomeDescriptions = [
  "Salário",
  "Freelance",
  "Bônus",
  "Comissão",
  "Horas extras",
  "Investimentos",
  "Aluguel",
  "Venda",
  "Presente",
  "Reembolso",
  "Premiação",
  "Dividendos",
  "Juros",
  "Rendimento",
  "Herança",
];

function getRandomDescription(icon: Icons, type: TransactionType): string {
  if (type === TransactionType.income) {
    return faker.helpers.arrayElement(incomeDescriptions);
  }

  const descriptions = transactionDescriptions[icon] || ["Despesa variável"];
  return faker.helpers.arrayElement(descriptions);
}

function generateAmountInCents(type: TransactionType): number {
  if (type === TransactionType.income) {
    return faker.number.int({ min: 5000, max: 15000 }) * 100; // R$ 50,00 - R$ 15.000,00
  }

  return faker.number.int({ min: 100, max: 2000 }) * 100; // R$ 1,00 - R$ 2.000,00
}

async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
}

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Limpar dados existentes
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Dados existentes removidos");

  // Criar usuário
  const hashedPassword = await hashPassword("123456");
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
    },
  });

  console.log(`👥 Usuário criado: ${user.name}`);

  // Criar categorias
  const categories: Array<{ id: string; userId: string; icon: Icons }> = [];

  const createdCategories = await Promise.all(
    categoryTemplates.map((template) =>
      prisma.category.create({
        data: {
          name: template.name,
          description: `Categoria para ${template.name.toLowerCase()}`,
          icon: template.icon,
          color: template.color,
          userId: user.id,
        },
      }),
    ),
  );

  createdCategories.forEach((category) => {
    categories.push({
      id: category.id,
      userId: category.userId,
      icon: category.icon,
    });
  });

  console.log(`📁 ${categories.length} categorias criadas`);

  // Criar transações
  const transactionsPerUser = 1000;
  const totalTransactions = transactionsPerUser;

  const userCategories = categories.filter((cat) => cat.userId === user.id);
  const transactions = [];

  for (let i = 0; i < transactionsPerUser; i++) {
    const category = faker.helpers.arrayElement(userCategories);
    const isIncome = faker.datatype.boolean({ probability: 0.3 }); // 30% de chance de ser receita
    const type = isIncome ? TransactionType.income : TransactionType.outcome;
    const date = faker.date.past({ years: 2 });

    transactions.push({
      type,
      description: getRandomDescription(category.icon, type),
      date,
      amountInCents: generateAmountInCents(type),
      categoryId: category.id,
      userId: user.id,
    });
  }

  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log(`💰 ${totalTransactions} transações criadas`);

  // Estatísticas finais
  const totalUsers = await prisma.user.count();
  const totalCategories = await prisma.category.count();
  const totalTransactionsCount = await prisma.transaction.count();
  const incomeCount = await prisma.transaction.count({
    where: { type: TransactionType.income },
  });
  const outcomeCount = await prisma.transaction.count({
    where: { type: TransactionType.outcome },
  });

  console.log("\n📊 Estatísticas finais:");
  console.log(`   Usuários: ${totalUsers}`);
  console.log(`   Categorias: ${totalCategories}`);
  console.log(`   Transações: ${totalTransactionsCount}`);
  console.log(`   Receitas: ${incomeCount}`);
  console.log(`   Despesas: ${outcomeCount}`);
  console.log("\n✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
