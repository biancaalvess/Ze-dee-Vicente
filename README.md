
# Project - Zé de Vicente

This project is a web system developed for the company **Zé de Vicente**, with the goal of facilitating the receipt of resumes. It allows candidates to fill out a form, attach their resumes and send their information directly to the recruitment team.

## Technologies Used

### Front-end:
- **React.js** - Library for dynamic and componentized interfaces.
- **TypeScript** - JavaScript superset that adds static typing.
- **Vite.js** - Fast and optimized build tool.
- **Tailwind CSS** - CSS framework for fast and responsive styling.
- **Lucide-react** - Set of modern icons to enhance the interface.
- **Context API** - State management for theme switching.
- **Dark Mode** - Implemented with support for light and dark themes.

### Back-end:
- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Minimalist framework for creating APIs.
- **SQLite** - Lightweight, embedded SQL database.
- **Multer** - Middleware for uploading files.
- **Nodemailer** - Library for sending emails.
- **dotenv** - Environment variable management.
- **express-rate-limit** - Middleware for limiting requests and preventing spam.
- **CORS** - Middleware for controlling access between different domains.

### Deployment and Hosting:
- **Netlify** - Hosting and continuous deployment of the front-end.
- **Render or Heroku** - Hosting of the back-end.

## Database Structure
The database used is **SQLite**, and the main structure is the **candidates** table, responsible for storing the candidates' data. The structure is defined in `server.js` and follows this scheme:

```sql
CREATE TABLE IF NOT EXISTS candidates (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL,
phone TEXT NOT NULL,
resume_path TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Front-end Structure

The front-end is developed using **React.js** with **TypeScript**, and follows the following organization:

- **`App.tsx`** - Main component that structures the page, including the header, application form, company location and footer.
- **`ResumeForm.tsx`** - Form for submitting resumes, with data validation, file upload and error/success messages.
- **`ThemeContext.tsx`** - Context for switching between light and dark themes.
- **`SocialLinks.tsx`** - Component responsible for displaying links to social networks.
- **`Location.tsx`** - Component that displays the company's location.
- **`Footer.tsx`** - Website footer with additional information.

## Main Features

- **Registration Form** - Captures candidate information (name, email, phone number and resume attachment).
- **Data Validation** - Checks if all required fields are filled in correctly.
- **Resume Upload** - Only PDF and DOCX files up to 5MB are allowed.
- **Database Storage** - Information is recorded in an SQLite database.
- **Email Sending** - The system notifies recruiters and candidates via email.
- **Request Limitation** - Prevents abuse and spam by restricting access by IP.
- **Dark/Light Mode** - Responsive interface that switches between themes fluidly.

---

## Contribution
If you want to contribute, feel free to open a pull request or report issues on the repository's GitHub issues page.

---

## Author
Developed by [Bianca Alves](https://github.com/biancaalvess).
----------------------------------------------------------------------


# Projeto - Zé de Vicente

Este projeto é um sistema web desenvolvido para a empresa **Zé de Vicente**, com o objetivo de facilitar o recebimento de currículos. Ele permite que candidatos preencham um formulário, anexem seus currículos e enviem suas informações diretamente para a equipe de recrutamento.

## Tecnologias Utilizadas

### Front-end:
- **React.js** - Biblioteca para interfaces dinâmicas e componentizadas.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática.
- **Vite.js** - Ferramenta de build rápida e otimizada.
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e responsiva.
- **Lucide-react** - Conjunto de ícones modernos para aprimorar a interface.
- **Context API** - Gerenciamento de estado para alternância de temas.
- **Dark Mode** - Implementado com suporte para temas claro e escuro.

### Back-end:
- **Node.js** - Ambiente de execução JavaScript server-side.
- **Express.js** - Framework minimalista para criação de APIs.
- **SQLite** - Banco de dados SQL leve e embutido.
- **Multer** - Middleware para upload de arquivos.
- **Nodemailer** - Biblioteca para envio de e-mails.
- **dotenv** - Gerenciamento de variáveis de ambiente.
- **express-rate-limit** - Middleware para limitar requisições e evitar spam.
- **CORS** - Middleware para controle de acessos entre domínios diferentes.

### Deploy e Hospedagem:
- **Netlify** - Hospedagem e deploy contínuo do front-end.
- **Render ou Heroku** - Hospedagem do back-end.

## Estrutura do Banco de Dados
O banco de dados utilizado é o **SQLite**, e a estrutura principal é a tabela **candidates**, responsável por armazenar os dados dos candidatos. A estrutura está definida no `server.js` e segue este esquema:

```sql
CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resume_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Estrutura do Front-end

O front-end é desenvolvido utilizando **React.js** com **TypeScript**, e segue a seguinte organização:

- **`App.tsx`** - Componente principal que estrutura a página, incluindo o cabeçalho, formulário de candidatura, localização da empresa e rodapé.
- **`ResumeForm.tsx`** - Formulário de envio de currículos, com validação de dados, upload de arquivos e mensagens de erro/sucesso.
- **`ThemeContext.tsx`** - Contexto para alternância entre tema claro e escuro.
- **`SocialLinks.tsx`** - Componente responsável por exibir links para redes sociais.
- **`Location.tsx`** - Componente que exibe a localização da empresa.
- **`Footer.tsx`** - Rodapé do site com informações adicionais.

## Funcionalidades Principais

- **Formulário de Cadastro** - Captura informações dos candidatos (nome, e-mail, telefone e anexo do currículo).
- **Validação de Dados** - Verifica se todos os campos obrigatórios estão preenchidos corretamente.
- **Upload de Currículo** - Somente arquivos PDF e DOCX de até 5MB são permitidos.
- **Armazenamento no Banco de Dados** - Informações são registradas em um banco SQLite.
- **Envio de E-mails** - O sistema notifica os recrutadores e os candidatos via e-mail.
- **Limitação de Requisições** - Previne abuso e spam com restrição de acessos por IP.
- **Modo Escuro/Claro** - Interface responsiva que alterna entre os temas de forma fluida.

---

## Contribuição
Caso queira contribuir, sinta-se à vontade para abrir um pull request ou relatar problemas na página de issues do repositório no GitHub.

---

## Autor
Desenvolvido por [Bianca Alves](https://github.com/biancaalvess).