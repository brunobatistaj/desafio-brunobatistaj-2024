class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { 'MACACO': 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { 'GAZELA': 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { 'LEAO': 1 } }
        ];

        this.animalDados = {
            'LEAO': { tamanho: 3, bioma: 'savana' },
            'LEOPARDO': { tamanho: 2, bioma: 'savana' },
            'CROCODILO': { tamanho: 3, bioma: 'rio' },
            'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
            'GAZELA': { tamanho: 2, bioma: 'savana' },
            'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Verificar validade do animal e quantidade
        if (!this.animalDados[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const tamanhoAnimal = this.animalDados[animal].tamanho;
        const biomaAnimal = this.animalDados[animal].bioma;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (!this.ehBiomaAdequado(biomaAnimal, recinto.bioma)) {
                continue;
            }

            let espaçoOcupado = 0;
            let espaçoLivre = recinto.tamanhoTotal;
            const animaisExistentes = recinto.animaisExistentes;
            const quantidadeExistente = animaisExistentes[animal] || 0;

            if (animal === 'MACACO') {
                // Para macacos, calcular o espaço necessário considerando o número de outras espécies existentes
                const outrasEspécies = Object.keys(animaisExistentes).filter(a => a !== 'MACACO').length;
                if (outrasEspécies > 0) {
                    // Adicionar 1 espaço extra se há outras espécies no recinto
                    espaçoOcupado = quantidade + 1 + tamanhoAnimal;
                } else {
                    espaçoOcupado = quantidade;
                }
            } else {
                // Para outros animais, considerar o tamanho total ocupado
                // Adiciona 1 espaço extra se há outras espécies (além dos macacos)
                const outrasEspécies = Object.keys(animaisExistentes).filter(a => a !== 'MACACO').length;
                espaçoOcupado = quantidade * tamanhoAnimal;
                if (outrasEspécies > 0) {
                    espaçoOcupado += 1;
                }
            }

            // Calcula o espaço total ocupado considerando o tamanho dos animais existentes
            espaçoOcupado += quantidadeExistente * tamanhoAnimal;
            espaçoLivre = recinto.tamanhoTotal - espaçoOcupado;

            if (espaçoLivre >= 0) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }

    ehBiomaAdequado(biomaAnimal, biomaRecinto) {
        if (biomaAnimal === 'savana ou floresta' || biomaAnimal === 'savana ou rio') {
            return biomaRecinto.includes('savana') || biomaRecinto === 'floresta' || biomaRecinto === 'savana e rio';
        } else {
            return biomaAnimal === biomaRecinto;
        }
    }
}

export { RecintosZoo };
