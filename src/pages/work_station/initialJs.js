const initialString = 
`
let login = {
    '!id': 'abc', // Quando meu eu se provar digno, quero que permaneça comigo.
    email: 'bruno@gmail.com',
    senha: '123'
}

let trabalho =
{
    '!id': 'abcd',
    nome: 'Frei'

}

let pessoa =
{
    '!id': 10,
    nome: 'bruno',
    altura: 1.8,
    idade: 15,
    nascimento: '1989-10-22',
    acordaAs: '08:30',
    cadastro: '2023-12-28T08:00:00Z',
    lindo: true,
    carro: {
        modelo: 'hb20',
        acessorios: ['ar', 'direcao']
    },
    familia: [{
        nome: 'joao',
        tipo: 'pai'
    }],
    '#login': 'login',
    trabalhos: [{
        '#id': 'trabalho'
    }]
}

let empresa = {
    funcionarios: [
        {
            '#id': 'pessoa',
            info: {
                dtCadastro: '2020-08-25',
                salario: 17000.50,
                '#departamento': 'departamento',
                '#cargo': 'cargos'
            }
        }
    ],
    chefe: 'Luiz Gonzaga',
    cnpj: '45464654654'
}

let departamento = {
    '!id': 2,
    'nomeDepartamento': 'Contabilidade'
}

let cargos = {
    '!id': 1,
    'cargo': 'Gerente de Marketing'
}
`

export default initialString;