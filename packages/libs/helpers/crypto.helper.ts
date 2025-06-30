const crypto = require('crypto')

const iv = Buffer.alloc(16);

//node -e "console.log(require('crypto').randomBytes(16).toString('hex'))

export const encryption = (text: string) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, iv)
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    return encrypted
} 

export const decryption = (text: string) => {
    try {
        const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, iv)
        const decrypted = cipher.update(text, 'hex', 'utf8') + cipher.final('utf8')
        return decrypted
    } catch {
        return ""
    }
}
