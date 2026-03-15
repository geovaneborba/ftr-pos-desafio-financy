interface EmailService {
  sendPasswordResetEmail(email: string, resetToken: string): Promise<void>;
}

export class ConsoleEmailService implements EmailService {
  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;

    console.log("=== PASSWORD RESET EMAIL ===");
    console.log(`To: ${email}`);
    console.log(`Subject: Redefinição de Senha`);
    console.log(`Body: Olá!`);
    console.log(`Você solicitou a redefinição de senha para sua conta.`);
    console.log(`Clique no link abaixo para redefinir sua senha:`);
    console.log(resetUrl);
    console.log(`Este link expirará em 1 hora.`);
    console.log(`Se você não solicitou esta redefinição, ignore este e-mail.`);
    console.log("========================");
  }
}

export const emailService = new ConsoleEmailService();
