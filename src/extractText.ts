

import { createWorker } from 'tesseract.js'

export async function extractText(imageData: string): Promise<{ text: string; error: string | null }> {
  try {
    const worker = await createWorker('eng')
    const { data: { text } } = await worker.recognize(imageData)
    await worker.terminate()
    return { text, error: null }
  } catch (error) {
    console.log({error});
    return { text: '', error: 'Failed to extract text from the image.' }
  }
}