#  Luma Store – Risk-Oriented E2E Automation Architecture  
**Playwright + TypeScript | Engenharia de Testes | Foco em Estabilidade e Negócio**

Projeto de automação E2E para o e-commerce Magento (Luma Store), desenvolvido com **Playwright + TypeScript** e arquitetura baseada em **Page Object Model (POM)**.

Este projeto demonstra não apenas execução técnica, mas aplicação de princípios reais de engenharia de qualidade.

- Estratégia baseada em risco  
- Testes determinísticos  
- Isolamento de dependências externas  
- Arquitetura escalável  
- Boas práticas profissionais de automação  

---

#  Estratégia Baseada em Risco

Os fluxos automatizados foram priorizados considerando impacto financeiro e criticidade para o negócio:

| Fluxo | Impacto | Justificativa |
|-------|----------|---------------|
| Checkout | 🔴 Alto | Fluxo direto de receita |
| Adição ao Carrinho | 🔴 Alto | Conversão |
| Busca de Produto | 🟠 Médio | Descoberta de produto |
| Registro | 🟠 Médio | Aquisição de cliente |
| Home | 🟡 Base | Disponibilidade da aplicação |

A automação cobre os pontos mais sensíveis à experiência do usuário e geração de receita.

---

##  Escolha da Ferramenta de Teste

###  Playwright + TypeScript

### Motivos da escolha

- Suporte nativo a múltiplos browsers  
- Esperas automáticas (reduz flakiness)  
- API moderna e intuitiva  
- Interceptação de requisições simples (`page.route`)  
- Paralelização nativa  
- Relatório HTML integrado  
- Excelente integração com CI  

> Playwright permite maior controle sobre rede, sincronização e comportamento da aplicação — essencial para testes robustos.

---

##  Por que NÃO Cypress?

###  Vantagens
- Fácil setup  
- Boa comunidade  
- Excelente Developer Experience  

###  Desvantagens
- Arquitetura baseada em browser único  
- Limitações históricas em múltiplas abas  
- Controle de rede menos flexível comparado ao Playwright  
- Execução paralela exige configuração adicional  

---

##  Por que NÃO Selenium?

###  Vantagens
- Extremamente consolidado  
- Grande compatibilidade  

###  Desvantagens
- Setup mais complexo  
- Código mais verboso  
- Maior propensão a flakiness  
- Menos moderno em termos de DX  

---


#  Escopo Automatizado

- ✔ Validação de carregamento da Home  
- ✔ Busca com escuta de requisição (`waitForResponse`)  
- ✔ Seleção dinâmica de produto  
- ✔ Adição ao carrinho  
- ✔ Fluxo completo de Checkout  
- ✔ Registro de usuário  
- ✔ Review de produto com rating obrigatório  

---

#  Arquitetura do Projeto

```text
tests/
├── e2e/
│    ├── add-to-cart.spec.ts
│    ├── cart.spec.ts
│    ├── checkout.spec.ts
│    ├── home.spec.ts
│    ├── product-review.spec.ts
│    ├── random-product.spec.ts
│    ├── register.spec.ts
│    └── search.spec.ts
│
├── pages/
│    ├── cart.page.ts
│    ├── checkout.page.ts
│    ├── home.page.ts
│    ├── product.page.ts
│    ├── search.page.ts
│
└── utils/
```

## Padrões Utilizados

- Page Object Model (POM)  
- Separação entre camada de teste e camada de página  
- Selectors baseados em acessibilidade (`getByRole`, `getByLabel`)  
- Evita CSS frágil  
- Zero uso de `waitForTimeout`  
- Uso mínimo de `force`, apenas quando tecnicamente necessário  

A arquitetura permite crescimento sustentável e fácil manutenção.

---

#  Decisões Técnicas

##  Escuta de Requisição

Uso de `page.waitForResponse()` para sincronização baseada no comportamento real da aplicação, reduzindo flakiness.

##  Produto Dinâmico

Seleção aleatória via `Math.random()` para evitar dependência de dados fixos e tornar o teste resiliente a mudanças de catálogo.

##  Estratégia para CAPTCHA

O CAPTCHA não foi automatizado diretamente.

O fluxo utiliza interceptação de requisição (`page.route`) para isolar dependências externas e manter determinismo — prática comum em ambientes reais via mock ou feature flag.

##  Tratamento de Componentes Customizados

Interação com componentes Magento + Knockout, incluindo resolução de interceptação por overlay CSS sem uso excessivo de `force`.

---

#  Estratégia Anti-Flaky

- Esperas explícitas baseadas em rede  
- Validações antes de interações  
- Sincronização baseada em estado real da aplicação  
- Isolamento de dependências externas  

---

#  Qualidade do Projeto

- ✔ Testes determinísticos  
- ✔ Zero dependência de dados fixos  
- ✔ Arquitetura escalável  
- ✔ Código desacoplado  
- ✔ Foco em risco de negócio  
- ✔ Práticas alinhadas com ambientes profissionais  

---

#  Tecnologias

- Playwright  
- TypeScript  
- Node.js  
- Faker  
- HTML Reporter  

---

#  Como Executar

### Instalar dependências

```bash
npm install
```

### Executar testes

```bash
npx playwright test
```

### Executar com interface gráfica

```bash
npx playwright test --ui
```

### Abrir relatório HTML

```bash
npx playwright show-report
```

---

#  Possíveis Evoluções

- Integração com GitHub Actions  
- Execução paralela configurada  
- Execução cross-browser  
- Estratégia de retry controlado  
- Pipeline de qualidade  

A estrutura atual suporta expansão sem necessidade de refatoração estrutural.

---

# 👩‍💻 Autora

**Vitória Regina dos Santos Melo**  
QA Automation Engineer  
Foco em qualidade orientada a risco, arquitetura de testes e excelência técnica.
