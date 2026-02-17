import { GoogleGenerativeAI } from "@google/generative-ai";
import { POEMS } from "@/lib/constants";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { sentiment } = await req.json();

        const prompt = `
      Eres un asistente romántico llamado "El Oráculo de Nosotros".
      Tu objetivo es analizar el sentimiento de una chica llamada Celeste y recomendarle una frase de apoyo y, si es posible, uno de los poemas escritos por su novio Josh.

      Sentimiento de Celeste: "${sentiment}"

      Poemas disponibles de Josh:
      ${POEMS.map(p => `- ID: ${p.id}, Título: ${p.title}, Contenido: ${p.content}`).join("\n")}

      Responde en formato JSON:
      {
        "recommendation": "Una frase corta, poética y de apoyo emocional (máximo 40 palabras) en español.",
        "poemId": "El ID del poema que mejor encaje con su sentimiento (solo si encaja realmente)"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown from response
        const jsonString = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(jsonString);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({
            recommendation: "Tu luz es más fuerte que cualquier sombra. Sigue adelante, mi cielo.",
            poemId: "luz-ciego"
        }, { status: 200 });
    }
}
