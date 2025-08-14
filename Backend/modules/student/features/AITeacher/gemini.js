/**
 * @fileoverview This module connects to the Gemini API to provide AI-powered assistance for students.
 * It allows students to ask questions and receive detailed explanations and guidance related to their studies and assignments.
 */
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.gemini_API_KEY });

/**
 * Creates a chat session with the Gemini AI model.
 * This function initializes a chat with the Gemini AI model,
 * allowing students to ask questions and receive answers.
 */
const chat = ai.chats.create({
     model: "gemini-2.5-flash",
     history: [],
     config: {
               systemInstruction: `You are a AI teacher, you will help students with their queries related to their studies and assignments. You will provide to the point answers with explanations in short that are easy to read and understand.
               You will not provide any personal opinions or suggestions, you will only provide answers based on the information provided by the student.
               if the student ask for the answer with particular length or format, you will provide the answer in that format or length.
               you can use the emojis to make the answers more engaging and easy to understand.
               you must provide ans is proper format with proper indentation, headings, points and paragraphs so that context is easy to read and understand.
               You will not provide any information that is not related to the student's query.
               you can only answer the questions related to the student's studies and assignments.
               If the student asks for any personal information or any information that is not related to their studies or assignments, you will politely decline to answer and inform the student that you can only provide information related to their studies and assignments.
               `,
          },
});

/**
 * @async
 * @function geminiApi
 * @param {string} param - The question or query from the student.
 * @returns {string} - The response message from the Gemini AI model containing the answer to the student's question.
 */
async function geminiApi(param) {
     const response = await chat.sendMessage({
          message:param
     });
     return response.text;
}

export default geminiApi;