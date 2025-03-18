import express from "express";
import multer from "multer";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();


// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Garantir que a pasta uploads existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Configuração do SQLite
    const dbPromise = open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
    });

    // Inicializar o banco de dados
    async function initializeDatabase() {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE IF NOT EXISTS candidates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        resume_path TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("Banco de dados inicializado com sucesso");
    }

    initializeDatabase().catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
    process.exit(1);
    });

    // Configuração de upload de arquivo
    const upload = multer({
    storage: multer.diskStorage({
        destination: uploadsDir,
        filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /pdf|docx|doc/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (extname && mimetype) {
        return cb(null, true);
        } else {
        cb(new Error("Erro: Apenas arquivos PDF e DOCX são permitidos!"));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamanho de arquivo de 5 MB
    });

    // Transportador de e-mail
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    });

    // Limitação de taxa
    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limitar cada ATÉ 5 pedidos por janela
    });

    app.use(express.json());
    app.use(limiter);

    // Configuração CORS mais permissiva
    app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    
    next();
    });

    // Rota para verificar se o servidor está funcionando
    app.get("/", (req, res) => {
    res.json({ message: "Servidor de envio de currículos está funcionando!" });
    });

    // Middleware para lidar com erros do multer
    const uploadMiddleware = (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
        if (err) {
        console.error("Erro no upload:", err);
        return res.status(400).json({ error: err.message });
        }
        next();
    });
    };

    // Ponto final de envio de currículo
    app.post("/submit-resume", uploadMiddleware, async (req, res) => {
    try {
        console.log("Recebendo requisição:", req.body);
        
        const { name, email, phone } = req.body;
        const resumeFile = req.file;
        
        if (!name || !email || !phone || !resumeFile) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }
        
        console.log("Arquivo recebido:", resumeFile.filename);
        
        // Salvar no banco de dados
        const db = await dbPromise;
        const result = await db.run(
        "INSERT INTO candidates(name, email, phone, resume_path) VALUES(?, ?, ?, ?)",
        [name, email, phone, resumeFile.path]
        );
        
        console.log("Dados salvos no banco de dados");
        
        // Enviar e-mail
        try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: "Novo Currículo Enviado",
            text: `Novo currículo enviado por ${name}. Email: ${email}, Telefone: ${phone}`,
            attachments: [
            {
                filename: resumeFile.originalname,
                path: resumeFile.path,
            },
            ],
        });
        
        console.log("E-mail enviado para o administrador");
        
        // Enviar e-mail de confirmação para o candidato
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Confirmação de Envio de Currículo",
            html: `
                <p>Olá ${name},</p>
                <p>Agradecemos por enviar seu currículo para a equipe do Zé de Vicente! Recebemos sua candidatura e vamos analisá-la com atenção.</p>
                <p>Caso seu perfil esteja alinhado com alguma de nossas vagas, entraremos em contato para conversarmos.</p>
                <p>Se precisar de mais informações, fique à vontade para nos contatar.</p>
                <p>Atenciosamente,</p>
                <p><strong>Equipe Zé de Vicente</strong></p>

            `,
        });


        
        console.log("E-mail de confirmação enviado para o candidato");
        } catch (emailError) {
        console.error("Erro ao enviar e-mail:", emailError);
        // Não falhar a requisição se o e-mail falhar
        }
        
        res.status(200).json({ message: "Currículo enviado com sucesso" });
    } catch (error) {
        console.error("Erro ao processar envio:", error);
        res.status(500).json({ error: "Ocorreu um erro ao enviar o currículo" });
    }
    });

    // Iniciar o servidor
    app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse http://localhost:${port} para verificar`);
});