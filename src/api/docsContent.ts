// Prose for Documentation only. Which endpoints/params EXIST comes from explorerConfig.ts —
// this file only adds descriptions and worked examples on top of that source of truth.

export interface ParamDoc {
  description: string
}

export interface EndpointDoc {
  description: string
  params?: Record<string, ParamDoc>
  requestExample: string
  responseExample: unknown
}

export const paramDocs: Record<string, ParamDoc> = {
  name: { description: 'Case-insensitive substring match.' },
  race: { description: 'Exact match.' },
  gender: { description: 'Exact match.' },
  type: { description: 'Exact match, case-insensitive.' },
  movieId: { description: 'Numeric id of a movie. Filters the quotes collection.' },
  characterId: { description: 'Numeric id of a character. Filters the quotes or ainur collection depending on context.' },
  page: { description: 'Page number. No upper limit — a page beyond the last one returns 200 with an empty data array.' },
  limit: { description: 'Items per page. Accepts 1–100.' },
  id: { description: 'id is a positive integer identifying the resource.' }
}

export const docsContent: Record<string, Record<string, EndpointDoc>> = {
  characters: {
    list: {
      description: 'Returns a paginated list of characters.',
      requestExample: 'GET /api/characters?name=Aragorn',
      responseExample: {
        data: [
          { id: 3, name: 'Aragorn II Elessar', race: 'Human', gender: 'Male', birth: 'TA 2931', death: 'FO 120', hair: 'Dark', height: null, realm: 'Gondor and Arnor', spouse: 'Arwen', wikiUrl: 'https://lotr.fandom.com/wiki/Aragorn_II_Elessar' }
        ],
        page: 1,
        limit: 20,
        total: 19
      }
    },
    detail: {
      description: 'Returns a single character by id.',
      requestExample: 'GET /api/characters/5',
      responseExample: {
        id: 5,
        name: 'Frodo Baggins',
        race: 'Hobbit',
        gender: 'Male',
        birth: 'TA 2968',
        death: null,
        hair: 'Brown',
        height: null,
        realm: 'The Shire',
        spouse: null,
        wikiUrl: 'https://lotr.fandom.com/wiki/Frodo_Baggins'
      }
    }
  },
  movies: {
    list: {
      description: 'Returns a paginated list of movies.',
      requestExample: 'GET /api/movies?name=Fellowship',
      responseExample: {
        data: [
          {
            id: 1,
            name: 'The Fellowship of the Ring',
            releaseYear: 2001,
            runtimeInMinutes: 178,
            budgetInMillions: 93,
            boxOfficeRevenueInMillions: 871.5,
            academyAwardNominations: 13,
            academyAwardWins: 4,
            rottenTomatoesScore: 91
          }
        ],
        page: 1,
        limit: 20,
        total: 6
      }
    },
    detail: {
      description: 'Returns a single movie by id.',
      requestExample: 'GET /api/movies/1',
      responseExample: {
        id: 1,
        name: 'The Fellowship of the Ring',
        releaseYear: 2001,
        runtimeInMinutes: 178,
        budgetInMillions: 93,
        boxOfficeRevenueInMillions: 871.5,
        academyAwardNominations: 13,
        academyAwardWins: 4,
        rottenTomatoesScore: 91
      }
    }
  },
  books: {
    list: {
      description: 'Returns a paginated list of books.',
      requestExample: 'GET /api/books?name=Hobbit',
      responseExample: {
        data: [{ id: 1, name: 'The Hobbit', author: 'J.R.R. Tolkien', releaseYear: 1937 }],
        page: 1,
        limit: 20,
        total: 5
      }
    },
    detail: {
      description: 'Returns a single book by id.',
      requestExample: 'GET /api/books/1',
      responseExample: { id: 1, name: 'The Hobbit', author: 'J.R.R. Tolkien', releaseYear: 1937 }
    }
  },
  quotes: {
    list: {
      description:
        'Returns a paginated list of quotes. movieId and characterId are query filters only — they are not fields on the quote object itself.',
      requestExample: 'GET /api/quotes?characterId=2',
      responseExample: {
        data: [
          {
            id: 1,
            dialog: 'You shall not pass!',
            character: { id: 2, name: 'Gandalf' },
            movie: { id: 1, name: 'The Fellowship of the Ring' }
          }
        ],
        page: 1,
        limit: 20,
        total: 8
      }
    },
    detail: {
      description:
        'Returns a single quote by id. character and movie are summary references and may be null if the relation is missing.',
      requestExample: 'GET /api/quotes/1',
      responseExample: {
        id: 1,
        dialog: 'You shall not pass!',
        character: { id: 2, name: 'Gandalf' },
        movie: { id: 1, name: 'The Fellowship of the Ring' }
      }
    }
  },
  races: {
    list: {
      description: 'Returns a paginated list of races.',
      requestExample: 'GET /api/races?type=major-race',
      responseExample: {
        data: [{ id: 2, name: 'Elves', type: 'major-race', parentId: null, wikiUrl: null }],
        page: 1,
        limit: 20,
        total: 19
      }
    },
    detail: {
      description:
        'Returns a single race by id. parentId is a plain numeric reference to another race, or null — it is never resolved into a nested object.',
      requestExample: 'GET /api/races/7',
      responseExample: { id: 7, name: 'Noldor', type: 'subgroup', parentId: 2, wikiUrl: null }
    }
  },
  ainur: {
    list: {
      description:
        'Returns a paginated list of Ainur (Eru, the Valar and the Maiar). characterId is a plain reference to an existing Character record — it is never resolved into a nested object, and no Character fields (name, birth, death, realm, etc.) are duplicated here.',
      requestExample: 'GET /api/ainur?type=Maia',
      responseExample: {
        data: [
          { id: 12, name: 'Gandalf', type: 'Maia', characterId: 2, wikiUrl: null }
        ],
        page: 1,
        limit: 20,
        total: 23
      }
    },
    detail: {
      description:
        'Returns a single Ainur by id. characterId is null when no corresponding Character record exists (e.g. Manwe).',
      requestExample: 'GET /api/ainur/1',
      responseExample: { id: 1, name: 'Eru Iluvatar', type: 'creator', characterId: null, wikiUrl: null }
    }
  },
  health: {
    status: {
      description: 'Returns the API health status. Useful for checking whether the server is reachable.',
      requestExample: 'GET /api/health',
      responseExample: { status: 'ok' }
    }
  }
}
