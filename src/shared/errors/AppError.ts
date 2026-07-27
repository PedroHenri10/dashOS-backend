export class AppError extends Error {
  constructor(
    public readonly mensagem: string,
    public readonly statusCode: number = 400
  ) {
    super(mensagem)
    this.name = 'AppError'
  }
}

export class NaoEncontradoError extends AppError {
  constructor(recurso: string) {
    super(`${recurso} não encontrado`, 404)
  }
}

export class NaoAutorizadoError extends AppError {
  constructor() { super('Não autorizado', 401) }
}

export class ProibidoError extends AppError {
  constructor() { super('Sem permissão para esta ação', 403) }
}

export class ConflitoError extends AppError {
  constructor(mensagem: string) { super(mensagem, 409) }
}