"use client";

import React, { useState } from "react";
import { Upload } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  resume: File | null;
}

export function ResumeForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
      setFileAttached(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Validate form data
      if (!formData.resume) {
        throw new Error("Por favor, anexe seu currículo");
      }

      const formDataToSend = new FormData();
      // Importante: o servidor espera "name", não "fullName"
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      if (formData.message) {
        formDataToSend.append("message", formData.message);
      }
      formDataToSend.append("resume", formData.resume);

      console.log("Enviando dados para o servidor...");
      
      // Usar o endereço completo do servidor
      const response = await fetch("http://localhost:3000/submit-resume", {
        method: "POST",
        body: formDataToSend,
        // Não definir Content-Type, o navegador fará isso automaticamente com o boundary correto
      });

      console.log("Resposta recebida:", response.status);

      if (response.ok) {
        setSuccessMessage("Currículo enviado com sucesso! Agradecemos sua candidatura.");
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          resume: null,
        });
        setFileAttached(false);
      } else {
        // Tentar obter detalhes do erro
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao enviar o currículo");
        } catch (jsonError) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        setErrorMessage("Não foi possível conectar ao servidor. Verifique se o servidor está rodando na porta 3000.");
      } else {
        setErrorMessage(error instanceof Error ? error.message : "Erro desconhecido ao enviar o currículo");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
          Obrigado pela sua candidatura!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          Analisaremos seu currículo e entraremos em contato em breve.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#F12E34] text-white rounded-full 
                    hover:bg-opacity-90 transition-colors text-sm sm:text-base"
        >
          Enviar Outra Candidatura
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full max-w-2xl mx-auto">
      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{errorMessage}</p>
          <p className="text-sm mt-1">
            Dica: Verifique se o servidor está rodando com o comando: <code>npm start</code>
          </p>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          id="fullName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                    shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                    dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
          value={formData.fullName}
          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                      shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                      dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                      shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                      dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Currículo (PDF ou Word)
        </label>
        <div className="mt-1 flex justify-center px-4 py-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="resume" className="cursor-pointer text-[#F12E34] font-medium hover:text-opacity-90">
                Escolher arquivo
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </label>
              {fileAttached && (
                <p className="mt-1 text-sm text-gray-500">
                  {formData.resume?.name} ({Math.round(formData.resume?.size / 1024)} KB)
                </p>
              )}
            </div>
          </div>
        </div>
        {fileAttached && <p className="mt-2 text-sm text-green-600">Currículo anexado com sucesso!</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#F12E34] text-white rounded-full hover:bg-opacity-90 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        ) : (
          "Enviar Candidatura"
        )}
      </button>

      {successMessage && <p className="mt-2 text-sm text-center text-green-600">{successMessage}</p>}
    </form>
  );
}