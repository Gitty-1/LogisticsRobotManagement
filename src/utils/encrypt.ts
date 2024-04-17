import { JSEncrypt } from 'jsencrypt'

export const encrypt = (publicKey: string, text: string) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(text)
}