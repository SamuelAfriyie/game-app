import { AES, enc } from "crypto-js";

// export async function delayBy(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export function decryptQueryParam(encryptedParam: string, key: string): string {
  try { 
    const bytes = AES.decrypt(encryptedParam.replaceAll(" ", "+", ), key);
    const decryptedParam = bytes.toString(enc.Utf8); 
    return decryptedParam;
  } catch (error) { 
    throw new Error("Failed to decrypt query parameter");
  }
}

export function encryptData(text: string, key: string): string {
  try {  
    const encryptedText = AES.encrypt(text, key).toString();
    return encryptedText;
  } catch (error) {
    // Handle encryption error
    throw new Error("Failed to encrypt text");
  }
}
