

let names: string[] | undefined = undefined

export async function suggestions(term: string) {
    await ensureNames();
    const results = generateSuggestions(term, names || []);
    return {term, suggestions: results}
}

function generateSuggestions(term: string, names: string[]) {
    // console.log('generate', term, names);
    return names.filter(name => {
        return name.startsWith(term);
    });
}

async function ensureNames() {
    if (!names) {
        names = [];
        await loadNames();
    }
}

async function loadNames(endpoint: string = "https://pokeapi.co/api/v2/pokemon") {
    const res = await fetch(endpoint);
    const {results, next} = await res.json();
    names?.push(...results.map((a: any) => a.name));
    // console.log(names, results.map((a: any) => a.name), next);
    if (next) {
        await loadNames(next);
    }
}
