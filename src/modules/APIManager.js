const remoteURL = "http://localhost:8088"

/* filtering info here +> https://jsonapi.org/recommendations/ */
/*
      Since the purpose of this module is to be used by all of the more specialized ones, then the string of `animals` should not be hard coded here.
*/


const API = {
  get: (table, id) => {
    return fetch(`${remoteURL}/${table}/${id}`).then(e => e.json())
  },
  getAndExpand: (id, database, expanded) => {
    return fetch(`${remoteURL}/${database}/${id}?_expand=${expanded}`).then(e => e.json())
  },
  getAll: (database) => {
    return fetch(`${remoteURL}/${database}?_sort=date&_order=asc`).then(e => e.json())
  },
  getAllAndExpand(database, expanded) {
    return fetch(`${remoteURL}/${database}?_expand=${expanded}`).then(e => e.json())
  },
  getAndFilter: (database, key, value) => {
    return fetch(`${remoteURL}/${database}?${key}=${value}`).then(e => e.json())
  },
  getFeed: (database, currentUser, friendsIdsString) => {
    return fetch(`${remoteURL}/${database}?_expand=user&userId=${currentUser}${friendsIdsString}&_sort=date&_order=asc`).then(e => e.json())
  },
  // --------------------------------------------
  getRecord: (input) => {
    let query = ""

    if (input.table) {
      query = `${input.table}`
    }
    if (input.email) {
      query += `/?email=${input.email}`
    }
    if (input.password) {
      query += `&password=${input.password}`
    } else {
      query = ""
    }
    //console.log("API.getRecord.query: ", query)

    return fetch(`${remoteURL}/${query}`)
      .then(response => response.json())
  },
  putRecord(table, input) {
    let query = ""

    if (table) {
      query = `${table}`
    }
    //console.log("API.putRecord.query: ", query)

    return fetch(`${remoteURL}/${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(response => response.json())
  },
  // ----------------------------------------------
  delete: (id, database) => {
    return fetch(`${remoteURL}/${database}/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post: (newObject, database) => {
    return fetch(`${remoteURL}/${database}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then(data => data.json())
  },
  update: (editedObject, database) => {
    return fetch(`${remoteURL}/${database}/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    }).then(data => data.json());
  },
  getFriends: (database, expanded, type, initiate) => {
    return fetch(`${remoteURL}/${database}?_expand=${expanded}&${type}=${initiate}`).then(e => e.json())
  },
  searchDatabase: (database, type, search) => {
    return fetch(`${remoteURL}/${database}?${type}_like=${search}`)
      .then(result => result.json())
  },
  articles: (typedInput) => {
    return fetch('https://newsapi.org/v2/everything?' +
      `q=${typedInput}&` +
      'from=2019-10-09&' +
      // 'sortBy=popularity&' +
      'apiKey=dff143f1fe5946c2a7a56f338917b58c')
      .then(result => result.json())
      .then(parsedObject => {
        return parsedObject.articles;
      });
  },
  events: (typedInput) => {
    return fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${typedInput}&location.address=nashville&token=U4TQ4FVUMOLUNIZEGIQX`, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(result => result.json())
      .then(parsedObject => {
        return parsedObject.events;
      });
  },
  completeTask: (id) => {
    let obj = { "completed": true }
    return fetch(`${remoteURL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json());
  }
}

export default API;
