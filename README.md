# ✈️ Férias Aurora, Ana e Allan - Planejador Mágico de Viagens

Bem-vindo(a) ao repositório oficial do nosso Planejador de Viagens! 

Este aplicativo foi idealizado e construído do zero sob medida para garantir que o planejamento das férias em família seja não apenas organizado, mas incrivelmente divertido e inteligente. 

Ele é uma aplicação web interativa que funciona como um "Assistente de Viagens Pessoal", cruzando dados em tempo real para montar o cenário perfeito para qualquer destino do mundo.

---

## 🌟 O que exatamente este aplicativo faz?

Imagine não precisar abrir 10 abas diferentes para calcular câmbio, ver hotéis, roteiros de cada dia, checklists de mala e custos. Este aplicativo centraliza **tudo**:

1. **Roteiros Inteligentes (Itinerário Dinâmico)**
   Você diz para onde vai, quantos dias e quem vai com você. O aplicativo gera uma linha do tempo dia após dia. Vai levar um bebê (Aurora)? Ele automaticamente troca aquele "Museu Silencioso de 4 horas" por um "Parque com área Kids". Cansou de andar? Ele embute botões para calcular o Uber/Táxi daquele dia.

2. **Câmbio e Orçamento em Tempo Real**
   Digitou que o destino é "Paris"? O aplicativo percebe, muda a moeda oficial para Euro (EUR) e conecta com uma API financeira para buscar a cotação exata do Euro para Reais (BRL) naquele segundo. Tudo o que você gasta lá (hotéis, restaurantes) é convertido magicamente para Reais no seu painel de Controle de Gastos.

3. **Sugestões Contextuais (Hotéis e Restaurantes)**
   O app gera 5 opções incríveis de hotéis e 5 de restaurantes que combinam com o destino e com as preferências de dieta do grupo (ex: Vegetariana, Alta Gastronomia). Gostou de um? Clique em "Ver no Mapa" ou "Reservar" e ele te joga direto pro Google Maps ou Booking já com as buscas preenchidas! E claro, um clique no botão (+) joga o valor na sua planilha de despesas.

4. **Malas Organizadas (Checklist Duplo)**
   Esquecer a fralda ou o passaporte? Nunca mais. O sistema tem um checklist interativo separado por abas: uma só para garantir a sobrevivência e os itens do bebê (Aurora), e outra para os adultos e os lembretes de segurança de casa antes de fechar a porta.

5. **Transportes e Voos**
   Integração com buscas do Google Flights, Trainline, e Busbud. Ele simula até o custo de ir com o próprio carro calculando a gasolina e pedágios predefinidos!

---

## 💻 Como Acessar a Aplicação?

Nós transformamos o código em um aplicativo de verdade, hospedado na nuvem rápida e segura da infraestrutura do Google (Google Cloud Platform - Cloud Run).

🌐 **Acesse ao vivo através deste link público de produção:**
[**Planejador de Viagens da Família**](https://feriasanaallanauroa-999472589334.southamerica-east1.run.app/)

*(O link funciona em computadores, tablets e celulares).*

---

## 🛠️ Tecnologias Utilizadas (Para os curiosos da Engenharia)

Este projeto foi construído utilizando os mais altos padrões do mercado de tecnologia web contemporânea:

- **Next.js 15+ (App Router)**: Framework React super rápido e otimizado para a nuvem. Operando em modo `Standalone` no GCP Cloud Run.
- **TypeScript**: Para garantir a qualidade, segurança e previsibilidade de todo o código escrito.
- **Tailwind CSS v4**: Uma engenharia de design espetacular, garantindo aquele visual "Glassmorphism" translúcido, cantos arredondados suaves e responsividade nativa em telas grandes e pequenas.
- **Context API & LocalStorage**: O aplicativo lembra de tudo! Se você fechar o navegador sem querer e voltar, seu roteiro, seus gastos e seu perfil estarão exatamente como você os deixou.
- **Lucide React**: Biblioteca de ícones vetoriais modernos.
- **AwesomeAPI (Economia)**: Consumo de dados ao vivo do mercado financeiro para as taxas de câmbio.
- **Docker**: Todo o ecossistema é "empacotado" num contêiner multi-estágio super leve de Node.js (Alpine) para rodar no Google Cloud de forma impecável.

---

## 🚀 Como Executar Localmente no seu Computador

Caso queira baixar o código e rodar na sua própria máquina (precisa ter o Node.js instalado):

1. **Clone este repositório**
   ```bash
   git clone https://github.com/allangomesf/feriasaurora.git
   ```
2. **Entre na pasta**
   ```bash
   cd feriasaurora
   ```
3. **Instale os pacotes e dependências**
   ```bash
   npm install
   ```
4. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
5. Abra `http://localhost:3000` no seu navegador e comece a planejar!

---

💡 *Criado como uma experiência inovadora de GenAI + Assistência de Código Autônoma para transformar ideias criativas em softwares visuais e dinâmicos em tempo recorde.*
