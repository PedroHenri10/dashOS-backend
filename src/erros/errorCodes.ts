export interface ErrorCode {
  status: number
  code: number
  message: string
}

export const ERROR_CODES = {
  USUARIO_NAO_ENCONTRADO: { status: 404, code: 1001, message: 'Usuário não encontrado.' } as const,
  CREDENCIAIS_INVALIDAS: { status: 401, code: 1002, message: 'Credenciais inválidas.' } as const,
  EMAIL_JA_CADASTRADO: { status: 409, code: 1003, message: 'O e-mail informado já está cadastrado.' } as const,
  CLIENTE_NAO_ENCONTRADO: { status: 404, code: 1004, message: 'Cliente não encontrado.' } as const,
  CLIENTE_CPF_CNPJ_DUPLICADO: { status: 409, code: 1005, message: 'CPF/CNPJ já cadastrado para outro cliente.' } as const,
  DADOS_INVALIDOS: { status: 400, code: 1006, message: 'Dados inválidos.' } as const,
  NAO_AUTORIZADO: { status: 401, code: 1007, message: 'Não autorizado.' } as const,
  SEM_PERMISSAO: { status: 403, code: 1008, message: 'Sem permissão para esta ação.' } as const,
  TOKEN_INVALIDO: { status: 401, code: 1009, message: 'Token inválido ou expirado.' } as const,
  REGISTRO_NAO_ENCONTRADO: { status: 404, code: 1010, message: 'Registro não encontrado.' } as const,
  REGISTRO_JA_EXISTE: { status: 409, code: 1011, message: 'Registro já existe.' } as const,
  ERRO_INTERNO: { status: 500, code: 1012, message: 'Erro interno do servidor.' } as const,
  FORNECEDOR_NAO_ENCONTRADO: { status: 404, code: 1013, message: 'Fornecedor não encontrado.' } as const,
  FORNECEDOR_CNPJ_DUPLICADO: { status: 409, code: 1014, message: 'CNPJ já cadastrado para outro fornecedor.' } as const,
  EQUIPAMENTO_NAO_ENCONTRADO: { status: 404, code: 1015, message: 'Equipamento não encontrado.' } as const,
  TIPO_EQUIPAMENTO_NAO_ENCONTRADO: { status: 404, code: 1016, message: 'Tipo de equipamento não encontrado.' } as const,
  TIPO_EQUIPAMENTO_JA_EXISTE: { status: 409, code: 1017, message: 'Já existe um tipo de equipamento com esse nome.' } as const,
}