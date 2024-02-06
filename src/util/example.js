const exampleModel = 
`
let login = {
    '!id': 'abc',
    email: 'bruno@gmail.com',
    password: '123'
}

let person =
{
    '!id': 10,
    name: 'bruno',
    birthday: '1989-10-22',
    '#login': 'login'
}

let enterprise = {
    workers: [
        {
            '#id': 'person',
            info: {
                date_register: '2020-08-25',
                salary: 17000.50
            }
        }
    ],
    CEO: 'Jack Black'
} 
`

export default exampleModel;