type User = {
    name: string,
    age: number,
}

function createUser(user: User) {
    return `deu bom`
}

const user = createUser({
    name: 'Dedé',
    age: 15
})
