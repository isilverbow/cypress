context('regex', () => {
    it('as a variable', () => {
        let myVar = 'ABC'

        'ABCDEF'.match(new RegExp(myVar, 'g'))
    })
})
